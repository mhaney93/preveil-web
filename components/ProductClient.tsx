"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ProductImages from "./ProductImages";
import AddToCartButton from "./AddToCartButton";
import { type SizeGuideType } from "./SizeGuideModal";

const CATEGORY_SLUGS: Record<string, string> = {
  "Men's Clothing": "mens-clothing",
  "Women's Clothing": "womens-clothing",
  "Kids' & Youth Clothing": "kids-clothing",
  "Hats": "hats",
  "Accessories": "accessories",
  "Home & Living": "home-living",
};

interface Variant {
  id: string;
  name: string;
  price: number;
  available: boolean;
}


const BOTTOM_SUBCATEGORIES = new Set([
  "Leggings",
  "Sweatpants & Joggers",
  "Underwear",
  "Shorts",
  "Athletic Shorts",
  "Track Pants",
  "Pants",
  "Skirts",
  "Swimwear",
]);

interface Product {
  id: string;
  name: string;
  slug: string;
  images: string[];
  category?: string;
  subcategory?: string;
  description?: string;
  price_from: number;
  [key: string]: unknown;
}

function findImageForColor(images: string[], color: string): number {
  const key = color.toLowerCase().replace(/[\s/]+/g, "-");
  const idx = images.findIndex((img) => img.toLowerCase().includes(key));
  return idx >= 0 ? idx : 0;
}

// Match the longest color key found in a filename so "Black" doesn't match "Black Camo" images.
function getColorForImage(imageUrl: string, colors: string[]): string | null {
  const filename = imageUrl.split("/").pop()?.toLowerCase() ?? "";
  const sorted = [...colors].sort((a, b) => b.length - a.length);
  for (const color of sorted) {
    const key = color.toLowerCase().replace(/[\s/]+/g, "-");
    if (filename.includes(`-${key}-`) || filename.includes(`-${key}.`)) return color;
  }
  return null;
}

export default function ProductClient({
  product,
  variants,
}: {
  product: Product;
  variants: Variant[];
}) {
  const images = product.images ?? [];
  const availableVariants = variants.filter((v) => v.available);
  const hasColorSize = availableVariants.some((v) => v.name.includes(" / "));

  // Determine size guide type — only for clothing with actual size variants
  const hasSizes = availableVariants.some((v) => {
    const part = v.name.includes(" / ") ? v.name.split(" / ")[1] : v.name;
    return ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"].includes(part);
  });
  const sizeGuideType: SizeGuideType | undefined = hasSizes
    ? BOTTOM_SUBCATEGORIES.has(product.subcategory ?? "") ? "bottoms" : "tops"
    : undefined;

  const initialColor = useMemo(() => {
    if (!hasColorSize) return "";
    const unique = [...new Set(availableVariants.map((v) => v.name.split(" / ")[0]))];
    const toKey = (c: string) => c.toLowerCase().replace(/[\s/]+/g, "-");
    const sorted = unique.sort((a, b) => {
      const idxA = images.findIndex((img) => img.toLowerCase().includes(toKey(a)));
      const idxB = images.findIndex((img) => img.toLowerCase().includes(toKey(b)));
      return (idxA < 0 ? 999 : idxA) - (idxB < 0 ? 999 : idxB);
    });
    return sorted[0] ?? "";
  }, [availableVariants, hasColorSize, images]);

  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedImageIndex, setSelectedImageIndex] = useState(
    hasColorSize ? findImageForColor(images, initialColor) : 0
  );
  const [selectedVariantPrice, setSelectedVariantPrice] = useState<number | null>(null);

  const allColors = useMemo(() => {
    if (!hasColorSize) return [] as string[];
    return [...new Set(availableVariants.map((v) => v.name.split(" / ")[0]))];
  }, [availableVariants, hasColorSize]);

  // Map each image index back to whichever color it represents
  const imageIndexToColor = useMemo(() => {
    if (!hasColorSize) return {} as Record<number, string>;
    const map: Record<number, string> = {};
    for (const color of allColors) {
      const idx = findImageForColor(images, color);
      if (!(idx in map)) map[idx] = color;
    }
    return map;
  }, [allColors, hasColorSize, images]);

  // Only filter thumbnails by color when there are multiple images per color (e.g. front + back)
  const hasMultipleImagesPerColor = hasColorSize && images.length > allColors.length;
  const visibleThumbnailIndices = useMemo(() => {
    if (!hasMultipleImagesPerColor || !selectedColor) return images.map((_, i) => i);
    return images
      .map((_, i) => i)
      .filter((i) => getColorForImage(images[i], allColors) === selectedColor);
  }, [images, selectedColor, hasMultipleImagesPerColor, allColors]);

  const priceLabel = useMemo(() => {
    if (selectedVariantPrice !== null) return `$${selectedVariantPrice.toFixed(2)}`;
    const prices = availableVariants.map((v) => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `$${min.toFixed(2)}` : `$${min.toFixed(2)} – $${max.toFixed(2)}`;
  }, [selectedVariantPrice, availableVariants]);

  function handleImageSelect(i: number) {
    setSelectedImageIndex(i);
    const color = imageIndexToColor[i];
    if (color) setSelectedColor(color);
  }

  function handleColorChange(color: string) {
    setSelectedColor(color);
    setSelectedImageIndex(findImageForColor(images, color));
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
      {/* Image gallery */}
      <ProductImages
        images={images}
        name={product.name}
        selectedIndex={selectedImageIndex}
        visibleThumbnailIndices={visibleThumbnailIndices}
        onSelect={handleImageSelect}
      />

      {/* Details */}
      <div className="flex flex-col justify-center">
        {product.category && (
          CATEGORY_SLUGS[product.category] ? (
            <Link
              href={`/shop?category=${CATEGORY_SLUGS[product.category]}`}
              className="text-sm tracking-widest uppercase text-[var(--muted)] mb-3 hover:text-[var(--accent-gold)] transition-colors"
            >
              {product.category}
            </Link>
          ) : (
            <p className="text-sm tracking-widest uppercase text-[var(--muted)] mb-3">
              {product.category}
            </p>
          )
        )}
        <h1 className="font-[family-name:var(--font-heading)] text-4xl font-light tracking-wide text-[var(--foreground)] mb-4">
          {product.name}
        </h1>
        <p className="text-[var(--accent-gold)] tracking-wide mb-6">
          {priceLabel}
        </p>
        {product.description && (
          <p className="text-[var(--muted)] leading-relaxed mb-8">
            {product.description}
          </p>
        )}
        {variants.length > 0 && (
          <AddToCartButton
            product={product}
            variants={variants}
            controlledColor={selectedColor}
            sizeGuideType={sizeGuideType}
            onColorChange={handleColorChange}
            onVariantChange={(v) => {
            setSelectedVariantPrice(v ? v.price : null);
            if (v && !hasColorSize) {
              const idx = availableVariants.findIndex((av) => av.id === v.id);
              if (idx >= 0 && idx < images.length) setSelectedImageIndex(idx);
            }
          }}
          />
        )}
      </div>
    </div>
  );
}
