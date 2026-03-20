import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Preveil is a lifestyle brand built around re-enchantment — the belief that the world is charged with wonder, meaning, and mystery waiting to be rediscovered.",
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
          Something was lost in the Enlightenment. Not reason — reason is a gift.
          What was lost was the older sense that the world is not merely a collection
          of objects to be measured and managed, but a living mystery to be inhabited
          with reverence.
        </p>
        <p>
          The medieval peasant who crossed himself before a storm, the shepherd who
          read the stars as a language, the craftsman who believed his work participated
          in something sacred — they were not simply superstitious. They were attuned
          to a dimension of reality that modern secular culture has methodically
          trained us to ignore.
        </p>
        <p>
          <em>Re-enchantment</em> is the name for the movement — quiet, growing — of
          people who refuse to accept the flatness of a purely material world. It is
          not a rejection of science or progress. It is the insistence that the world
          is more than what can be measured, and that this surplus of meaning is not
          a projection but a discovery.
        </p>
        <p>
          Preveil was built for those people. The name holds two meanings: to
          <em> prevail</em> — to persist, to endure, to overcome — and <em>pre-veil</em>,
          a gesture toward the world as it appeared before the secular veil was drawn
          across it. Charged. Storied. Alive.
        </p>
        <p>
          We make goods that carry that sensibility. Not costume, not irony — but
          objects that quietly insist on a different way of seeing.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border)] my-16" />

      {/* Quote */}
      <blockquote className="font-[family-name:var(--font-heading)] text-2xl font-light italic text-[var(--foreground)] leading-relaxed mb-4">
        &ldquo;The world is not a problem to be solved but a mystery to be lived.&rdquo;
      </blockquote>
      <p className="text-sm text-[var(--muted)] tracking-widest uppercase">
        — Gabriel Marcel
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
