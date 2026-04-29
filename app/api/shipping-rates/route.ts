import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

export async function POST(req: NextRequest) {
  try {
    const { items, shipping } = await req.json();

    const supabase = adminClient();
    const variantIds = (items as { variantId: string }[]).map((i) => i.variantId);

    const { data: variants } = await supabase
      .from("product_variants")
      .select("id, pod_variant_id")
      .in("id", variantIds);

    const printfulItems = (items as { variantId: string; quantity: number }[])
      .map((item) => {
        const variant = variants?.find((v) => v.id === item.variantId);
        if (!variant?.pod_variant_id) return null;
        return { sync_variant_id: variant.pod_variant_id, quantity: item.quantity };
      })
      .filter(Boolean);

    if (printfulItems.length === 0) {
      return NextResponse.json({ error: "No valid items" }, { status: 400 });
    }

    const res = await fetch("https://api.printful.com/shipping/rates", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_API_TOKEN}`,
        "Content-Type": "application/json",
        "X-PF-Store-Id": process.env.PRINTFUL_STORE_ID!,
      },
      body: JSON.stringify({
        recipient: {
          address1: shipping.address1,
          city: shipping.city,
          state_code: shipping.state,
          country_code: "US",
          zip: shipping.zip,
        },
        items: printfulItems,
        currency: "USD",
        locale: "en_US",
      }),
    });

    const data = await res.json();
    if (data.code !== 200 || !data.result?.length) {
      return NextResponse.json({ error: "Could not calculate shipping rate" }, { status: 400 });
    }

    const rate = data.result[0] as { id: string; name: string; rate: string };
    return NextResponse.json({ rate: parseFloat(rate.rate), name: rate.name });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
