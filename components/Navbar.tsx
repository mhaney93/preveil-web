"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

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
          onClick={() => setMenuOpen(false)}
          className="font-[family-name:var(--font-heading)] text-2xl font-light tracking-[0.2em] text-[var(--foreground)] uppercase"
        >
          Preveil
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-8">
          <Link href="/shop" className="text-sm tracking-widest uppercase text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            Shop
          </Link>
          <Link href="/about" className="text-sm tracking-widest uppercase text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            About
          </Link>
          <Link href="/account" className="text-sm tracking-widest uppercase text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            Account
          </Link>
          <Link href="/cart" className="relative text-sm tracking-widest uppercase text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 text-sm text-[var(--accent-gold)]">{cartCount}</span>
            )}
          </Link>
        </nav>

        {/* Mobile: cart count + hamburger */}
        <div className="flex sm:hidden items-center gap-4">
          <Link href="/cart" className="relative text-sm tracking-widest uppercase text-[var(--muted)]">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 text-sm text-[var(--accent-gold)]">{cartCount}</span>
            )}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <span className="text-xl leading-none">✕</span>
            ) : (
              <span className="flex flex-col gap-1">
                <span className="block w-5 h-px bg-current" />
                <span className="block w-5 h-px bg-current" />
                <span className="block w-5 h-px bg-current" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="sm:hidden border-t border-[var(--border)] px-6 py-4 flex flex-col gap-4">
          <Link href="/shop" onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            Shop
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            About
          </Link>
          <Link href="/account" onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            Account
          </Link>
        </nav>
      )}
    </header>
  );
}
