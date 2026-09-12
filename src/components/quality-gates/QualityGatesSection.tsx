"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useMotionPreference } from "@/lib/use-motion-preference";
import { GATES, GATES_STATEMENT } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GateRow } from "@/components/quality-gates/GateRow";
import { CiExcerpt } from "@/components/quality-gates/CiExcerpt";

/**
 * Section 6 — what happens after the code is generated.
 *
 * A single line is drawn down through the chain as the section scrolls, and
 * each gate lights as the line reaches it. The line is one transform on one
 * element; the gates carry no scroll maths of their own.
 */
export function QualityGatesSection() {
  const { reduced } = useMotionPreference();
  const listRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    // Starts drawing when the list is three-quarters up the viewport and is
    // complete shortly before it leaves — so it tracks the reading position
    // rather than the raw element bounds.
    offset: ["start 0.72", "end 0.62"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section
      id="quality"
      kicker="Nach der Generierung"
      heading={
        <>
          Generiert heißt nicht fertig.{" "}
          <span className="text-[var(--color-bone-500)]">
            Fertig heißt: es hat alles bestanden.
          </span>
        </>
      }
      lede={
        <>
          Der schnellste Teil meiner Arbeit ist das Schreiben des Codes. Der
          Teil, der entscheidet, ob etwas rausgeht, kommt danach — und er ist in
          allen vier Repos derselbe.
        </>
      }
    >
      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_minmax(0,24rem)] lg:gap-16">
      <div className="relative">
        {/* The rail. Track and fill, positioned to run through the nodes. */}
        <span
          aria-hidden
          className="absolute bottom-10 left-[1.0625rem] top-4 w-px bg-[var(--line-soft)]"
        />
        {/* One element in both cases: under reduced motion the fill is simply
            drawn complete instead of following the scroll. */}
        <motion.span
          aria-hidden
          className="absolute bottom-10 left-[1.0625rem] top-4 w-px origin-top bg-gradient-to-b from-[var(--color-amber-accent)] via-[var(--color-amber-deep)] to-[var(--color-amber-deep)]"
          style={{ scaleY: reduced ? 1 : scaleY }}
        />

        <ol ref={listRef} className="relative list-none">
          {GATES.map((gate, i) => (
            <GateRow key={gate.id} gate={gate} index={i} />
          ))}
        </ol>
      </div>

        <CiExcerpt />
      </div>

      <Reveal delay={0.05}>
        <p className="display-md mt-8 max-w-3xl text-balance">
          <span className="text-[var(--color-bone-500)]">
            {GATES_STATEMENT.lead}
          </span>{" "}
          <span className="font-[family-name:var(--font-serif)] italic text-[var(--color-bone-50)]">
            {GATES_STATEMENT.sub}
          </span>
        </p>
      </Reveal>
    </Section>
  );
}
