import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Preveil — Re-enchant your world",
  description: "Preveil is a lifestyle brand for those drawn to wonder, mystery, and the sacred. Shop high-quality apparel, home goods, wall art, and more.",
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-40 border-b border-[var(--border)]">
        <p className="text-sm tracking-[0.4em] uppercase text-[var(--accent-gold)] mb-6">
          Re-enchant your world
        </p>
        <h1 className="font-[family-name:var(--font-heading)] text-6xl md:text-8xl font-light tracking-wider text-[var(--foreground)] mb-8">
          Preveil
        </h1>
        <p className="max-w-md text-lg text-[var(--muted)] leading-relaxed mb-12">
          Before the veil was drawn over the world, life was charged with wonder.
          We make goods for those who remember.
        </p>
        <Link
          href="/shop"
          className="px-10 py-3 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-sm tracking-widest uppercase hover:bg-[var(--accent-gold)] hover:text-[var(--background)] transition-colors"
        >
          Shop Now
        </Link>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto w-full px-6 py-24">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl font-light tracking-widest text-center uppercase mb-16 text-[var(--foreground)]">
          Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Apparel", "Home Goods", "Wall Art"].map((category) => (
            <Link
              key={category}
              href={`/shop?category=${category.toLowerCase().replace(" ", "-")}`}
              className="group bg-[var(--card)] border border-[var(--border)] p-12 flex flex-col items-center justify-center text-center hover:border-[var(--accent-gold)] transition-colors"
            >
              <span className="font-[family-name:var(--font-heading)] text-2xl font-light tracking-widest text-[var(--foreground)] group-hover:text-[var(--accent-gold)] transition-colors uppercase">
                {category}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand statement */}
      <section className="border-t border-[var(--border)] px-6 py-24 text-center">
        <blockquote className="max-w-2xl mx-auto font-[family-name:var(--font-heading)] text-2xl font-light italic text-[var(--muted)] leading-relaxed">
          &ldquo;The world is not a problem to be solved but a mystery to be lived.&rdquo;
        </blockquote>
      </section>
    </div>
  );
}
