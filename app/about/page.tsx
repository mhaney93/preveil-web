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
      <h1 className="font-[family-name:var(--font-heading)] text-h1-sm md:text-h1-lg font-light tracking-wide text-[var(--foreground)] mb-16 leading-tight">
        Before the veil was drawn,
      </h1>

      {/* Body */}
      <div className="flex flex-col gap-8 text-[var(--muted)] leading-relaxed text-xl font-[family-name:var(--font-body)]">

        <p>
          meaning was felt, not named. Recognized, not mapped. The longing for its embodiment pointed somewhere
          real, and the world was organized around that recognition. We were driven to map this
          territory. First with enacted story. Then, step by step, one paradigm sublating into the
          next, grand mythology hardened into the cold mechanics of the Enlightenment.{" "}
          <span className="text-[var(--accent-gold)] text-xl gold-glow">We arrived at the materialist worldview:</span>{" "}
          nothing existed that could not, in principle, be measured.
        </p>

        <p>
          Measurement became metaphysics. Meaning could only be projected onto a neutral
          substrate, never found within it. That longing was relabeled as noise. Malfunction.
          Sentimentality.{" "}
          <span className="text-[var(--accent-gold)] text-xl gold-glow">The haunting was declared a ghost.</span>
        </p>

        <p>
          But renaming it didn't make it go away. The materialist lens subsumed meaning itself,
          reclassifying it as merely a subjective illusion of the mind. Seemingly eclipsed,
          digested, and marginalized into silence, the haunting of the soul, the song without a
          voice, settled into what we now call the meaning crisis. Its symptoms are everywhere —
          the loneliness epidemic, the collapse of shared narrative, the mental health crisis, the
          political fracture. Some call it the meta-crisis: a cluster of breakdowns with a single
          root. Alas, the glimmer of light
          inevitably crests above the horizon; the stomach rumbles; the echoes, having traveled
          far enough, reach the wall and reverberate. Our sense of meaning goes looking for
          somewhere to land. Ideology, consumption, outrage, the relentless optimization of the
          self — each promises to quiet it. None do.{" "}
          <span className="text-[var(--accent-gold)] text-xl gold-glow">Forced into ill-fit containers, our quest for meaning loses its shape.</span>
        </p>

        <p>
          Each of those containers is itself a veil — the shape a culture gives to what it
          cannot otherwise hold. Each worldview is a veil folding over the last, each seeing the same territory through
          a different lens. But there is a trap buried in the fold: every new map defines itself
          by negating the one before it. The materialist veil made the rejection of its
          predecessor its cornerstone, inheriting the shape of what it refused. The only exit is not another reaction — it is
          to strip the accumulated assumptions and meet meaning before it has been named. Not a
          return to a prior veil. An approach to the territory as though it has not yet been
          charted. You cannot choose your veil consciously from inside one you believe is not a veil.
        </p>

        <p>
          The translucent gold veil draped over our name is not hiding it. It is revealing it
          through a medium.{" "}
          <span className="text-[var(--accent-gold)] text-xl gold-glow">Not a barrier. A transmission.</span>{" "}
          The goods are covered in veils, because there is no getting away from them. To wear
          Preveil is to wear the symbol of the posture: the veil you chose, knowing what it is.
          The name carries both movements —{" "}
          <span className="text-[var(--accent-gold)] text-xl gold-glow">the veil, and the act of prevailing through it.</span>
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
