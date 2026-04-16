"use client";

import { useState, useMemo, useEffect } from "react";

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
  onColorChange,
  onVariantChange,
}: {
  product: Product;
  variants: Variant[];
  controlledColor?: string;
  onColorChange?: (color: string) => void;
  onVariantChange?: (variant: Variant | null) => void;
}) {
  const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

  const availableVariants = useMemo(() => {
    const filtered = variants.filter((v) => v.available);
    // Sort flat (size-only) variants by SIZE_ORDER
    const hasSlash = filtered.some((v) => v.name.includes(" / "));
    if (hasSlash) return filtered;
    return [...filtered].sort((a, b) => {
      const ai = SIZE_ORDER.indexOf(a.name);
      const bi = SIZE_ORDER.indexOf(b.name);
      return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi);
    });
  }, [variants]);

  // Parse "Color / Size" names — fall back to flat list if no slash
  const hasColorSize = availableVariants.some((v) => v.name.includes(" / "));

  const colors = useMemo(() => {
    if (!hasColorSize) return [];
    const unique = [...new Set(availableVariants.map((v) => v.name.split(" / ")[0]))];
    // Sort by position in the images array so dropdown order matches display image order
    return unique.sort((a, b) => {
      const toKey = (c: string) => c.toLowerCase().replace(/[\s/]+/g, "-");
      const idxA = product.images.findIndex((img) => img.toLowerCase().includes(toKey(a)));
      const idxB = product.images.findIndex((img) => img.toLowerCase().includes(toKey(b)));
      return (idxA < 0 ? 999 : idxA) - (idxB < 0 ? 999 : idxB);
    });
  }, [availableVariants, hasColorSize, product.images]);

  const initialColor = colors[0] ?? "";
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(
    hasColorSize ? null : (availableVariants[0] ?? null)
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Sync color when parent changes it (e.g. clicking an image thumbnail)
  useEffect(() => {
    if (controlledColor && controlledColor !== selectedColor) {
      setSelectedColor(controlledColor);
      setSelectedSize("");
      setSelectedVariant(null);
    }
  }, [controlledColor]);

  const sizesForColor = useMemo(() => {
    if (!hasColorSize) return [];
    return availableVariants
      .filter((v) => v.name.startsWith(selectedColor + " / "))
      .map((v) => ({ size: v.name.split(" / ")[1], price: v.price }))
      .sort((a, b) => {
        const ai = SIZE_ORDER.indexOf(a.size);
        const bi = SIZE_ORDER.indexOf(b.size);
        return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi);
      });
  }, [availableVariants, selectedColor, hasColorSize]);

  function handleColorChange(color: string) {
    setSelectedColor(color);
    setSelectedSize("");
    setSelectedVariant(null);
    onColorChange?.(color);
  }

  function handleSizeChange(size: string) {
    setSelectedSize(size);
    const match = availableVariants.find(
      (v) => v.name === `${selectedColor} / ${size}`
    );
    setSelectedVariant(match ?? null);
    onVariantChange?.(match ?? null);
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
        image: product.images?.[0] ?? null,
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
                Color
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

          {/* Size dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-sm tracking-widest uppercase text-[var(--muted)]">
              Size
            </label>
            <select
              value={selectedSize}
              onChange={(e) => handleSizeChange(e.target.value)}
              className="bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] px-4 py-2 text-sm tracking-wide focus:outline-none focus:border-[var(--accent-gold)]"
            >
              <option value="">Select a size</option>
              {sizesForColor.map(({ size, price }) => (
                <option key={size} value={size}>
                  {size} — ${price}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        /* Flat variant buttons for products without color/size structure */
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
    </div>
  );
}
