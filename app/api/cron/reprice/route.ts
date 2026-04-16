import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const MARKUP = 2.0;

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

async function pf(path: string) {
  const res = await fetch(`https://api.printful.com${path}`, {
    headers: { Authorization: `Bearer ${process.env.PRINTFUL_API_TOKEN}` },
  });
  const json = await res.json();
  return json.data;
}

function roundToHalf(n: number) {
  return Math.round(n * 2) / 2;
}

export async function GET(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dryRun = req.nextUrl.searchParams.get("dry_run") === "1";
  const supabase = adminClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("id, slug, printful_sync_product_id")
    .not("printful_sync_product_id", "is", null)
    .eq("published", true);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const priceCache: Record<number, number | null> = {};
  const availCache: Record<number, boolean> = {};

  async function getBaseCost(catalogVariantId: number): Promise<number | null> {
    if (catalogVariantId in priceCache) return priceCache[catalogVariantId];
    const data = await pf(`/v2/catalog-variants/${catalogVariantId}/prices?selling_region_name=worldwide`);
    const techniques: { technique_key: string; price: string }[] = data?.variant?.techniques ?? [];
    const preferred = techniques.find((t) => t.technique_key === "dtg") ?? techniques[0];
    const cost = preferred ? parseFloat(preferred.price) : null;
    priceCache[catalogVariantId] = cost;
    return cost;
  }

  async function isAvailable(catalogVariantId: number): Promise<boolean> {
    if (catalogVariantId in availCache) return availCache[catalogVariantId];
    const data = await pf(`/v2/catalog-variants/${catalogVariantId}/availability`);
    const regions: { status: string }[] = data ?? [];
    const available = Array.isArray(regions)
      ? regions.some((r) => r.status === "in_stock" || r.status === "stocked_on_demand")
      : true; // AOP products return differently — treat as available
    availCache[catalogVariantId] = available;
    return available;
  }

  const summary: Record<string, { priceFrom: number; unavailable: number }> = {};

  for (const product of products ?? []) {
    const syncVariants = await pf(
      `/v2/sync-products/${product.printful_sync_product_id}/sync-variants?limit=100`
    );
    if (!Array.isArray(syncVariants)) continue;

    const { data: dbVariants } = await supabase
      .from("product_variants")
      .select("id, pod_variant_id, price, available")
      .eq("product_id", product.id);

    const podToDb = Object.fromEntries(
      (dbVariants ?? []).map((v) => [String(v.pod_variant_id), v])
    );

    let minPrice = Infinity;
    let unavailableCount = 0;

    for (const sv of syncVariants) {
      const dbv = podToDb[String(sv.id)];
      if (!dbv) continue;

      const catalogId: number = sv.catalog_variant_id;
      const [baseCost, available] = await Promise.all([
        getBaseCost(catalogId),
        isAvailable(catalogId),
      ]);

      const newPrice = baseCost ? roundToHalf(baseCost * MARKUP) : dbv.price;
      if (newPrice < minPrice) minPrice = newPrice;
      if (!available) unavailableCount++;

      if (!dryRun) {
        await supabase
          .from("product_variants")
          .update({ price: newPrice, available })
          .eq("id", dbv.id);
      }
    }

    if (!dryRun && minPrice < Infinity) {
      await supabase
        .from("products")
        .update({ price_from: minPrice })
        .eq("id", product.id);
    }

    summary[product.slug] = { priceFrom: minPrice, unavailable: unavailableCount };
  }

  return NextResponse.json({ dryRun, markup: `${MARKUP}x`, summary });
}
