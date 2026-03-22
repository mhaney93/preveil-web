"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CATEGORIES = [
  { slug: "mens-clothing", label: "Men's Clothing" },
  { slug: "womens-clothing", label: "Women's Clothing" },
  { slug: "kids-clothing", label: "Kids' & Youth" },
  { slug: "hats", label: "Hats" },
  { slug: "accessories", label: "Accessories" },
  { slug: "home-living", label: "Home & Living" },
];

const SUBCATEGORIES: Record<string, { slug: string; label: string }[]> = {
  "mens-clothing": [
    { slug: "t-shirts", label: "T-Shirts" },
    { slug: "long-sleeve", label: "Long Sleeve" },
    { slug: "hoodies", label: "Hoodies" },
    { slug: "sweatshirts", label: "Sweatshirts" },
    { slug: "knitwear", label: "Knitwear" },
    { slug: "joggers", label: "Sweatpants & Joggers" },
    { slug: "embroidered-shirts", label: "Embroidered Shirts" },
  ],
  "womens-clothing": [
    { slug: "t-shirts", label: "T-Shirts" },
    { slug: "crop-tops", label: "Crop Tops" },
    { slug: "long-sleeve", label: "Long Sleeve" },
    { slug: "hoodies", label: "Hoodies" },
    { slug: "sweatshirts", label: "Sweatshirts" },
    { slug: "knitwear", label: "Knitwear" },
    { slug: "joggers", label: "Sweatpants & Joggers" },
    { slug: "sleepwear", label: "Sleepwear" },
  ],
  "kids-clothing": [
    { slug: "t-shirts", label: "T-Shirts" },
    { slug: "long-sleeve", label: "Long Sleeve" },
    { slug: "hoodies", label: "Hoodies & Sweatshirts" },
  ],
  "hats": [
    { slug: "beanies", label: "Beanies" },
    { slug: "dad-hats", label: "Dad Hats" },
    { slug: "bucket-hats", label: "Bucket Hats" },
    { slug: "snapbacks", label: "Snapbacks" },
  ],
  "accessories": [
    { slug: "tote-bags", label: "Tote Bags" },
    { slug: "backpacks", label: "Backpacks" },
    { slug: "socks", label: "Socks" },
    { slug: "patches", label: "Patches" },
    { slug: "pins", label: "Pins" },
    { slug: "phone-cases", label: "Phone Cases" },
    { slug: "stickers", label: "Stickers" },
  ],
  "home-living": [
    { slug: "mugs", label: "Mugs" },
    { slug: "tumblers", label: "Tumblers" },
    { slug: "blankets", label: "Blankets" },
    { slug: "candles", label: "Candles" },
    { slug: "notebooks", label: "Notebooks" },
    { slug: "pillows", label: "Pillows" },
    { slug: "coasters", label: "Coasters" },
    { slug: "postcards", label: "Postcards" },
  ],
};

type Product = {
  id: string;
  name: string;
  slug: string;
  price_from: number;
  images: string[] | null;
  category: string | null;
  subcategory: string | null;
};

export default function ShopClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");
  const subcategorySlug = searchParams.get("subcategory");

  const activeCategory = CATEGORIES.find((c) => c.slug === categorySlug) ?? null;
  const subcategoryList = activeCategory ? (SUBCATEGORIES[activeCategory.slug] ?? []) : [];
  const activeSubcategory = subcategoryList.find((s) => s.slug === subcategorySlug) ?? null;

  const filtered = products.filter((p) => {
    if (activeCategory && p.category !== activeCategory.label) return false;
    if (activeSubcategory && p.subcategory !== activeSubcategory.label) return false;
    return true;
  });

  return (
    <>
      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
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

      {/* Subcategory filters */}
      {activeCategory && subcategoryList.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Link
            href={`/shop?category=${activeCategory.slug}`}
            className={`text-xs tracking-widest uppercase px-3 py-1 transition-colors ${
              !activeSubcategory
                ? "text-[var(--foreground)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            All
          </Link>
          {subcategoryList.map((sub) => (
            <Link
              key={sub.slug}
              href={`/shop?category=${activeCategory.slug}&subcategory=${sub.slug}`}
              className={`text-xs tracking-widest uppercase px-3 py-1 transition-colors ${
                activeSubcategory?.slug === sub.slug
                  ? "text-[var(--foreground)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}

      {!activeCategory && <div className="mb-10" />}

      {filtered.length === 0 ? (
        <p className="text-center text-[var(--muted)] tracking-widest uppercase text-sm">
          Coming soon
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
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
                {product.subcategory && (
                  <p className="text-sm tracking-widest uppercase text-[var(--muted)] mt-1">
                    {product.subcategory}
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
    </>
  );
}
