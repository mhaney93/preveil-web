import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse Preveil's full collection — apparel, home goods, wall art, and more. Each piece inspired by re-enchantment.",
};

export default async function ShopPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-light tracking-widest uppercase text-center mb-12 text-[var(--foreground)]">
        Shop
      </h1>
      <Suspense>
        <ShopClient products={[]} />
      </Suspense>
    </div>
  );
}
