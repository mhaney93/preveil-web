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
          reclassifying it as a merely subjective illusion of the mind. Seemingly eclipsed,
          digested, and marginalized into silence — the glimmer of light inevitably crests above
          the horizon; the stomach rumbles; the echoes, having traveled far enough, reach the
          wall and reverberate. The haunting of the soul, the song without a voice, settled into
          what we now call the meaning crisis. It goes looking for somewhere to land. Ideology,
          consumption, outrage, the relentless optimization of the self — each promises to quiet
          it. None do.{" "}
          <span className="text-[var(--accent-gold)] text-xl gold-glow">Forced into ill-fitted containers, it creeps into its worst expression.</span>
        </p>

        <p>
          Think of each worldview as a veil folding over the last. Each one sees the same
          territory through a different lens. But there is a trap buried in the fold: every new
          map tends to define itself by what it refuses. Science didn't simply replace religion —
          it positioned itself against it. The materialist veil made the negation of its
          predecessor its cornerstone. And so the new map inherits the shape of what it rejected,
          haunted by its own reaction.{" "}
          <span className="text-[var(--accent-gold)] text-xl gold-glow">Every veil carries the ghost of the one it replaced.</span>
        </p>

        <p>
          The only exit is not another reaction. It is to strip the accumulated cultural software —
          the inherited assumptions, the default negations — and meet meaning before it has been
          named. Not a return to a prior veil. An approach to the territory as though it has not
          yet been charted.{" "}
          <span className="text-[var(--accent-gold)] text-xl gold-glow">The next veil should have the spirit of something unmapped.</span>{" "}
          That is what Preveil is for. You cannot choose your veil consciously from inside one
          you believe is not a veil.
        </p>

        <p>
          The translucent gold veil draped over our name is not hiding it. It is revealing it
          through a medium.{" "}
          <span className="text-[var(--accent-gold)] text-xl gold-glow">Not a barrier. A transmission.</span>{" "}
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
