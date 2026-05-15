import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createServerClient } from "@/lib/supabase/server";

function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

export async function POST(req: NextRequest) {
  const { orderId } = await req.json();
  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const admin = createAdminClient();

  // Fetch the order — verify it's unclaimed and the email matches
  const { data: order } = await admin
    .from("orders")
    .select("id, user_id, shipping_address, total, points_redeemed")
    .eq("id", orderId)
    .single();

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // Already claimed by someone else
  if (order.user_id && order.user_id !== user.id) {
    return NextResponse.json({ error: "Order already claimed" }, { status: 409 });
  }

  // Already claimed by this user — idempotent success
  if (order.user_id === user.id) {
    return NextResponse.json({ pointsEarned: 0 });
  }

  const shippingEmail = (order.shipping_address as { email?: string })?.email ?? "";
  if (shippingEmail.toLowerCase() !== user.email!.toLowerCase()) {
    return NextResponse.json({ error: "Email mismatch" }, { status: 403 });
  }

  const pointsRedeemed: number = order.points_redeemed ?? 0;
  const chargedTotal = Math.max((order.total as number) - pointsRedeemed / 100, 0);
  const pointsEarned = Math.floor(chargedTotal * 5);

  // Link the order and award points in parallel
  const availableAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  await Promise.all([
    admin.from("orders").update({ user_id: user.id }).eq("id", orderId),
    admin.from("points_ledger").insert({
      user_id: user.id,
      order_id: orderId,
      type: "earned",
      amount: pointsEarned,
      available_at: availableAt,
    }),
  ]);

  return NextResponse.json({ pointsEarned });
}
