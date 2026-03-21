import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const POOL_THRESHOLD = 50;

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

  const { count: quoteCount } = await supabase
    .from("quotes")
    .select("*", { count: "exact", head: true })
    .eq("used", false);

  const { count: promptCount } = await supabase
    .from("image_prompts")
    .select("*", { count: "exact", head: true })
    .eq("used", false);

  const quotesLow = (quoteCount ?? 0) < POOL_THRESHOLD;
  const promptsLow = (promptCount ?? 0) < POOL_THRESHOLD;

  if (!quotesLow && !promptsLow) {
    return NextResponse.json({ message: "Pools are sufficient", quoteCount, promptCount });
  }

  const low = [];
  if (quotesLow) low.push(`quotes (${quoteCount} remaining)`);
  if (promptsLow) low.push(`image prompts (${promptCount} remaining)`);

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "alerts@preveil.shop",
    to: process.env.ALERT_EMAIL!,
    subject: "Preveil: Content pool is running low",
    text: `The following pools have dropped below the threshold of ${POOL_THRESHOLD}:\n\n${low.join("\n")}\n\nOpen Claude Code and generate a new batch to replenish.`,
  });

  return NextResponse.json({ message: "Alert sent", quoteCount, promptCount });
}
