import type { Metadata } from "next";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import HomepageExperience from "@/components/HomepageExperience";

export const metadata: Metadata = {
  title: "Preveil — Re-enchant your world",
  description: "Preveil is a lifestyle brand for those drawn to wonder, mystery, and the sacred. Shop high-quality apparel, home goods, wall art, and more.",
};

export default async function Home() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col">
      <HomepageExperience />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-40 border-b border-[var(--border)]">
        <p className="text-sm tracking-[0.4em] uppercase text-[var(--accent-gold)] mb-6">
          Re-enchant your world
        </p>
        <h1 className="font-[family-name:var(--font-heading)] text-h1-sm md:text-hero font-light tracking-wider text-[var(--foreground)] mb-8">
          Preveil
        </h1>
        <p className="max-w-md text-lg text-[var(--muted)] leading-relaxed mb-12">
          The magic was forgotten.
          We make goods for those who remember.
        </p>
        <Link
          href="/shop"
          className="px-10 py-3 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-sm tracking-widest uppercase hover:bg-[var(--accent-gold)] hover:text-[var(--background)] transition-colors"
        >
          Shop Now
        </Link>
      </section>

      {/* Signup bonus banner — guests only */}
      {!user && (
        <section className="border-b border-[var(--border)] px-6 py-10 text-center bg-[var(--card)]">
          <p className="text-sm tracking-[0.3em] uppercase text-[var(--accent-gold)] mb-2">
            Join the community
          </p>
          <p className="font-[family-name:var(--font-heading)] text-2xl font-light text-[var(--foreground)] mb-4">
            Earn 150 points just for signing up
          </p>
          <p className="text-sm text-[var(--muted)] mb-6">
            Create a free account and receive 150 reward points — worth $1.50 to redeem at checkout. Earn more with every purchase.
          </p>
          <Link
            href="/account"
            className="px-8 py-2 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-sm tracking-widest uppercase hover:bg-[var(--accent-gold)] hover:text-[var(--background)] transition-colors"
          >
            Create Account
          </Link>
        </section>
      )}

      {/* Categories */}
      <section className="max-w-6xl mx-auto w-full px-6 py-24">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl font-light tracking-widest text-center uppercase mb-16 text-[var(--foreground)]">
          Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Men's Clothing", slug: "mens-clothing" },
            { label: "Women's Clothing", slug: "womens-clothing" },
            { label: "Accessories", slug: "accessories" },
          ].map(({ label, slug }) => (
            <Link
              key={slug}
              href={`/shop?category=${slug}`}
              className="group bg-[var(--card)] border border-[var(--border)] p-12 flex flex-col items-center justify-center text-center hover:border-[var(--accent-gold)] transition-colors"
            >
              <span className="font-[family-name:var(--font-heading)] text-2xl font-light tracking-widest text-[var(--foreground)] group-hover:text-[var(--accent-gold)] transition-colors uppercase">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand statement */}
      <section className="border-t border-[var(--border)] px-6 py-24 text-center">
        <blockquote className="max-w-2xl mx-auto font-[family-name:var(--font-heading)] text-2xl font-light italic text-[var(--muted)] leading-relaxed mb-4">
          &ldquo;The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.&rdquo;
        </blockquote>
        <p className="text-sm text-[var(--muted)] tracking-widest uppercase">— Marcel Proust</p>
      </section>
    </div>
  );
}
