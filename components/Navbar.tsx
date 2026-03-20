"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function updateCount() {
      const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
      setCartCount(cart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0));
    }
    updateCount();
    window.addEventListener("storage", updateCount);
    return () => window.removeEventListener("storage", updateCount);
  }, []);

  return (
    <header className="border-b border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-[family-name:var(--font-heading)] text-2xl font-light tracking-[0.2em] text-[var(--foreground)] uppercase"
        >
          Preveil
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/shop"
            className="text-sm tracking-widest uppercase text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/account"
            className="text-sm tracking-widest uppercase text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Account
          </Link>
          <Link
            href="/cart"
            className="relative text-sm tracking-widest uppercase text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 text-xs text-[var(--accent-gold)]">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
