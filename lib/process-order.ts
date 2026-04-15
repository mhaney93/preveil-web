import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { postPurchaseEmail } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

export async function processOrder(paymentIntent: Stripe.PaymentIntent): Promise<{ orderId: string } | { error: string }> {
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
    .eq("stripe_payment_intent_id", paymentIntent.id)
    .single();

  if (existing) {
    return { orderId: existing.id };
  }

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      status: "paid",
      total,
      stripe_payment_intent_id: paymentIntent.id,
      shipping_address: shipping,
      user_id: userId,
      points_redeemed: pointsRedeemed,
    })
    .select()
    .single();

  if (orderError || !order) {
    return { error: "Failed to create order" };
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
        external_id: order.id.replace(/-/g, ""),
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

      if (printfulOrderId) {
        await fetch(`https://api.printful.com/orders/${printfulOrderId}/confirm`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.PRINTFUL_API_TOKEN}`,
            "X-PF-Store-Id": process.env.PRINTFUL_STORE_ID!,
          },
        });
      }

      await supabase
        .from("orders")
        .update({
          status: "submitted",
          ...(printfulOrderId && { printful_order_id: printfulOrderId }),
        })
        .eq("id", order.id);
    }
  }

  // Mark abandoned cart as converted
  if (userId) {
    await supabase.from("abandoned_carts").update({ converted: true }).eq("user_id", userId);
  }
  await supabase.from("abandoned_carts").update({ converted: true }).eq("email", shipping.email);

  // Send post-purchase email
  const now = new Date().toISOString();
  let availablePoints = 0;
  if (userId) {
    const { data: pointsRows } = await supabase
      .from("points_ledger")
      .select("amount, available_at")
      .eq("user_id", userId);
    availablePoints = pointsRows
      ? pointsRows.filter((r) => r.available_at <= now).reduce((sum: number, r: { amount: number }) => sum + r.amount, 0)
      : 0;
  }

  const pointsDiscount = pointsRedeemed / 100;
  const chargedTotal = Math.max(total - pointsDiscount, 0);
  const pointsEarned = Math.floor(chargedTotal * 10);

  const emailItems = items.map((item: { name: string; variantName: string; quantity: number; price: number }) => ({
    name: item.name,
    variantName: item.variantName ?? "",
    quantity: item.quantity,
    price: item.price,
  }));

  await resend.emails.send({
    from: "Preveil <noreply@preveil.shop>",
    to: shipping.email,
    subject: "Your Preveil order is confirmed",
    html: postPurchaseEmail({
      items: emailItems,
      total,
      pointsRedeemed,
      pointsEarned,
      availablePoints,
    }),
  });

  return { orderId: order.id };
}
