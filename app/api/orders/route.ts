import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { processOrder } from "@/lib/process-order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  httpClient: Stripe.createFetchHttpClient(),
});

export async function POST(req: NextRequest) {
  const { paymentIntentId } = await req.json();

  if (!paymentIntentId) {
    return NextResponse.json({ error: "Missing payment intent" }, { status: 400 });
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (paymentIntent.status !== "succeeded") {
    return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
  }

  const result = await processOrder(paymentIntent);

  if ("error" in result) {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json({
    orderId: result.orderId,
    email: result.email,
    name: result.name,
    pointsEarned: result.pointsEarned,
  });
}
