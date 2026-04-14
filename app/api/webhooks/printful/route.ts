import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { shippingNotificationEmail } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

const POINTS_PER_DOLLAR = 10;
const HOLD_DAYS = 14;

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Verify request is from our Printful store using the secret token set during webhook registration
  if (body.token !== process.env.PRINTFUL_WEBHOOK_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (body.type === "product_updated") {
    const syncProductId = body.data?.sync_product?.id;
    if (!syncProductId) {
      return NextResponse.json({ message: "No sync_product id" });
    }

    const syncVariants: { availability_status?: string }[] = body.data?.sync_variants ?? [];
    const allUnavailable =
      syncVariants.length > 0 &&
      syncVariants.every((v) => v.availability_status !== "active");

    const supabase = createAdminClient();
    await supabase
      .from("products")
      .update({ published: !allUnavailable })
      .eq("printful_sync_product_id", String(syncProductId));

    return NextResponse.json({ message: allUnavailable ? "Product unpublished" : "Product published" });
  }

  if (body.type !== "package_shipped") {
    return NextResponse.json({ message: "Event ignored" });
  }

  const rawExternalId = body.data?.order?.external_id;
  if (!rawExternalId) {
    return NextResponse.json({ message: "No external_id" });
  }
  // Restore UUID hyphens (we strip them before sending to Printful)
  const externalId = rawExternalId.replace(
    /^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/i,
    "$1-$2-$3-$4-$5"
  );

  const supabase = createAdminClient();

  const { data: order } = await supabase
    .from("orders")
    .select("id, user_id, total, points_redeemed, shipping_address")
    .eq("id", externalId)
    .single();

  if (!order) {
    return NextResponse.json({ message: "Order not found" });
  }

  const shipment = body.data?.shipment;
  const customerEmail = order.shipping_address?.email;

  // Send shipping notification email
  if (customerEmail && shipment?.tracking_number) {
    await resend.emails.send({
      from: "Preveil <noreply@preveil.shop>",
      to: customerEmail,
      subject: "Your Preveil order has shipped",
      html: shippingNotificationEmail({
        carrier: shipment.carrier ?? "your carrier",
        trackingNumber: shipment.tracking_number,
        trackingUrl: shipment.tracking_url ?? null,
      }),
    });
  }

  // Award points (only for logged-in users)
  if (!order.user_id) {
    return NextResponse.json({ message: "Shipping email sent, no user for points" });
  }

  const pointsDiscountValue = order.points_redeemed / 100;
  const chargedTotal = Math.max(order.total - pointsDiscountValue, 0);
  const pointsEarned = Math.floor(chargedTotal * POINTS_PER_DOLLAR);

  if (pointsEarned <= 0) {
    return NextResponse.json({ message: "Shipping email sent, no points to award" });
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

  return NextResponse.json({ message: "Shipping email sent, points awarded", points: pointsEarned });
}
