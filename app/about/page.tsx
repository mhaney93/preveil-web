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
          for a place you have never been, the sense that meaning is almost within reach and then
          gone — is not a malfunction of the psyche. C.S. Lewis called it <em>Sehnsucht</em>:
          desire not quite like any other desire, because nothing in the physical world can
          satisfy it. His argument: if nothing here answers the ache, perhaps the ache is not
          a response to the physical world at all. It is a response to something pressing
          through it. The haunting is the signal. Something is on the other side of the veil.
        </p>

        <p>
          Over several centuries, Western thought drew the veil — so gradually that by the time
          it was complete, most people could no longer see it as a philosophical position.
          They took it for common sense. What began as method became metaphysics. The Scientific
          Revolution discovered that breaking the world into its parts yielded extraordinary
          power: matter mastered, distances collapsed, lifespans extended. Somewhere the
          description was mistaken for the explanation. Newton himself admitted he could describe
          gravity but not explain what it was. The tradition that bore his name forgot this
          admission. The brain was explained as hydraulic pump, then telegraph, then clockwork,
          then computer — each era borrowing the most impressive technology of its moment and
          declaring it the model of mind, none of them closing the gap between matter and
          experience. What the models share is the assumption: one substance, matter, and
          everything else is downstream of it. A world that had been storied, symbolic, and
          alive — capable of meeting you — gave way to a world of neutral substrate where
          meaning could only be projected onto things, never found within them.
        </p>

        <p>
          What was lost is not belief. We have more information than any civilization in history,
          and the meaning crisis has never been worse. What was lost is a <em>mode of knowing</em>.
          Vervaeke identifies four: propositional (knowing <em>that</em>), procedural (knowing
          <em>how</em>), perspectival (knowing <em>what it is like</em>), participatory (knowing
          <em>by being in relationship with</em>). The dominant paradigm operates entirely at
          the propositional level — a stack of &ldquo;knowing that.&rdquo; No accumulation of
          propositions generates &ldquo;knowing what it is like&rdquo; or &ldquo;knowing by
          participating&rdquo; — not because we haven&apos;t tried hard enough, but because
          it is the wrong category of knowing for the territory it claims to explain. Hume&apos;s
          guillotine makes the same cut differently: from a stack of is-claims you cannot derive
          a single ought. The map, however detailed, cannot tell you where you should go.
          The modern project didn&apos;t just change beliefs. It delegitimized three of the
          four ways a human being can know anything.
        </p>

        <p>
          Every generation inherits a weave — the accumulated embodied discoveries of everyone
          who came before, carried forward through three channels simultaneously. Genetic:
          behaviors that worked become structurally assimilated over evolutionary time, the
          lesson becoming the body itself (the Baldwin Effect). Epigenetic: experiential patterns
          leave heritable marks on gene expression across generations without changing the DNA.
          Memetic: cultural and symbolic transmission of the patterns that mapped onto something
          real — which is why the hero&apos;s journey has survived ten thousand years across
          every culture that ever existed. Jung&apos;s collective unconscious is the psychological
          name for what all three channels have built together: the entire inheritance of every
          free lunch every ancestor ever found, encoded as archetypes into the human psyche
          before any individual has a single conscious thought. When the modern project
          delegitimized the symbolic and the sacred, it didn&apos;t merely update a set of
          beliefs. All three channels were disrupted simultaneously. The wound is in the
          weave at every level — which is why no amount of information can close it.
          Re-enchantment is not a belief update. It is a reweaving.
        </p>

        <p>
          The re-enchantment argument is not idiosyncratic. It is where several independent
          traditions arrive when pushed to their foundations. Quantum field theory holds that
          what we call &ldquo;particles&rdquo; are not discrete objects but excitations in an
          underlying continuous field — apparent discreteness is a property of how the field
          has organized itself at a particular locus. Advaita Vedanta said the same thing
          thirteen centuries before the Standard Model: one substrate (Brahman), apparent
          individuals as excitations within it, the veil of appearance (Maya) making the one
          look like many. Kastrup argues from inside analytic philosophy that consciousness
          is the one underlying reality and matter is the dashboard — the interface through
          which universal mind becomes localized. Wigner noticed in 1960 that mathematics
          developed for purely abstract reasons describes physical reality with uncanny
          precision and called it a miracle. It is not a miracle if the physical world is
          an interface localizing a mathematical reality that was always there. Physics,
          ancient philosophy, and consciousness science are not analogies of each other.
          They are independent frameworks arriving at the same structural claim: pattern
          and meaning are not projected onto a neutral substrate. They are features of the real.
        </p>

        <p>
          Preveil is not a return. The veil cannot be undrawn — nor should it be. What we
          are after is not the world before the veil but what was dropped on the way through
          it, carried forward into a synthesis that doesn&apos;t ask you to choose between
          scientific literacy and genuine meaning. The veil in our name is translucent,
          deliberately. Opaque would be fundamentalism: the wall, the secular world entirely
          blocked out. Transparent would be the claim that science has seen through to the
          real and the haunting is a mistake. Translucent is the honest position. Something
          comes through. The light is real. The full picture is partially obscured —
          enough to know something is being missed, not so little that you abandon reason to find it.
        </p>

        <p>
          The argument is rigorous before it becomes participatory. You lean back on your
          stabilizing foot before you leap. Cognitive science, evolutionary biology, philosophy
          of mind, quantum physics, and the oldest philosophical traditions on the planet
          are independently arriving at the same structural claim — and no accumulation of
          propositions gets you all the way there. At some point the map runs out and the
          territory requires something else: embodied, enacted, lived. Kierkegaard described
          the crossing: one side, the gap, the other side — and the crossing is not a series
          of smaller steps. What comes back from that crossing is richer than what you brought
          in. Not because you abandoned reason, but because reason got you to the edge.
        </p>

        <p>
          The name carries two things at once: <em>prevail</em> — to endure, to overcome — and{" "}
          <em>pre-veil</em> — before the shift that convinced a civilization its perceptions were
          the ceiling of the real. The logo carries the same structure: the translucent gold
          veil draped over the letters is not hiding the name. It is revealing it through a
          medium. Not a barrier. A transmission.
        </p>

        <p>
          We make goods for the person who senses something haunting this world and wants to
          live in that awareness rather than argue it away. For the meaning-hungry and the
          scientifically literate. For those who feel the threads thinning and want to
          pull them taut again. For those willing to find their footing and leap.
        </p>

        <p>
          The deeper reading of an old phrase is this: you are not an observer separate from
          what haunts the world. If the individual mind is a localized aperture of something
          larger — as physics, ancient philosophy, and cognitive science are each beginning to
          suggest — then the spy and the spymaster are the same thing seen from different angles.
          The field knowing itself through a particular locus. The veil is translucent because
          you are partly what is on both sides.
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
