import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

export async function POST(req: NextRequest) {
  const { paymentIntentId } = await req.json();

  if (!paymentIntentId) {
    return NextResponse.json({ error: "Missing payment intent" }, { status: 400 });
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (paymentIntent.status !== "succeeded") {
    return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
  }

  const items = JSON.parse(paymentIntent.metadata.items ?? "[]");
  const shipping = JSON.parse(paymentIntent.metadata.shipping ?? "{}");
  const total = paymentIntent.amount / 100;
  const userId = paymentIntent.metadata.user_id || null;
  const pointsRedeemed = parseInt(paymentIntent.metadata.points_redeemed ?? "0", 10);

  const supabase = createAdminClient();

  // Check for duplicate order
  const { data: existing } = await supabase
    .from("orders")
    .select("id")
    .eq("stripe_payment_intent_id", paymentIntentId)
    .single();

  if (existing) {
    return NextResponse.json({ orderId: existing.id });
  }

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      status: "paid",
      total,
      stripe_payment_intent_id: paymentIntentId,
      shipping_address: shipping,
      user_id: userId,
      points_redeemed: pointsRedeemed,
    })
    .select()
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }

  // Insert order items
  const orderItems = items.map((item: {
    variantId: string;
    price: number;
    quantity: number;
  }) => ({
    order_id: order.id,
    product_variant_id: item.variantId,
    quantity: item.quantity,
    price_at_purchase: item.price,
  }));

  await supabase.from("order_items").insert(orderItems);

  // Record points redemption in ledger
  if (userId && pointsRedeemed > 0) {
    await supabase.from("points_ledger").insert({
      user_id: userId,
      order_id: order.id,
      type: "redeemed",
      amount: -pointsRedeemed,
      available_at: new Date().toISOString(),
    });
  }

  // Submit to Printful
  const { data: variants } = await supabase
    .from("product_variants")
    .select("id, pod_variant_id, pod_provider")
    .in("id", items.map((i: { variantId: string }) => i.variantId));

  const printfulItems = items
    .map((item: { variantId: string; quantity: number }) => {
      const variant = variants?.find((v) => v.id === item.variantId);
      if (!variant?.pod_variant_id || variant.pod_provider !== "printful") return null;
      return {
        sync_variant_id: variant.pod_variant_id,
        quantity: item.quantity,
      };
    })
    .filter(Boolean);

  if (printfulItems.length > 0) {
    const printfulRes = await fetch("https://api.printful.com/orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_API_TOKEN}`,
        "Content-Type": "application/json",
        "X-PF-Store-Id": process.env.PRINTFUL_STORE_ID!,
      },
      body: JSON.stringify({
        external_id: order.id,
        recipient: {
          name: shipping.name,
          email: shipping.email,
          address1: shipping.address1,
          address2: shipping.address2 || undefined,
          city: shipping.city,
          state_code: shipping.state,
          zip: shipping.zip,
          country_code: "US",
        },
        items: printfulItems,
      }),
    });

    if (printfulRes.ok) {
      const printfulData = await printfulRes.json();
      const printfulOrderId = printfulData?.result?.id ? String(printfulData.result.id) : null;

      await supabase
        .from("orders")
        .update({
          status: "submitted",
          ...(printfulOrderId && { printful_order_id: printfulOrderId }),
        })
        .eq("id", order.id);
    }
  }

  return NextResponse.json({ orderId: order.id });
}
