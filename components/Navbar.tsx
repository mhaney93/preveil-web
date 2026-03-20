import Link from "next/link";

export default function Navbar() {
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
            className="text-sm tracking-widest uppercase text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}
