import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Preveil is a brand for the scientifically literate and the meaning-hungry — those who sense the world is haunted by something real, and who want to live in that awareness rather than argue it away.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">

      {/* Header */}
      <p className="text-sm tracking-[0.4em] uppercase text-[var(--accent-gold)] mb-6">
        Our Philosophy
      </p>
      <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-light tracking-wide text-[var(--foreground)] mb-16 leading-tight">
        The world is haunted.
      </h1>

      {/* Body */}
      <div className="flex flex-col gap-8 text-[var(--muted)] leading-relaxed text-lg font-[family-name:var(--font-body)]">

        <p>
          The longing you feel before something genuinely beautiful — the inconsolable homesickness
          for a place you&apos;ve never been — is not a malfunction. C.S. Lewis called it{" "}
          <em>Sehnsucht</em>: desire unlike any other, because nothing in the physical world
          satisfies it. His argument: if nothing here answers the ache, perhaps the ache is not
          a response to the physical world at all.{" "}
          <span className="text-[var(--accent-gold)] text-xl">The haunting is the signal.</span>{" "}
          Something is pressing through.
        </p>

        <p>
          Over several centuries, Western thought drew a veil — so gradually that most people
          could no longer see it as a philosophical position. What began as method became
          metaphysics. A world that was storied, symbolic, alive — capable of meeting you —
          gave way to a world of neutral substrate where meaning could only be projected, never
          found. The world didn&apos;t lose its charge.{" "}
          <span className="text-[var(--accent-gold)] text-xl">We lost our grounding.</span>
        </p>

        <p>
          The response to this loss splits into two failure modes. The first: seal yourself off.
          Contract around what you know, let nothing genuinely other reach you — the self
          confirms itself and nothing larger can enter. The second: dissolve the self entirely.
          Accept that humans are no different from any other matter, that the ache is noise not
          signal. Neither can be lived honestly. One closes the circuit. The other removes the
          conductor.{" "}
          <span className="text-[var(--accent-gold)] text-xl">The translucent path runs between them.</span>
        </p>

        <p>
          Translucent: structured enough to be a genuine person — with real weight, real
          vulnerability, real capacity to suffer — and permeable enough to be exceeded by
          something larger. The suffering is not incidental. Full presence is the condition
          for genuine contact. This is the identity Preveil is pointing at: someone who has
          chosen the ceiling-less over the collapsing — love, wonder, craft, vocation —
          relationships that widen rather than narrow because the other is genuinely other.
        </p>

        <p>
          The veil has always been a threshold garment. Brides wear veils not to conceal
          something shameful but to mark the moment before the sacred is revealed. The crisis
          is not that we stand at the threshold. It is that we have left the building —
          forgotten the veil was there, forgotten something is on the other side. The call is
          to return. Not to stay at the threshold — the threshold is not the destination. But{" "}
          <span className="text-[var(--accent-gold)] text-xl">you cannot cross what you have forgotten exists.</span>
        </p>

        <p>
          The translucent gold veil draped over our name is not hiding it. It is revealing it
          through a medium.{" "}
          <span className="text-[var(--accent-gold)] text-xl">Not a barrier. A transmission.</span>{" "}
          The product is the declaration.
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
