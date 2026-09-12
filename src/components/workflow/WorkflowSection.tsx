"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useMotionPreference } from "@/lib/use-motion-preference";
import { WORKFLOW_STEPS, WORKFLOW_STATEMENT } from "@/lib/content";
import { DURATION, EASE } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";
import { Statement } from "@/components/ui/Statement";
import {
  WorkflowModule,
  type ModuleState,
} from "@/components/workflow/WorkflowModule";
import { WorkflowStatic } from "@/components/workflow/WorkflowStatic";

const STEPS = WORKFLOW_STEPS.length;

/**
 * Section 3 — the main scroll-driven sequence.
 *
 * The section is tall; a sticky viewport inside it stays put while the page
 * scrolls past. The scroll progress selects the active step. This is NOT
 * scroll hijacking: the wheel, trackpad, scrollbar and keyboard all behave
 * natively, the page simply happens to look different at different offsets.
 *
 * Height is 100vh of sticky plus one screen of travel per step. Six steps at
 * one screen each is roughly 35 seconds of talking — the budget this section
 * gets in a four-minute walkthrough.
 */
export function WorkflowSection() {
  const { reduced, mounted } = useMotionPreference();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  /*
   * Progressive enhancement, in this direction on purpose: the readable list
   * is what the server sends and what the first client render produces, and
   * the sticky sequence is layered on afterwards. So a reduced-motion visitor
   * never sees the sticky version even for a frame, the content is readable
   * without JavaScript, and server and client cannot disagree at hydration.
   */
  const enhanced = mounted && !reduced;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    // Bias slightly forward so a step is chosen once you are into it, not as
    // its first pixel appears. Clamped, because progress can overshoot at the
    // ends during momentum scrolling.
    const raw = Math.floor(p * STEPS + 0.12);
    const next = Math.min(STEPS - 1, Math.max(0, raw));
    setActive((prev) => (prev === next ? prev : next));
  });

  // Restrained parallax: the panel drifts ~24px across the whole section.
  const panelY = useTransform(scrollYProgress, [0, 1], [12, -12]);

  const step = WORKFLOW_STEPS[active];

  if (!enhanced) {
    return (
      // The ref stays attached in both branches: useScroll is a hook and
      // cannot be called conditionally, and it warns when its target never
      // hydrates.
      <section
        id="workflow"
        ref={sectionRef}
        aria-labelledby="workflow-heading"
        className="relative z-10 py-28 sm:py-36 lg:py-44"
      >
        <div className="mx-auto w-full max-w-[76rem] px-6 sm:px-10 lg:px-14">
          <Header />
          <WorkflowStatic />
          <Statement
            className="mt-20"
            lead={WORKFLOW_STATEMENT.lead}
            emphasis={WORKFLOW_STATEMENT.emphasis}
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id="workflow"
      ref={sectionRef}
      aria-labelledby="workflow-heading"
      className="relative z-10"
      style={{ height: `${(STEPS + 1) * 100}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden py-16">
        <div className="mx-auto w-full max-w-[76rem] px-6 sm:px-10 lg:px-14">
          <Header compact />

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1fr_minmax(0,27rem)] lg:gap-14">
            {/* Left: the step being described. Crossfades, never slides far —
                a big horizontal move under a spoken sentence is distracting.
                The reserved height is what the tallest step needs, so the
                layout does not jump as the text swaps. */}
            <div className="min-h-[21rem] sm:min-h-[19rem]">
              <div className="flex items-baseline gap-5">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={step.n}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: DURATION.base, ease: EASE }}
                    className="font-[family-name:var(--font-mono)] text-5xl font-light leading-none tracking-[-0.02em] text-[var(--color-amber-accent)] sm:text-6xl"
                  >
                    {step.n}
                  </motion.span>
                </AnimatePresence>

                <span
                  aria-hidden
                  className="h-px flex-1 bg-[var(--line)]"
                />

                <span className="font-[family-name:var(--font-mono)] text-[0.75rem] tracking-[0.16em] text-[var(--color-bone-600)]">
                  {String(active + 1).padStart(2, "0")} / {String(STEPS).padStart(2, "0")}
                </span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: DURATION.base, ease: EASE }}
                >
                  <h3 className="mt-7 font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.18em] text-[var(--color-bone-500)]">
                    {step.title}
                  </h3>
                  {/* The claim is the line that has to be readable from the
                      other end of a video call, so it carries the size here —
                      not the step name, which the pipeline already shows. */}
                  <p className="display-md mt-4 max-w-2xl text-balance text-[var(--color-bone-50)]">
                    {step.claim}
                  </p>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-[var(--color-bone-300)]">
                    {step.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: the system assembling itself. */}
            <motion.div style={{ y: panelY }} className="hidden lg:block">
              <p className="kicker mb-5">Pipeline</p>
              <ul className="list-none">
                {WORKFLOW_STEPS.map((s, i) => {
                  const state: ModuleState =
                    i === active ? "active" : i < active ? "done" : "pending";
                  return (
                    <WorkflowModule
                      key={s.n}
                      step={s}
                      state={state}
                      index={i}
                    />
                  );
                })}
              </ul>
            </motion.div>

            {/* Mobile: the same progress, reduced to a row of ticks. */}
            <ol
              aria-hidden
              className="flex list-none gap-1.5 lg:hidden"
            >
              {WORKFLOW_STEPS.map((s, i) => (
                <li key={s.n} className="h-0.5 flex-1 overflow-hidden rounded-full bg-[var(--color-ink-700)]">
                  <motion.span
                    className="block h-full bg-[var(--color-amber-accent)]"
                    initial={false}
                    animate={{ scaleX: i <= active ? 1 : 0 }}
                    style={{ transformOrigin: "left" }}
                    transition={{ duration: DURATION.fast, ease: EASE }}
                  />
                </li>
              ))}
            </ol>
          </div>

          {/* The statement fades in with the last step, as the closing line
              of the section rather than a separate slide. */}
          <motion.div
            className="mt-10 lg:mt-14"
            initial={false}
            animate={{ opacity: active === STEPS - 1 ? 1 : 0 }}
            transition={{ duration: DURATION.slow, ease: EASE }}
          >
            <p className="display-md text-balance">
              <span className="text-[var(--color-bone-500)]">
                {WORKFLOW_STATEMENT.lead}
              </span>{" "}
              <span className="font-[family-name:var(--font-serif)] italic text-[var(--color-bone-50)]">
                {WORKFLOW_STATEMENT.emphasis}
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Header({ compact = false }: { compact?: boolean }) {
  const Wrapper = compact ? "div" : Reveal;
  return (
    <Wrapper>
      <p className="kicker flex items-center gap-3">
        <span
          aria-hidden
          className="inline-block h-px w-6 bg-[var(--color-amber-accent)] opacity-70"
        />
        Wie ich arbeite
      </p>
      <h2
        id="workflow-heading"
        className={`${compact ? "display-md" : "display-lg"} mt-4 max-w-3xl text-balance text-[var(--color-bone-50)]`}
      >
        Sechs Schritte, die ich bei allem gehe,{" "}
        <span className="text-[var(--color-bone-500)]">
          was nicht trivial ist.
        </span>
      </h2>
    </Wrapper>
  );
}
