"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  variantName: string;
  price: number;
  image: string | null;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") ?? "[]");
    setCart(stored);
    setLoaded(true);

    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        syncCart(user.id, stored);
      }
    });
  }, []);

  function syncCart(uid: string, items: CartItem[]) {
    fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: uid, items }),
    });
  }

  function updateQuantity(variantId: string, quantity: number) {
    const updated = cart
      .map((item) =>
        item.variantId === variantId ? { ...item, quantity } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
    if (userId) syncCart(userId, updated);
  }

  function removeItem(variantId: string) {
    const updated = cart.filter((item) => item.variantId !== variantId);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
    if (userId) syncCart(userId, updated);
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!loaded) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-light tracking-widest uppercase text-center mb-16 text-[var(--foreground)]">
        Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-[var(--muted)] tracking-widest uppercase text-sm mb-8">
            Your cart is empty
          </p>
          <Link
            href="/shop"
            className="px-10 py-3 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-sm tracking-widest uppercase hover:bg-[var(--accent-gold)] hover:text-[var(--background)] transition-colors"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {cart.map((item) => (
            <div
              key={item.variantId}
              className="flex gap-6 border-b border-[var(--border)] pb-8"
            >
              {/* Image */}
              <div className="w-24 h-24 bg-[var(--card)] border border-[var(--border)] flex-shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>

              {/* Details */}
              <div className="flex-1">
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-light text-[var(--foreground)]">
                  {item.name}
                </h2>
                <p className="text-sm tracking-widest uppercase text-[var(--muted)] mt-1">
                  {item.variantName}
                </p>
                <p className="text-[var(--accent-gold)] mt-2">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Quantity + Remove */}
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                    className="w-7 h-7 border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors text-sm"
                  >
                    −
                  </button>
                  <span className="text-[var(--foreground)] w-4 text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                    className="w-7 h-7 border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors text-sm"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.variantId)}
                  className="text-sm tracking-widest uppercase text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total + Checkout */}
          <div className="flex flex-col items-end gap-6">
            <div className="flex justify-between w-full">
              <span className="text-sm tracking-widest uppercase text-[var(--muted)]">
                Total
              </span>
              <span className="font-[family-name:var(--font-heading)] text-2xl font-light text-[var(--foreground)]">
                ${total.toFixed(2)}
              </span>
            </div>
            <Link
              href="/checkout"
              className="px-10 py-3 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-sm tracking-widest uppercase hover:bg-[var(--accent-gold)] hover:text-[var(--background)] transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
