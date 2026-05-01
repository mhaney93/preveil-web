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
    const { items, shipping, subtotal } = await req.json();

    const supabase = adminClient();
    const variantIds = (items as { variantId: string }[]).map((i) => i.variantId);

    const { data: variants } = await supabase
      .from("product_variants")
      .select("id, pod_variant_id")
      .in("id", variantIds);

    const syncItems = (items as { variantId: string; quantity: number }[])
      .map((item) => {
        const variant = variants?.find((v) => v.id === item.variantId);
        if (!variant?.pod_variant_id) return null;
        return { syncVariantId: variant.pod_variant_id, quantity: item.quantity };
      })
      .filter(Boolean) as { syncVariantId: string; quantity: number }[];

    if (syncItems.length === 0) {
      return NextResponse.json({ error: "No valid items" }, { status: 400 });
    }

    const headers = {
      Authorization: `Bearer ${process.env.PRINTFUL_API_TOKEN}`,
      "Content-Type": "application/json",
      "X-PF-Store-Id": process.env.PRINTFUL_STORE_ID!,
    };

    // Resolve catalog variant_id for each sync variant
    const catalogIds = await Promise.all(
      syncItems.map(async ({ syncVariantId }) => {
        const res = await fetch(`https://api.printful.com/store/variants/${syncVariantId}`, { headers });
        const data = await res.json();
        console.log(`Printful /store/variants/${syncVariantId}:`, JSON.stringify(data).slice(0, 500));
        const id =
          data?.result?.variant?.id ??
          data?.result?.sync_variant?.variant_id ??
          null;
        return id as number | null;
      })
    );

    const printfulItems = syncItems
      .map((item, i) => {
        const catalogId = catalogIds[i];
        if (!catalogId) return null;
        return { variant_id: catalogId, quantity: item.quantity };
      })
      .filter(Boolean);

    if (printfulItems.length === 0) {
      return NextResponse.json({
        error: `Could not resolve product variant IDs. Sync IDs tried: ${syncItems.map(i => i.syncVariantId).join(", ")}. Catalog IDs returned: ${catalogIds.join(", ")}`,
      }, { status: 400 });
    }

    const recipient = {
      address1: shipping.address1,
      city: shipping.city,
      state_code: shipping.state,
      country_code: "US",
      zip: shipping.zip,
    };

    // Fetch shipping and tax rates in parallel
    const [shippingRes, taxRes] = await Promise.all([
      fetch("https://api.printful.com/shipping/rates", {
        method: "POST",
        headers,
        body: JSON.stringify({ recipient, items: printfulItems, currency: "USD", locale: "en_US" }),
      }),
      fetch("https://api.printful.com/tax/rates", {
        method: "POST",
        headers,
        body: JSON.stringify({ recipient }),
      }),
    ]);

    const shippingData = await shippingRes.json();
    if (shippingData.code !== 200 || !shippingData.result?.length) {
      const detail = typeof shippingData.result === "string"
        ? shippingData.result
        : (shippingData.error?.message ?? shippingData.message ?? "no rates returned");
      console.error("Printful shipping error:", JSON.stringify(shippingData));
      return NextResponse.json({ error: `Could not calculate shipping rate: ${detail}` }, { status: 400 });
    }

    const shippingRate = shippingData.result[0] as { id: string; name: string; rate: string };
    const shippingCost = parseFloat(shippingRate.rate);

    // Tax is best-effort — if it fails we still proceed with $0 tax
    let taxAmount = 0;
    const taxData = await taxRes.json();
    if (taxData.code === 200 && taxData.result?.required) {
      const taxRate: number = taxData.result.rate;
      const taxableBase = taxData.result.shipping_taxable
        ? (subtotal ?? 0) + shippingCost
        : (subtotal ?? 0);
      taxAmount = Math.round(taxableBase * taxRate * 100) / 100;
    }

    return NextResponse.json({
      rate: shippingCost,
      name: shippingRate.name,
      tax: taxAmount,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
