import type { Metadata } from "next";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse Preveil's full collection — apparel, home goods, wall art, and more. Each piece inspired by re-enchantment.",
};

export default async function ShopPage() {
  const supabase = await createServerClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name, slug, price_from, images, category")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-light tracking-widest uppercase text-center mb-16 text-[var(--foreground)]">
        Shop
      </h1>

      {!products || products.length === 0 ? (
        <p className="text-center text-[var(--muted)] tracking-widest uppercase text-sm">
          Coming soon
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="group bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent-gold)] transition-colors"
            >
              <div className="aspect-square bg-[var(--border)] flex items-center justify-center">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[var(--muted)] text-sm tracking-widest uppercase">
                    No image
                  </span>
                )}
              </div>
              <div className="p-6">
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-light tracking-wide text-[var(--foreground)] group-hover:text-[var(--accent-gold)] transition-colors">
                  {product.name}
                </h2>
                {product.category && (
                  <p className="text-sm tracking-widest uppercase text-[var(--muted)] mt-1">
                    {product.category}
                  </p>
                )}
                <p className="text-[var(--accent-gold)] mt-3 tracking-wide">
                  From ${product.price_from.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
