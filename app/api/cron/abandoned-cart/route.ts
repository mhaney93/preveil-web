import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { abandonedCartEmail } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();

  const { data: carts } = await supabase
    .from("abandoned_carts")
    .select("*")
    .lt("updated_at", twoHoursAgo)
    .eq("converted", false)
    .eq("email_sent", false)
    .not("email", "is", null);

  if (!carts || carts.length === 0) {
    return NextResponse.json({ message: "No abandoned carts" });
  }

  let sent = 0;

  for (const cart of carts) {
    const items = cart.items as { name: string; variantName: string; quantity: number; price: number }[];
    if (!items || items.length === 0) continue;

    await resend.emails.send({
      from: "Preveil <noreply@preveil.shop>",
      to: cart.email,
      subject: "You left something behind",
      html: abandonedCartEmail(items),
    });

    await supabase
      .from("abandoned_carts")
      .update({ email_sent: true })
      .eq("id", cart.id);

    sent++;
  }

  return NextResponse.json({ message: `Sent ${sent} abandoned cart emails` });
}
