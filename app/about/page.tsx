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
          the world was charged with meaning that didn&apos;t need defending,
          only inhabiting. The meaning crisis, the loneliness epidemic, the
          sense that modern life offers everything except the thing that would
          make it worth living: this is what a civilization looks like when it
          has given something foundational away and hasn&apos;t yet reckoned
          with the cost.
        </p>
        <p>
          Something shifted over the centuries when the Western tradition
          learned to explain the world by taking it apart. The method was
          extraordinary: matter mastered, distances collapsed, lifespans
          doubled. But somewhere the method became the metaphysic. Description
          became explanation. The map became the territory. The world that had
          been storied, symbolic, alive, capable of meeting you, gave way to a
          world of neutral substrate where meaning could only be projected onto
          things, never found within them. The veil is the name for that
          moment. Preveil is a gesture toward the world before it fell.
        </p>
        <p>
          Re-enchantment is the refusal to accept that trade as final. Wonder,
          belonging, mystery, the sacred are permanent features of being human.
          A culture that loses them doesn&apos;t become more rational. It
          becomes less alive. Preveil was built for the person who senses the
          zeitgeist is getting something wrong, who can&apos;t settle for a
          world drained of meaning, and who is looking for others who feel it
          too. The name carries two things: to <em>prevail</em>, and{" "}
          <em>pre-veil</em>. We make goods for those willing to be, as
          Shakespeare put it, God&apos;s spies.
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
