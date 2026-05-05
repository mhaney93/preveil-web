"use client";

import { useState, useMemo, useEffect } from "react";
import SizeGuideModal, { type SizeGuideType } from "./SizeGuideModal";

interface Variant {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  images: string[];
}

export default function AddToCartButton({
  product,
  variants,
  controlledColor,
  controlledVariantName,
  sizeGuideType,
  colorLabel = "Color",
  onColorChange,
  onVariantChange,
}: {
  product: Product;
  variants: Variant[];
  controlledColor?: string;
  controlledVariantName?: string | null;
  sizeGuideType?: SizeGuideType;
  colorLabel?: string;
  onColorChange?: (color: string) => void;
  onVariantChange?: (variant: Variant | null) => void;
}) {
  const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

  const allVariantsSorted = useMemo(() => {
    const hasSlash = variants.some((v) => v.name.includes(" / "));
    if (hasSlash) return variants;
    return [...variants].sort((a, b) => {
      const ai = SIZE_ORDER.indexOf(a.name);
      const bi = SIZE_ORDER.indexOf(b.name);
      return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi);
    });
  }, [variants]);

  const availableVariants = useMemo(
    () => allVariantsSorted.filter((v) => v.available),
    [allVariantsSorted]
  );

  // Parse "Color / Size" names — fall back to flat list if no slash
  const hasColorSize = allVariantsSorted.some((v) => v.name.includes(" / "));

  const colors = useMemo(() => {
    if (!hasColorSize) return [];
    const unique = [...new Set(allVariantsSorted.map((v) => v.name.split(" / ")[0]))];
    // Sort by position in the images array so dropdown order matches display image order
    return unique.sort((a, b) => {
      const toKey = (c: string) => c.toLowerCase().replace(/[\s/]+/g, "-");
      const idxA = product.images.findIndex((img) => img.toLowerCase().includes(toKey(a)));
      const idxB = product.images.findIndex((img) => img.toLowerCase().includes(toKey(b)));
      return (idxA < 0 ? 999 : idxA) - (idxB < 0 ? 999 : idxB);
    });
  }, [allVariantsSorted, hasColorSize, product.images]);

  const initialColor = colors[0] ?? "";
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(
    hasColorSize ? null : (availableVariants[0] ?? null)
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Sync color when parent changes it (e.g. clicking an image thumbnail)
  useEffect(() => {
    if (controlledColor && controlledColor !== selectedColor) {
      setSelectedColor(controlledColor);
      setSelectedSize("");
      setSelectedVariant(null);
    }
  }, [controlledColor]);

  // Sync flat variant when parent changes it (e.g. clicking a size-specific image thumbnail)
  useEffect(() => {
    if (!controlledVariantName || hasColorSize) return;
    const match = availableVariants.find((v) => v.name === controlledVariantName);
    if (match && match.id !== selectedVariant?.id) {
      setSelectedVariant(match);
      onVariantChange?.(match);
    }
  }, [controlledVariantName]);

  // All unique sizes across every color, so every scent shows the same size grid
  // (missing sizes show as disabled rather than vanishing when switching scents)
  const allSizes = useMemo(() => {
    if (!hasColorSize) return [] as string[];
    const unique = [...new Set(allVariantsSorted.map((v) => v.name.split(" / ")[1]))];
    return unique.sort((a, b) => {
      const ai = SIZE_ORDER.indexOf(a);
      const bi = SIZE_ORDER.indexOf(b);
      return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi);
    });
  }, [allVariantsSorted, hasColorSize]);

  const sizesForColor = useMemo(() => {
    if (!hasColorSize) return [];
    return allSizes.map((size) => {
      const variant = allVariantsSorted.find(
        (v) => v.name === `${selectedColor} / ${size}`
      );
      return { size, price: variant?.price ?? 0, available: !!variant?.available };
    });
  }, [allVariantsSorted, allSizes, selectedColor, hasColorSize]);

  function handleColorChange(color: string) {
    setSelectedColor(color);
    setSelectedSize("");
    setSelectedVariant(null);
    onColorChange?.(color);
  }

  function handleSizeChange(size: string) {
    const match = availableVariants.find(
      (v) => v.name === `${selectedColor} / ${size}`
    );
    if (!match) return;
    setSelectedSize(size);
    setSelectedVariant(match);
    onVariantChange?.(match);
  }

  function addToCart() {
    if (!selectedVariant) return;

    const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
    const existingIndex = cart.findIndex(
      (item: { variantId: string }) => item.variantId === selectedVariant.id
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        variantId: selectedVariant.id,
        name: product.name,
        variantName: selectedVariant.name,
        price: selectedVariant.price,
        image: (() => {
          const images = product.images ?? [];
          const color = selectedVariant.name.includes(" / ")
            ? selectedVariant.name.split(" / ")[0]
            : selectedVariant.name;
          const key = color.toLowerCase().replace(/[\s/]+/g, "-");
          const match = images.find((img) => img.toLowerCase().includes(key));
          return match ?? images[0] ?? null;
        })(),
        quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (availableVariants.length === 0) {
    return (
      <p className="text-[var(--muted)] tracking-widest uppercase text-sm">
        Out of stock
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {hasColorSize ? (
        <>
          {/* Color dropdown — hidden when only one color */}
          {colors.length > 1 && (
            <div className="flex flex-col gap-2">
              <label className="text-sm tracking-widest uppercase text-[var(--muted)]">
                {colorLabel}
              </label>
              <select
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] px-4 py-2 text-sm tracking-wide focus:outline-none focus:border-[var(--accent-gold)]"
              >
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Size buttons */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm tracking-widest uppercase text-[var(--muted)]">
                Size
              </label>
              {sizeGuideType && (
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-xs tracking-widest uppercase text-[var(--muted)] hover:text-[var(--accent-gold)] transition-colors underline underline-offset-2"
                >
                  Size Guide
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {sizesForColor.map(({ size, available }) => (
                <div key={size} className="relative">
                  <button
                    onClick={() => handleSizeChange(size)}
                    disabled={!available}
                    className={`px-3 py-2 text-sm tracking-wide border transition-colors ${
                      selectedSize === size
                        ? "border-[var(--accent-gold)] text-[var(--accent-gold)]"
                        : available
                        ? "border-[var(--border)] text-[var(--muted)] hover:border-[var(--foreground)]"
                        : "border-[var(--border)] text-[var(--muted)] opacity-40 cursor-not-allowed"
                    }`}
                  >
                    {size}
                  </button>
                  {!available && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-px bg-[var(--muted)] opacity-60 rotate-45 scale-150" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Flat variant buttons for products without color/size structure */
        <div className="flex flex-col gap-2">
          {sizeGuideType && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="text-xs tracking-widest uppercase text-[var(--muted)] hover:text-[var(--accent-gold)] transition-colors underline underline-offset-2"
              >
                Size Guide
              </button>
            </div>
          )}
        <div className="flex flex-wrap gap-2">
          {availableVariants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => {
                setSelectedVariant(variant);
                onVariantChange?.(variant);
              }}
              className={`px-4 py-2 text-sm tracking-wide border transition-colors ${
                selectedVariant?.id === variant.id
                  ? "border-[var(--accent-gold)] text-[var(--accent-gold)]"
                  : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--foreground)]"
              }`}
            >
              {variant.name} — ${variant.price.toFixed(2)}
            </button>
          ))}
        </div>
        </div>
      )}

      {/* Quantity */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="w-8 h-8 border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors"
        >
          −
        </button>
        <span className="text-[var(--foreground)] w-4 text-center">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="w-8 h-8 border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors"
        >
          +
        </button>
      </div>

      {/* Add to cart */}
      <button
        onClick={addToCart}
        disabled={!selectedVariant}
        className="px-10 py-3 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-sm tracking-widest uppercase hover:bg-[var(--accent-gold)] hover:text-[var(--background)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {added ? "Added to Cart" : "Add to Cart"}
      </button>

      {sizeGuideOpen && sizeGuideType && (
        <SizeGuideModal type={sizeGuideType} onClose={() => setSizeGuideOpen(false)} />
      )}
    </div>
  );
}
