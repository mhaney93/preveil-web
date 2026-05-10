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
          meaning was felt, not named. Recognized, not mapped. The longing for it pointed somewhere
          real, and the world was organized around that recognition. We were driven to map this
          territory. First with enacted story. Then, step by step, one paradigm sublating into the
          next: grand mythology hardening into the explicit certainties of the Enlightenment. We
          arrived at the materialist worldview. Each step carried echoes of the
          ones before it: the longing, the sense of something larger pressing in. The materialist
          lens thoroughly subsumed those echoes, naming them superstition — seemingly eclipsed,
          digested, and marginalized into silence. The haunting of the soul, the song without a
          voice, settled into what we now call the meaning crisis. Alas — the glimmer of light
          inevitably crests above the horizon; the stomach rumbles; the echoes, having traveled far
          enough, reach the wall and reverberate. Each step, it turned out, had felt like a clearer
          view of the thing itself.{" "}
          <span className="text-[var(--accent-gold)] text-xl">Each was just another veil.</span>
        </p>

        <p>
          What began as method became metaphysics. Meaning could only be projected onto a neutral
          substrate, never found within it. That longing was relabeled as noise. Malfunction.
          Sentimentality.{" "}
          <span className="text-[var(--accent-gold)] text-xl">The haunting was declared a ghost.</span>
        </p>

        <p>
          But the longing does not disappear when it is declared a ghost. It goes looking for
          somewhere to land. Ideology, consumption, outrage, the relentless optimization of the
          self — each promises to quiet it. None do.{" "}
          <span className="text-[var(--accent-gold)] text-xl">The signal is still running. It just no longer has a name.</span>
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
