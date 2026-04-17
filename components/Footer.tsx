import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <p className="font-[family-name:var(--font-heading)] text-xl font-light tracking-[0.2em] uppercase text-[var(--foreground)] mb-3">
            Preveil
          </p>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Goods for those who remember the enchantment of the world.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-sm tracking-widest uppercase text-[var(--muted)] mb-4">
            Navigate
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/shop" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Shop</Link>
            <Link href="/about" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">About</Link>
            <Link href="/cart" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Cart</Link>
            <Link href="/account" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Account</Link>
            <Link href="/policies" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Policies & Legal</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="text-sm tracking-widest uppercase text-[var(--muted)] mb-4">
            Contact
          </p>
          <a
            href="mailto:preveil.llc@gmail.com"
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            preveil.llc@gmail.com
          </a>
        </div>
      </div>

      <div className="border-t border-[var(--border)] px-6 py-4 max-w-6xl mx-auto">
        <p className="text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} Preveil LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
