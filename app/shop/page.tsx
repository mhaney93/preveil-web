import type { Metadata } from "next";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse Preveil's full collection — apparel, home goods, wall art, and more. Each piece inspired by re-enchantment.",
};

const CATEGORIES = [
  { slug: "mens-clothing", label: "Men's Clothing" },
  { slug: "womens-clothing", label: "Women's Clothing" },
  { slug: "kids-clothing", label: "Kids' & Youth" },
  { slug: "hats", label: "Hats" },
  { slug: "accessories", label: "Accessories" },
  { slug: "home-living", label: "Home & Living" },
];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category: categorySlug } = await searchParams;
  const activeCategory = CATEGORIES.find((c) => c.slug === categorySlug) ?? null;

  const supabase = await createServerClient();
  let query = supabase
    .from("products")
    .select("id, name, slug, price_from, images, category")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (activeCategory) {
    query = query.eq("category", activeCategory.label);
  }

  const { data: products } = await query;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-light tracking-widest uppercase text-center mb-12 text-[var(--foreground)]">
        Shop
      </h1>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        <Link
          href="/shop"
          className={`text-xs tracking-widest uppercase px-4 py-2 border transition-colors ${
            !activeCategory
              ? "border-[var(--accent-gold)] text-[var(--accent-gold)]"
              : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/shop?category=${cat.slug}`}
            className={`text-xs tracking-widest uppercase px-4 py-2 border transition-colors ${
              activeCategory?.slug === cat.slug
                ? "border-[var(--accent-gold)] text-[var(--accent-gold)]"
                : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

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
