import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col items-center gap-6 text-center">
        <p className="font-[family-name:var(--font-heading)] text-2xl font-light tracking-[0.3em] uppercase text-[var(--foreground)]">
          Preveil
        </p>
        <p className="text-sm text-[var(--muted)]">
          Re-enchant your world.
        </p>
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          {[
            { label: "Shop", href: "/shop" },
            { label: "About", href: "/about" },
            { label: "Cart", href: "/cart" },
            { label: "Account", href: "/account" },
            { label: "Policies", href: "/policies" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors tracking-widest uppercase"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-[var(--border)] px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <a
            href="mailto:preveil.llc@gmail.com"
            className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            preveil.llc@gmail.com
          </a>
          <p className="text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} Preveil LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
