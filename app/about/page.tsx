import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Preveil is built on one insight: you are always inside a veil. The materialist moment told you meaning was the illusion. We make goods for those who went back and checked.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">

      {/* Header */}
      <p className="text-sm tracking-[0.4em] uppercase text-[var(--accent-gold)] mb-6">
        Our Philosophy
      </p>
      <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-light tracking-wide text-[var(--foreground)] mb-16 leading-tight">
        Before the veil was drawn,
      </h1>

      {/* Body */}
      <div className="flex flex-col gap-8 text-[var(--muted)] leading-relaxed text-xl font-[family-name:var(--font-body)]">

        <p>
          meaning wasn&apos;t a question. The world was storied, symbolic, alive, capable of meeting
          you. The ache had a name and the name pointed somewhere real. You were always inside a
          paradigm, always looking through a lens, but you knew it. The question was never whether
          you are wearing a veil. That was settled. The question is whether you chose it. Whether
          you know what it costs.{" "}
          <span className="text-[var(--accent-gold)] text-xl">Whether you can read what it forecloses.</span>
        </p>

        <p>
          Over several centuries, Western thought drew a specific veil, so gradually that most
          people stopped being able to see it as a philosophical position at all. What began as
          method became metaphysics. A world that was storied, symbolic, alive, capable of meeting
          you gave way to a world of neutral substrate where meaning could only be projected, never
          found. The ache, the inconsolable longing that nothing in the physical world satisfies,
          was relabeled as noise. Malfunction. Sentimentality.{" "}
          <span className="text-[var(--accent-gold)] text-xl">The haunting was declared a ghost.</span>
        </p>

        <p>
          Without the awareness that you are inside a veil at all, the crisis does not resolve. It
          oscillates. One paradigm collapses and the bell swings to the next: one ideology, then
          its mirror, then the next container, then its mirror. Each new veil is worn just as
          unconsciously as the last. The bell keeps swinging because there is no stable ground from
          which to choose.{" "}
          <span className="text-[var(--accent-gold)] text-xl">Only subjection to the mechanism. Not consciousness of it.</span>
        </p>

        <p>
          Preveil is not a call to return to the past. It is a call to a posture: go back and
          rescue what was lost. The knowledge that meaning is real, that the ache is signal, that
          the world is capable of meeting you. Recover that orientation first, and you can choose
          your current veil deliberately. You cannot choose consciously from inside a veil you
          believe is not a veil.
        </p>

        <p>
          The goal is not to remove the veil. That was never on offer. The goal is translucency:
          structured enough to be a genuine person, with real weight, real vulnerability, real
          capacity to suffer, and permeable enough to be exceeded by something larger. The two
          failure modes, sealing yourself off so nothing genuine can enter or dissolving the self
          until the ache is relabeled as noise, are both forms of unconscious veil-wearing.{" "}
          <span className="text-[var(--accent-gold)] text-xl">The narrow path is the conscious one.</span>
        </p>

        <p>
          The translucent gold veil draped over our name is not hiding it. It is revealing it
          through a medium.{" "}
          <span className="text-[var(--accent-gold)] text-xl">Not a barrier. A transmission.</span>{" "}
          The goods are covered in veils, because there is no getting away from them. To wear
          Preveil is to wear the symbol of the posture: the veil you chose, knowing what it is.
        </p>

        <p>
          We make goods for those who remember.
        </p>

      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border)] my-16" />

      {/* Quote */}
      <blockquote className="font-[family-name:var(--font-heading)] text-2xl font-light italic text-[var(--foreground)] leading-relaxed mb-4">
        &ldquo;The eye through which I see God is the same eye through which God sees me.&rdquo;
      </blockquote>
      <p className="text-sm text-[var(--muted)] tracking-widest uppercase">
        — Meister Eckhart
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
