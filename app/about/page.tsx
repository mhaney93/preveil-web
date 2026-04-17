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
          Something happened. Not a discovery — a shift. A slow reorganization
          of Western common sense about what is real. Before the Enlightenment
          and the Scientific Revolution, experience was the self-evident ground
          of reality: the felt texture of the world, the weight of meaning, the
          recognition that some things genuinely matter. After it, matter became
          the foundation and experience was quietly demoted to a byproduct. Two
          hundred years later, this arrangement is so thoroughly absorbed into
          ordinary life that most people do not recognize it as a philosophical
          position at all. They take it as obvious. The veil is not a metaphor.
          It is this shift — and Preveil is named for the world before it was drawn.
        </p>
        <p>
          The deeper problem is that physicalism is not really an explanation.
          It is a history of convenient analogies, periodically revised: the
          mind as hydraulic pump, then telegraph, then clockwork, then computer.
          Each era borrows the most impressive technology of its moment and
          declares it the model of reality. The analogy eventually fails; the
          map gets updated; the cycle repeats — and the revision gets mistaken
          for progress. Newton himself understood the difference. After writing
          the Principia, he was explicit: he had described the properties of
          gravity, not explained what gravity is. The tradition that followed
          forgot his caution and began treating description as explanation.
          The hard problem of consciousness has been the same problem since
          Descartes. The map has been redrawn dozens of times. The gap has
          not closed.
        </p>
        <p>
          <em>Re-enchantment</em> is what comes after recognizing this. Not
          nostalgia, not superstition — the insistence that the map serve the
          territory rather than replace it. That quality is not reducible to
          quantity. That experience is not a byproduct of matter but its ground.
          Preveil was built for the people who already sense the weight of this
          — who feel the meaning crisis not as a personal failure but as a
          civilizational one, and who are looking for others willing to say so.
          The name carries two meanings: to <em>prevail</em>, and{" "}
          <em>pre-veil</em> — before the moment the world was divided into what
          counts as real and what doesn&apos;t. We make goods that carry that
          sensibility. Objects for those willing to be, as Shakespeare put it,
          God&apos;s spies. Witnesses to something sacred in the ordinary.
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
