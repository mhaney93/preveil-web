import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

export async function POST(req: NextRequest) {
  const { userId, email, items } = await req.json();

  if (!userId && !email) {
    return NextResponse.json({ error: "userId or email required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const now = new Date().toISOString();

  // Look up existing cart
  let existingId: string | null = null;

  if (userId) {
    const { data } = await supabase
      .from("abandoned_carts")
      .select("id")
      .eq("user_id", userId)
      .single();
    existingId = data?.id ?? null;
  } else {
    const { data } = await supabase
      .from("abandoned_carts")
      .select("id")
      .eq("email", email)
      .is("user_id", null)
      .single();
    existingId = data?.id ?? null;
  }

  if (existingId) {
    await supabase
      .from("abandoned_carts")
      .update({ items, email: email ?? undefined, updated_at: now })
      .eq("id", existingId);
  } else {
    await supabase
      .from("abandoned_carts")
      .insert({ user_id: userId ?? null, email: email ?? null, items, updated_at: now });
  }

  return NextResponse.json({ ok: true });
}
