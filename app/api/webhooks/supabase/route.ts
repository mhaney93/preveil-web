import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { welcomeEmail } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  console.log("AUTH_HEADER:", JSON.stringify(authHeader));
  console.log("EXPECTED:", JSON.stringify(`Bearer ${process.env.SUPABASE_WEBHOOK_SECRET}`));
  if (authHeader !== `Bearer ${process.env.SUPABASE_WEBHOOK_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  // Only handle signup_bonus inserts
  if (body.type !== "INSERT" || body.record?.type !== "signup_bonus") {
    return NextResponse.json({ message: "Event ignored" });
  }

  const userId = body.record.user_id;
  const availablePoints = body.record.amount;

  const supabase = createAdminClient();
  const { data: { user } } = await supabase.auth.admin.getUserById(userId);

  if (!user?.email) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await resend.emails.send({
    from: "Preveil <noreply@preveil.shop>",
    to: user.email,
    subject: "Welcome to Preveil",
    html: welcomeEmail(availablePoints),
  });

  return NextResponse.json({ message: "Welcome email sent" });
}
