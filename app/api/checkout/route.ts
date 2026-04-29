import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  httpClient: Stripe.createFetchHttpClient(),
});

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  variantName: string;
  price: number;
  image: string | null;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const { items, shipping, userId, pointsToRedeem, shippingCost, taxAmount } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // Fetch current prices from DB — never trust client-sent prices
    const supabase = adminClient();
    const variantIds = (items as CartItem[]).map((i) => i.variantId);
    const { data: dbVariants, error } = await supabase
      .from("product_variants")
      .select("id, price, available")
      .in("id", variantIds);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const variantMap = Object.fromEntries(
      (dbVariants ?? []).map((v) => [v.id, { price: v.price as number, available: v.available as boolean }])
    );

    // Validate availability and resolve current prices
    const resolvedItems: CartItem[] = [];
    for (const item of items as CartItem[]) {
      const dbv = variantMap[item.variantId];
      if (!dbv) {
        return NextResponse.json({ error: `${item.name} is no longer available.` }, { status: 400 });
      }
      if (!dbv.available) {
        return NextResponse.json({ error: `${item.name} (${item.variantName}) is out of stock.` }, { status: 400 });
      }
      resolvedItems.push({ ...item, price: dbv.price });
    }

    const subtotal = resolvedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const pointsDiscount = pointsToRedeem ? pointsToRedeem / 100 : 0;
    const shipping_cost = typeof shippingCost === "number" ? shippingCost : 0;
    const tax_amount = typeof taxAmount === "number" ? taxAmount : 0;
    const total = Math.max(subtotal + shipping_cost + tax_amount - pointsDiscount, 0.5); // Stripe minimum $0.50

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        items: JSON.stringify(resolvedItems),
        shipping: JSON.stringify(shipping),
        user_id: userId ?? "",
        points_redeemed: pointsToRedeem ? String(pointsToRedeem) : "0",
        shipping_cost: String(shipping_cost),
        tax_amount: String(tax_amount),
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret, resolvedItems });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
