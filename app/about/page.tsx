import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Preveil is a brand for those who believe the meaning crisis is real, the world is more alive than modern culture admits, and that re-enchantment is not nostalgia but recovery.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">

      {/* Header */}
      <p className="text-sm tracking-[0.4em] uppercase text-[var(--accent-gold)] mb-6">
        Our Philosophy
      </p>
      <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-light tracking-wide text-[var(--foreground)] mb-16 leading-tight">
        Before the veil was drawn
      </h1>

      {/* Body */}
      <div className="flex flex-col gap-8 text-[var(--muted)] leading-relaxed text-lg font-[family-name:var(--font-body)]">
        <p>
          Something was lost. Not in one moment but over centuries — a slow
          draining of the world's aliveness. The dominant tradition of Western
          thought learned to understand things by taking them apart, and somewhere
          in that process forgot that what it was examining had, before the
          examination, been whole.
        </p>
        <p>
          The result is the world we inherited: technically extraordinary,
          experientially hollow. The meaning crisis is real. The loneliness
          epidemic is real. The sense that modern life offers everything except
          the thing that would make it worth living — that is real too. These
          are not personal failures. They are the predictable harvest of a
          civilization that mistook the map for the territory, and the
          measurement for the thing measured.
        </p>
        <p>
          <em>Re-enchantment</em> is not nostalgia. It is not a retreat from
          reason or a return to superstition. It is the recognition that pattern,
          meaning, and presence are not projected onto a neutral world — they are
          discovered within it. That the world is, in some genuine sense, more
          alive than the dominant paradigm admits. And that recovering this
          vision is not optional for a culture that wishes to remain human.
        </p>
        <p>
          Preveil was built for the people who already sense this. The name
          carries two meanings: to <em>prevail</em> — to persist, to endure,
          to overcome — and <em>pre-veil</em>, a gesture toward the world as
          it appeared before the secular veil was drawn across it. Charged.
          Storied. Alive.
        </p>
        <p>
          We make goods that carry that sensibility. Not costume, not irony —
          but objects for those who are willing to be, as Shakespeare put it,
          God&apos;s spies. Witnesses to something sacred in the ordinary.
          People who dare to say the zeitgeist is getting it wrong, and who
          are looking for a community of others who feel it too.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border)] my-16" />

      {/* Quote */}
      <blockquote className="font-[family-name:var(--font-heading)] text-2xl font-light italic text-[var(--foreground)] leading-relaxed mb-4">
        &ldquo;We are God&apos;s spies.&rdquo;
      </blockquote>
      <p className="text-sm text-[var(--muted)] tracking-widest uppercase">
        — King Lear, Act V
      </p>

      {/* CTA */}
      <div className="mt-16">
        <Link
          href="/shop"
          className="px-10 py-3 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-sm tracking-widest uppercase hover:bg-[var(--accent-gold)] hover:text-[var(--background)] transition-colors"
        >
          Shop the Collection
        </Link>
      </div>
    </div>
  );
}
