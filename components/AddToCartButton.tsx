"use client";

import { useState } from "react";

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
}: {
  product: Product;
  variants: Variant[];
}) {
  const availableVariants = variants.filter((v) => v.available);
  const [selectedVariant, setSelectedVariant] = useState(
    availableVariants[0] ?? null
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

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
      {/* Variant selector */}
      <div className="flex flex-wrap gap-2">
        {availableVariants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => setSelectedVariant(variant)}
            className={`px-4 py-2 text-sm tracking-wide border transition-colors ${
              selectedVariant?.id === variant.id
                ? "border-[var(--accent-gold)] text-[var(--accent-gold)]"
                : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--foreground)]"
            }`}
          >
            {variant.name}
          </button>
        ))}
      </div>

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
        className="px-10 py-3 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-sm tracking-widest uppercase hover:bg-[var(--accent-gold)] hover:text-[var(--background)] transition-colors"
      >
        {added ? "Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}
