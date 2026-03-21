import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

const POINTS_PER_DOLLAR = 10;
const HOLD_DAYS = 14;

export async function POST(req: NextRequest) {
  // Verify request is from our Printful store
  const storeId = req.headers.get("x-printful-store-id");
  if (storeId !== process.env.PRINTFUL_STORE_ID) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  if (body.type !== "package_shipped") {
    return NextResponse.json({ message: "Event ignored" });
  }

  const externalId = body.data?.order?.external_id;
  if (!externalId) {
    return NextResponse.json({ message: "No external_id" });
  }

  const supabase = createAdminClient();

  const { data: order } = await supabase
    .from("orders")
    .select("id, user_id, total, points_redeemed")
    .eq("id", externalId)
    .single();

  if (!order?.user_id) {
    return NextResponse.json({ message: "Order not found or no user" });
  }

  // Award points on the amount actually charged (after redemption)
  const pointsDiscountValue = order.points_redeemed / 100;
  const chargedTotal = Math.max(order.total - pointsDiscountValue, 0);
  const pointsEarned = Math.floor(chargedTotal * POINTS_PER_DOLLAR);

  if (pointsEarned <= 0) {
    return NextResponse.json({ message: "No points to award" });
  }

  const availableAt = new Date();
  availableAt.setDate(availableAt.getDate() + HOLD_DAYS);

  await supabase.from("points_ledger").insert({
    user_id: order.user_id,
    order_id: order.id,
    type: "earned",
    amount: pointsEarned,
    available_at: availableAt.toISOString(),
  });

  return NextResponse.json({ message: "Points awarded", points: pointsEarned });
}
