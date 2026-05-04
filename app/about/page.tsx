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
          Not loosely — precisely. The longing you feel before something genuinely beautiful,
          the inconsolable homesickness for a place you have never been, the sense that meaning
          is almost within reach and then gone: these are not malfunctions of the psyche.
          They are perceptions. Accurate responses to something real pressing through the fabric
          of the ordinary. The haunting is the signal. Something is on the other side of the veil.
        </p>

        <p>
          Over several centuries, Western thought drew the veil — so gradually that by the time
          it was complete, most people could no longer see it at all. What began as a method became
          a metaphysics. The scientific tradition discovered that breaking the world into its parts
          yielded extraordinary power: matter mastered, distances collapsed, lifespans extended.
          But somewhere the description was mistaken for the explanation. The map became the
          territory. Newton himself admitted he could describe gravity but not explain what it was.
          The tradition that bore his name forgot this. A world that had been storied, symbolic,
          and alive — capable of meeting you — gave way to a world of neutral substrate where
          meaning could only be projected onto things, never found within them.
        </p>

        <p>
          What was lost in this shift is not so easily recovered, because it was never only
          propositional. Every generation inherits a weave: the accumulated embodied discoveries
          of everyone who came before, carried forward through evolution, epigenetics, myth,
          ritual, story, and practice. You don&apos;t inherit this knowledge the way you inherit
          a fact. You inherit it the way you inherit bone structure — it is in the body before
          you have words for it. When the modern project delegitimized the symbolic and the
          sacred, it didn&apos;t merely change beliefs. It cut threads. The meaning crisis is
          not an information problem — we have more information than any civilization in history.
          It is a weaving problem. And threads cut at the cultural level leave wounds at the
          biological level that no amount of information can close.
        </p>

        <p>
          Preveil is not a return. The veil cannot be undrawn — nor should it be. What we are
          after is not the world before the veil but what was dropped on the way through it,
          carried forward into a synthesis that doesn&apos;t ask you to choose between scientific
          literacy and genuine meaning. The veil in our name is translucent, deliberately.
          Opaque would be fundamentalism: the wall, the secular world blocked out. Transparent
          would be the claim that there is nothing there — that science has seen through to the
          real and the haunting is a mistake. Translucent is the honest position. Something comes
          through. The light is real. The full picture is partially obscured — enough to know
          something is being missed, not so little that you abandon reason to find it.
        </p>

        <p>
          The argument is rigorous before it becomes participatory. Cognitive science,
          evolutionary biology, philosophy of mind, quantum physics, and the oldest philosophical
          traditions on the planet are independently arriving at the same structural claim:
          pattern and meaning are not projected onto a neutral substrate. They are features of
          the real — discoverable, not invented, woven into the fabric of things. No accumulation
          of propositions gets you all the way there. At some point the map runs out and the
          territory requires something else: embodied, enacted, lived. You lean back on your
          stabilizing foot before you leap. What comes back from that crossing is richer than
          what you brought in.
        </p>

        <p>
          The name carries two things at once: <em>prevail</em> — to endure, to overcome — and{" "}
          <em>pre-veil</em> — before the shift that convinced a civilization its perceptions were
          the ceiling of the real. The logo carries the same: the translucent gold veil draped
          over the letters is not hiding the name. It is revealing it through a medium.
          Not a barrier. A transmission.
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
