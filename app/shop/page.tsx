import type { Metadata } from "next";
import { Suspense } from "react";
import { createServerClient } from "@/lib/supabase/server";
import ShopClient from "@/components/ShopClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse Preveil's full collection — apparel, home goods, wall art, and more. Each piece inspired by re-enchantment.",
};

export default async function ShopPage() {
  const supabase = await createServerClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name, slug, price_from, images, category, subcategory, subcategories")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-light tracking-widest uppercase text-center mb-12 text-[var(--foreground)]">
        Shop
      </h1>
      <Suspense>
        <ShopClient products={products ?? []} />
      </Suspense>
    </div>
  );
}
