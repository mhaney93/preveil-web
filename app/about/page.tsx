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
          Something was lost — not in a day but across centuries, through a
          shift so gradual it arrived as common sense. Before the Enlightenment,
          experience was the self-evident ground of reality: meaning, beauty,
          presence, and the sacred were not projections but discoveries, genuine
          features of a world alive to be known. After it, matter became the
          foundation and everything else was quietly demoted. Nietzsche saw what
          removing the cornerstone would cost long before the building began to
          lean. The meaning crisis is real. The loneliness epidemic is real.
          These are not personal failures — they are what a civilization looks
          like when it has been living off inherited meaning it no longer
          believes in and has not yet found a way to replace.
        </p>
        <p>
          The harder truth is that the materialist explanation was never really
          an explanation. It has been a history of convenient analogies —
          the mind as hydraulic pump, then telegraph, then clockwork, then
          computer — each era borrowing its most impressive technology to model
          reality, the map getting redrawn while the territory goes untouched.
          Newton himself drew the line: after the Principia he was explicit that
          he had described gravity&apos;s properties, not explained what gravity
          is. The tradition that followed erased his caution. And there is a
          structural reason the gap stays open: to genuinely know something
          requires more than propositions about it. Kierkegaard understood this
          — the radical leap of faith is the quality-not-quantity distinction
          made existential, the moment when the accumulated map runs out and
          the territory demands a different kind of engagement entirely.
          No stack of description ever closes that distance.
        </p>
        <p>
          <em>Re-enchantment</em> is the name for what comes after seeing this
          clearly. Not nostalgia, not superstition — the veil is translucent,
          not opaque. The recovery Preveil points toward is a hero&apos;s
          journey: going back to retrieve what was dropped on the way through
          modernity and re-integrating it, without the contempt that dismissed
          the pre-modern world wholesale, and with the scientific literacy to
          carry it forward. At the root of the pre-modern West is a tradition
          whose central claim is love. That is not a sectarian point — it is
          the observation that the grace visible in a Feynman lifting a flower
          into wonder, or a Hitchens charming a room into aliveness, is drawing
          on a well dug long before either of them arrived. Preveil was built
          for the people who sense all of this — who feel the weight of what
          was lost, and who are looking for others willing to say so. The name
          carries two meanings: to <em>prevail</em>, and <em>pre-veil</em> —
          before the world was divided into what counts as real and what
          doesn&apos;t. We make goods for those willing to be, as Shakespeare
          put it, God&apos;s spies. Witnesses to something sacred in the
          ordinary.
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
