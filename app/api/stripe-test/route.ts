import { NextResponse } from "next/server";

export async function GET() {
  try {
    const key = process.env.STRIPE_SECRET_KEY ?? "";
    const res = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "amount=100&currency=usd&automatic_payment_methods[enabled]=true",
    });
    const data = await res.json();
    return NextResponse.json({ status: res.status, ok: res.ok, id: data.id, error: data.error });
  } catch (err) {
    return NextResponse.json({ fetchError: String(err) });
  }
}
