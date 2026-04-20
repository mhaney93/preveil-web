"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

const CATEGORIES = [
  { slug: "mens-clothing", label: "Men's Clothing" },
  { slug: "womens-clothing", label: "Women's Clothing" },
  { slug: "kids-clothing", label: "Kids' & Youth Clothing" },
  { slug: "hats", label: "Hats" },
  { slug: "accessories", label: "Accessories" },
  { slug: "home-living", label: "Home & Living" },
];

// Groups are the intermediate level between category and subcategory.
// Single-subcategory groups (e.g. "Jackets & Vests") act as direct links — no subcategory row shown.
// Hats has no groups and shows subcategories directly.
const GROUPS: Record<string, { slug: string; label: string; subcategories: string[] }[]> = {
  "mens-clothing": [
    {
      slug: "all-shirts",
      label: "Shirts",
      subcategories: ["t-shirts", "polo-shirts", "tank-tops", "3-4-sleeve-shirts", "long-sleeve"],
    },
    {
      slug: "jackets-vests",
      label: "Jackets & Vests",
      subcategories: ["jackets-vests"],
    },
    {
      slug: "all-hoodies-sweatshirts",
      label: "Hoodies & Sweatshirts",
      subcategories: ["hoodies", "sweatshirts"],
    },
    {
      slug: "bottoms",
      label: "Bottoms",
      subcategories: ["joggers", "underwear", "leggings", "shorts", "pants", "swimwear"],
    },
  ],
  "womens-clothing": [
    {
      slug: "all-shirts",
      label: "Shirts",
      subcategories: ["t-shirts", "polo-shirts", "tank-tops", "crop-tops", "3-4-sleeve-shirts", "long-sleeve"],
    },
    {
      slug: "dresses",
      label: "Dresses",
      subcategories: ["dresses"],
    },
    {
      slug: "jackets-vests",
      label: "Jackets & Vests",
      subcategories: ["jackets-vests"],
    },
    {
      slug: "all-hoodies-sweatshirts",
      label: "Hoodies & Sweatshirts",
      subcategories: ["hoodies", "sweatshirts"],
    },
    {
      slug: "bottoms",
      label: "Bottoms",
      subcategories: ["joggers", "leggings", "skirts", "shorts", "pants"],
    },
    {
      slug: "sports-bras",
      label: "Sports Bras",
      subcategories: ["sports-bras"],
    },
    {
      slug: "swimwear",
      label: "Swimwear",
      subcategories: ["swimwear"],
    },
    {
      slug: "sleepwear",
      label: "Sleepwear",
      subcategories: ["sleepwear"],
    },
  ],
  "kids-clothing": [
    {
      slug: "all-shirts",
      label: "Shirts",
      subcategories: ["t-shirts", "long-sleeve", "hoodies"],
    },
    {
      slug: "hats",
      label: "Hats",
      subcategories: ["hats"],
    },
    {
      slug: "leggings",
      label: "Leggings",
      subcategories: ["leggings"],
    },
    {
      slug: "baby-bodysuits",
      label: "Baby Bodysuits",
      subcategories: ["baby-bodysuits"],
    },
    {
      slug: "swimwear",
      label: "Swimwear",
      subcategories: ["swimwear"],
    },
  ],
  "accessories": [
    {
      slug: "patches",
      label: "Patches",
      subcategories: ["patches"],
    },
    {
      slug: "pins",
      label: "Pins",
      subcategories: ["pins"],
    },
    {
      slug: "bags",
      label: "Bags",
      subcategories: ["tote-bags", "duffle-bags", "drawstring-bags", "fanny-packs", "backpacks", "handbags"],
    },
    {
      slug: "hair-accessories",
      label: "Hair Accessories",
      subcategories: ["hair-accessories"],
    },
    {
      slug: "sports-accessories",
      label: "Sports Accessories",
      subcategories: ["sports-accessories"],
    },
    {
      slug: "footwear",
      label: "Footwear",
      subcategories: ["flip-flops", "shoes", "socks"],
    },
    {
      slug: "tech-accessories",
      label: "Tech Accessories",
      subcategories: ["phone-cases", "earphone-cases", "laptop-cases", "mouse-pads"],
    },
    {
      slug: "face-masks",
      label: "Face Masks",
      subcategories: ["face-masks"],
    },
  ],
  "home-living": [
    {
      slug: "wall-art",
      label: "Wall Art",
      subcategories: ["posters", "framed-posters", "canvas-prints", "metal-prints"],
    },
    {
      slug: "home-decor",
      label: "Home Decor",
      subcategories: ["holiday-decor", "blankets", "candles", "pillows", "magnets", "tableware", "flags-signs"],
    },
    {
      slug: "drinkware-coasters",
      label: "Drinkware & Coasters",
      subcategories: ["water-bottles", "mugs", "tumblers", "coasters", "glassware"],
    },
    {
      slug: "stationery",
      label: "Stationery",
      subcategories: ["postcards", "notebooks", "stickers", "greeting-cards"],
    },
    {
      slug: "aprons",
      label: "Aprons",
      subcategories: ["aprons"],
    },
    {
      slug: "towels",
      label: "Towels",
      subcategories: ["towels"],
    },
    {
      slug: "toys-games",
      label: "Toys & Games",
      subcategories: ["toys-games"],
    },
    {
      slug: "pet-products",
      label: "Pet Products",
      subcategories: ["pet-products"],
    },
    {
      slug: "beauty",
      label: "Beauty",
      subcategories: ["beauty"],
    },
  ],
};

const SUBCATEGORIES: Record<string, { slug: string; label: string }[]> = {
  "mens-clothing": [
    { slug: "t-shirts", label: "T-Shirts" },
    { slug: "polo-shirts", label: "Polo Shirts" },
    { slug: "tank-tops", label: "Tank Tops" },
    { slug: "3-4-sleeve-shirts", label: "3/4 Sleeve Shirts" },
    { slug: "long-sleeve", label: "Long Sleeve Shirts" },
    { slug: "embroidered-shirts", label: "Embroidered Shirts" },
    { slug: "jackets-vests", label: "Jackets & Vests" },
    { slug: "hoodies", label: "Hoodies" },
    { slug: "sweatshirts", label: "Sweatshirts" },
    { slug: "joggers", label: "Sweatpants & Joggers" },
    { slug: "underwear", label: "Underwear" },
    { slug: "leggings", label: "Leggings" },
    { slug: "shorts", label: "Shorts" },
    { slug: "pants", label: "Pants" },
    { slug: "swimwear", label: "Swimwear" },
  ],
  "womens-clothing": [
    { slug: "t-shirts", label: "T-Shirts" },
    { slug: "polo-shirts", label: "Polo Shirts" },
    { slug: "tank-tops", label: "Tank Tops" },
    { slug: "crop-tops", label: "Crop Tops" },
    { slug: "embroidered-shirts", label: "Embroidered Shirts" },
    { slug: "3-4-sleeve-shirts", label: "3/4 Sleeve Shirts" },
    { slug: "long-sleeve", label: "Long Sleeve Shirts" },
    { slug: "dresses", label: "Dresses" },
    { slug: "jackets-vests", label: "Jackets & Vests" },
    { slug: "hoodies", label: "Hoodies" },
    { slug: "sweatshirts", label: "Sweatshirts" },
    { slug: "joggers", label: "Sweatpants & Joggers" },
    { slug: "leggings", label: "Leggings" },
    { slug: "skirts", label: "Skirts" },
    { slug: "shorts", label: "Shorts" },
    { slug: "pants", label: "Pants" },
    { slug: "sports-bras", label: "Sports Bras" },
    { slug: "swimwear", label: "Swimwear" },
    { slug: "sleepwear", label: "Sleepwear" },
  ],
  "kids-clothing": [
    { slug: "t-shirts", label: "T-Shirts" },
    { slug: "3-4-sleeve-shirts", label: "3/4 Sleeve Shirts" },
    { slug: "long-sleeve", label: "Long Sleeve Shirts" },
    { slug: "hoodies", label: "Hoodies & Sweatshirts" },
    { slug: "hats", label: "Hats" },
    { slug: "leggings", label: "Leggings" },
    { slug: "baby-bodysuits", label: "Baby Bodysuits" },
    { slug: "swimwear", label: "Swimwear" },
  ],
  "hats": [
    { slug: "beanies", label: "Beanies" },
    { slug: "dad-hats", label: "Dad Hats / Baseball Caps" },
    { slug: "snapbacks", label: "Snapbacks" },
    { slug: "trucker-hats", label: "Trucker Hats" },
    { slug: "5-panel-hats", label: "5-Panel Hats" },
    { slug: "mesh-hats", label: "Mesh Hats" },
    { slug: "bucket-hats", label: "Bucket Hats" },
    { slug: "visors", label: "Visors" },
  ],
  "accessories": [
    { slug: "patches", label: "Patches" },
    { slug: "pins", label: "Pins" },
    { slug: "tote-bags", label: "Tote Bags" },
    { slug: "duffle-bags", label: "Duffle Bags" },
    { slug: "drawstring-bags", label: "Drawstring Bags" },
    { slug: "fanny-packs", label: "Fanny Packs" },
    { slug: "backpacks", label: "Backpacks" },
    { slug: "handbags", label: "Handbags" },
    { slug: "hair-accessories", label: "Hair Accessories" },
    { slug: "sports-accessories", label: "Sports Accessories" },
    { slug: "flip-flops", label: "Flip Flops" },
    { slug: "shoes", label: "Shoes" },
    { slug: "socks", label: "Socks" },
    { slug: "phone-cases", label: "Phone Cases" },
    { slug: "earphone-cases", label: "Earphone Cases" },
    { slug: "laptop-cases", label: "Laptop Cases" },
    { slug: "mouse-pads", label: "Mouse Pads" },
    { slug: "face-masks", label: "Face Masks" },
  ],
  "home-living": [
    { slug: "posters", label: "Posters" },
    { slug: "framed-posters", label: "Framed Posters" },
    { slug: "canvas-prints", label: "Canvas Prints" },
    { slug: "metal-prints", label: "Metal Prints" },
    { slug: "holiday-decor", label: "Holiday Decor" },
    { slug: "blankets", label: "Blankets" },
    { slug: "candles", label: "Candles" },
    { slug: "pillows", label: "Pillows & Pillow Cases" },
    { slug: "magnets", label: "Magnets" },
    { slug: "tableware", label: "Tableware" },
    { slug: "flags-signs", label: "Flags & Signs" },
    { slug: "water-bottles", label: "Water Bottles" },
    { slug: "mugs", label: "Mugs" },
    { slug: "tumblers", label: "Tumblers" },
    { slug: "coasters", label: "Coasters" },
    { slug: "glassware", label: "Glassware" },
    { slug: "postcards", label: "Postcards" },
    { slug: "notebooks", label: "Notebooks" },
    { slug: "stickers", label: "Stickers" },
    { slug: "greeting-cards", label: "Greeting Cards" },
    { slug: "aprons", label: "Aprons" },
    { slug: "towels", label: "Towels" },
    { slug: "toys-games", label: "Toys & Games" },
    { slug: "pet-products", label: "Pet Products" },
    { slug: "beauty", label: "Beauty" },
  ],
};

// Slugs shown in the default "All" view. Update when adding products in new categories.
const FEATURED_SLUGS = [
  "preveil-hoodie",
  "preveil-windbreaker",
  "preveil-mug",
];

type Product = {
  id: string;
  name: string;
  slug: string;
  price_from: number;
  images: string[] | null;
  category: string | null;
  subcategory: string | null;
  subcategories: string[] | null;
  order_count: number;
  product_variants?: { available: boolean }[] | null;
};

export default function ShopClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");
  const groupSlug = searchParams.get("group");
  const subcategorySlug = searchParams.get("subcategory");

  const activeCategory = CATEGORIES.find((c) => c.slug === categorySlug) ?? null;
  const groupList = activeCategory ? (GROUPS[activeCategory.slug] ?? []) : [];
  const hasGroups = groupList.length > 0;
  const activeGroup = groupList.find((g) => g.slug === groupSlug) ?? null;

  const subcategoryList = activeCategory ? (SUBCATEGORIES[activeCategory.slug] ?? []) : [];
  // When a group is active, only show that group's subcategories in the sub-nav
  const visibleSubcategories = activeGroup
    ? subcategoryList.filter((s) => activeGroup.subcategories.includes(s.slug))
    : subcategoryList;
  const activeSubcategory = visibleSubcategories.find((s) => s.slug === subcategorySlug) ?? null;

  const [visibleCount, setVisibleCount] = useState(3);

  // Reset pagination whenever the view changes
  useEffect(() => {
    setVisibleCount(3);
  }, [categorySlug, groupSlug, subcategorySlug]);

  // Labels of subcategories in the active group (for filtering products)
  const activeGroupSubcategoryLabels = activeGroup
    ? activeGroup.subcategories
        .map((slug) => subcategoryList.find((s) => s.slug === slug)?.label)
        .filter((label): label is string => !!label)
    : null;

  // Sort by popularity descending; randomly break ties. Assigns random keys
  // upfront so the comparator is stable within a single useMemo call.
  function sortByPopularity(pool: Product[]): Product[] {
    const keyed = pool.map((p) => ({ p, r: Math.random() }));
    keyed.sort((a, b) => {
      const diff = b.p.order_count - a.p.order_count;
      return diff !== 0 ? diff : a.r - b.r;
    });
    return keyed.map(({ p }) => p);
  }

  function sortByPrice(pool: Product[]): Product[] {
    return [...pool].sort((a, b) => a.price_from - b.price_from);
  }

  // Pick one product per subcategory for any "All" view (no hard cap — pagination handles limiting).
  // Because the pool is pre-sorted by popularity, the first product seen for each subcategory is
  // automatically the most popular one, and subcategories appear in popularity order.
  function onePerSubcategory(pool: Product[]): Product[] {
    const seen = new Set<string>();
    const result: Product[] = [];
    for (const p of pool) {
      const key = p.subcategory ?? p.category ?? "";
      if (!seen.has(key)) { seen.add(key); result.push(p); }
    }
    return result;
  }

  // useMemo stabilises the random tiebreaker: order stays consistent within a view
  // but re-randomises when the user navigates to a different category/group/subcategory.
  const filtered = useMemo(() => {
    if (!activeCategory) return products.filter((p) => FEATURED_SLUGS.includes(p.slug));

    const inCategory = products.filter((p) => p.category === activeCategory.label);

    const inSubs = (p: Product, labels: string[]) => {
      const subs = p.subcategories && p.subcategories.length > 0
        ? p.subcategories
        : p.subcategory ? [p.subcategory] : [];
      return subs.some((s) => labels.includes(s));
    };

    if (activeSubcategory) {
      return sortByPrice(inCategory.filter((p) => inSubs(p, [activeSubcategory.label])));
    }

    if (activeGroupSubcategoryLabels) {
      const inGroup = inCategory.filter((p) => inSubs(p, activeGroupSubcategoryLabels));
      return onePerSubcategory(sortByPopularity(inGroup));
    }

    return onePerSubcategory(sortByPopularity(inCategory));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug, groupSlug, subcategorySlug, products]);

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

      {/* Group filters (for categories that have groups) */}
      {activeCategory && hasGroups && (
        <div className="flex overflow-x-auto gap-2 mb-4 [&>*]:shrink-0 justify-start sm:justify-center [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          <Link
            href={`/shop?category=${activeCategory.slug}`}
            className={`text-xs tracking-widest uppercase px-3 py-1 transition-colors ${
              !activeGroup
                ? "text-[var(--foreground)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            All
          </Link>
          {groupList.map((grp) => (
            <Link
              key={grp.slug}
              href={`/shop?category=${activeCategory.slug}&group=${grp.slug}`}
              className={`text-xs tracking-widest uppercase px-3 py-1 transition-colors ${
                activeGroup?.slug === grp.slug
                  ? "text-[var(--foreground)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {grp.label}
            </Link>
          ))}
        </div>
      )}

      {/* Subcategory filters — only shown when group has multiple subcategories, or category has no groups */}
      {activeCategory && (!hasGroups || (activeGroup && activeGroup.subcategories.length > 1)) && visibleSubcategories.length > 0 && (
        <div className="flex overflow-x-auto gap-2 mb-4 [&>*]:shrink-0 justify-start sm:justify-center [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          <Link
            href={
              activeGroup
                ? `/shop?category=${activeCategory.slug}&group=${activeGroup.slug}`
                : `/shop?category=${activeCategory.slug}`
            }
            className={`text-xs tracking-widest uppercase px-3 py-1 transition-colors ${
              !activeSubcategory
                ? "text-[var(--foreground)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            All
          </Link>
          {visibleSubcategories.map((sub) => (
            <Link
              key={sub.slug}
              href={
                activeGroup
                  ? `/shop?category=${activeCategory.slug}&group=${activeGroup.slug}&subcategory=${sub.slug}`
                  : `/shop?category=${activeCategory.slug}&subcategory=${sub.slug}`
              }
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

      <div className="mb-8" />

      {(() => {
        // Paginate only in "All" views (category or group level, no specific subcategory selected)
        const isAllView = !!activeCategory && !activeSubcategory;
        const displayed = isAllView ? filtered.slice(0, visibleCount) : filtered;
        const hasMore = isAllView && visibleCount < filtered.length;

        return filtered.length === 0 ? (
          <p className="text-center text-[var(--muted)] tracking-widest uppercase text-sm">
            Coming soon
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayed.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="group bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent-gold)] transition-colors"
            >
              <div className="aspect-square bg-[var(--border)] flex items-center justify-center relative">
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
                {(product.product_variants ?? []).length > 0 &&
                  !(product.product_variants ?? []).some((v) => v.available) && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-xs tracking-widest uppercase border border-white px-3 py-1">
                        Out of Stock
                      </span>
                    </div>
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
            {hasMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisibleCount((n) => n + 3)}
                  className="text-xs tracking-widest uppercase px-10 py-3 border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors"
                >
                  More
                </button>
              </div>
            )}
          </>
        );
      })()}
    </>
  );
}
