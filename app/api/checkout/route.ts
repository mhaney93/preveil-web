import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { items, shipping, userId, pointsToRedeem } = await req.json();

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "No items in cart" }, { status: 400 });
  }

  const subtotal = items.reduce(
    (sum: number, item: { price: number; quantity: number }) =>
      sum + item.price * item.quantity,
    0
  );

  const pointsDiscount = pointsToRedeem ? pointsToRedeem / 100 : 0;
  const total = Math.max(subtotal - pointsDiscount, 0.5); // Stripe minimum $0.50

  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        items: JSON.stringify(items),
        shipping: JSON.stringify(shipping),
        user_id: userId ?? "",
        points_redeemed: pointsToRedeem ? String(pointsToRedeem) : "0",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    console.error("Stripe PaymentIntent error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
