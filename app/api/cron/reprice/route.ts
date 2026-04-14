import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Sell at this multiple of Printful's base cost, rounded to the nearest dollar.
// e.g. base cost $18.35 × 3.0 = $55
const MARKUP_MULTIPLIER = 3.0;

function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

async function printfulGet(path: string) {
  const res = await fetch(`https://api.printful.com${path}`, {
    headers: { Authorization: `Bearer ${process.env.PRINTFUL_API_TOKEN}` },
  });
  return res.json();
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dryRun = req.nextUrl.searchParams.get("dry_run") === "1";
  const supabase = createAdminClient();

  // Fetch all products that are linked to a Printful sync product
  const { data: products, error } = await supabase
    .from("products")
    .select("id, slug, printful_sync_product_id")
    .not("printful_sync_product_id", "is", null);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!products?.length) return NextResponse.json({ message: "No products to reprice" });

  type Change = { variant: string; oldPrice: number; newPrice: number };
  const changes: Change[] = [];
  const priceFromByProduct: Record<string, number> = {};

  for (const product of products) {
    const storeData = await printfulGet(`/store/products/${product.printful_sync_product_id}`);
    const syncVariants: { id: number; name: string; variant_id: number }[] =
      storeData.result?.sync_variants ?? [];

    for (const sv of syncVariants) {
      // Get base cost from the Printful catalog
      const catalogData = await printfulGet(`/catalog/variants/${sv.variant_id}`);
      const baseCost: number | undefined = catalogData.result?.variant?.price;
      if (!baseCost) continue;

      const newPrice = Math.round(baseCost * MARKUP_MULTIPLIER);

      // Find the matching DB variant by its Printful sync variant ID
      const { data: dbVariant } = await supabase
        .from("product_variants")
        .select("id, price")
        .eq("pod_variant_id", String(sv.id))
        .single();

      if (!dbVariant) continue;

      changes.push({ variant: sv.name, oldPrice: dbVariant.price, newPrice });

      if (priceFromByProduct[product.id] === undefined || newPrice < priceFromByProduct[product.id]) {
        priceFromByProduct[product.id] = newPrice;
      }

      if (!dryRun) {
        await supabase
          .from("product_variants")
          .update({ price: newPrice })
          .eq("id", dbVariant.id);
      }
    }
  }

  if (!dryRun) {
    for (const [productId, priceFrom] of Object.entries(priceFromByProduct)) {
      await supabase
        .from("products")
        .update({ price_from: priceFrom })
        .eq("id", productId);
    }
  }

  return NextResponse.json({
    dryRun,
    markup: `${MARKUP_MULTIPLIER}x`,
    updated: dryRun ? 0 : changes.length,
    changes,
    priceFrom: priceFromByProduct,
  });
}
