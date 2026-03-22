"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
      subcategories: ["t-shirts", "all-over-shirts", "polo-shirts", "tank-tops", "3-4-sleeve-shirts", "long-sleeve", "embroidered-shirts"],
    },
    {
      slug: "jackets-vests",
      label: "Jackets & Vests",
      subcategories: ["jackets-vests"],
    },
    {
      slug: "all-hoodies-sweatshirts",
      label: "Hoodies & Sweatshirts",
      subcategories: ["hoodies", "sweatshirts", "knitwear"],
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
      subcategories: ["t-shirts", "polo-shirts", "all-over-shirts", "tank-tops", "crop-tops", "embroidered-shirts", "3-4-sleeve-shirts", "long-sleeve"],
    },
    {
      slug: "dresses",
      label: "Dresses",
      subcategories: ["dresses"],
    },
    {
      slug: "knitwear",
      label: "Knitwear",
      subcategories: ["knitwear"],
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
      subcategories: ["t-shirts", "all-over-shirts", "long-sleeve", "hoodies"],
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
    { slug: "all-over-shirts", label: "All-Over Shirts" },
    { slug: "polo-shirts", label: "Polo Shirts" },
    { slug: "tank-tops", label: "Tank Tops" },
    { slug: "3-4-sleeve-shirts", label: "3/4 Sleeve Shirts" },
    { slug: "long-sleeve", label: "Long Sleeve Shirts" },
    { slug: "embroidered-shirts", label: "Embroidered Shirts" },
    { slug: "jackets-vests", label: "Jackets & Vests" },
    { slug: "hoodies", label: "Hoodies" },
    { slug: "sweatshirts", label: "Sweatshirts" },
    { slug: "knitwear", label: "Knitwear" },
    { slug: "joggers", label: "Sweatpants & Joggers" },
    { slug: "underwear", label: "Underwear" },
    { slug: "leggings", label: "Leggings" },
    { slug: "shorts", label: "Shorts" },
    { slug: "pants", label: "Pants" },
    { slug: "swimwear", label: "Swimwear" },
  ],
  "womens-clothing": [
    { slug: "t-shirts", label: "T-Shirts" },
    { slug: "all-over-shirts", label: "All-Over Shirts" },
    { slug: "polo-shirts", label: "Polo Shirts" },
    { slug: "tank-tops", label: "Tank Tops" },
    { slug: "crop-tops", label: "Crop Tops" },
    { slug: "embroidered-shirts", label: "Embroidered Shirts" },
    { slug: "3-4-sleeve-shirts", label: "3/4 Sleeve Shirts" },
    { slug: "long-sleeve", label: "Long Sleeve Shirts" },
    { slug: "dresses", label: "Dresses" },
    { slug: "knitwear", label: "Knitwear" },
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
    { slug: "all-over-shirts", label: "All-Over Shirts" },
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

  // Labels of subcategories in the active group (for filtering products)
  const activeGroupSubcategoryLabels = activeGroup
    ? activeGroup.subcategories
        .map((slug) => subcategoryList.find((s) => s.slug === slug)?.label)
        .filter((label): label is string => !!label)
    : null;

  const filtered = products.filter((p) => {
    if (activeCategory && p.category !== activeCategory.label) return false;
    if (activeSubcategory) {
      if (p.subcategory !== activeSubcategory.label) return false;
    } else if (activeGroupSubcategoryLabels) {
      if (!p.subcategory || !activeGroupSubcategoryLabels.includes(p.subcategory)) return false;
    }
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
