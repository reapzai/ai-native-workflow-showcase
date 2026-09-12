"use client";

import { motion } from "motion/react";
import { HERO_PIPELINE } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { useMotionPreference } from "@/lib/use-motion-preference";

/** One full pass of the travelling light, in seconds. */
const CYCLE = 6.4;
const STEPS = HERO_PIPELINE.length;

/**
 * The hero's one moving part: a light travelling Idee → Claude → Build →
 * Verify → Ship, lighting each node as it passes.
 *
 * It says "this is a workflow, not a CV" before a single word is read — and
 * it loops slowly enough to sit under a spoken sentence without competing
 * with it. With reduced motion the light is gone and every node is simply lit.
 */
export function PipelineLoop() {
  const { reduced } = useMotionPreference();

  return (
    <div
      className="relative w-full"
      role="img"
      aria-label={`Ablauf: ${HERO_PIPELINE.map((s) => s.label).join(" zu ")}`}
    >
      {/*
       * The rail stops at the last node rather than running to the container
       * edge. With an equal-column grid each node sits at i/STEPS of the
       * width, so the last one is at (STEPS-1)/STEPS — 80% for five steps.
       * Hard-coding the geometry here keeps rail, light and nodes in
       * agreement at any viewport width.
       */}
      <div
        aria-hidden
        className="absolute left-0 right-[20%] top-[0.5625rem] h-px bg-[var(--line)]"
      />

      {/* The travelling light. A single element moving along the rail — no
          per-node timers, so it cannot drift out of sync on a slow frame.
          It stays in the markup under reduced motion and simply never
          becomes visible, so the server and the client agree on the tree. */}
      <motion.div
        aria-hidden
        className="absolute top-[0.5625rem] h-px w-24 -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-amber-accent), transparent)",
        }}
        initial={{ left: "-6rem", opacity: 0 }}
        animate={
          reduced
            ? { left: "-6rem", opacity: 0 }
            : { left: ["-6rem", "80%"], opacity: [0, 1, 1, 0] }
        }
        transition={
          reduced
            ? { duration: 0 }
            : {
                duration: CYCLE,
                ease: "linear",
                repeat: Infinity,
                times: [0, 0.08, 0.92, 1],
              }
        }
      />

      <ol className="relative grid list-none grid-cols-5 gap-2">
        {HERO_PIPELINE.map((step, i) => {
          /*
           * Each node lights as the light reaches it, then fades back.
           *
           * The light starts one gradient-width off-screen, so it is already
           * ~13% into the cycle by the time it reaches the first node.
           *
           * The span stops at 0.82 rather than 1.0 so that even the last
           * node's pulse has room to fade out before the cycle restarts —
           * otherwise it would be cut off mid-glow and read as stuck on.
           */
          const at = 0.135 + (i / (STEPS - 1)) * 0.82;
          const start = Math.max(0, at - 0.06);
          const peak = Math.min(1, at + 0.02);
          const end = Math.min(1, at + 0.16);

          return (
            <li key={step.label} className="flex min-w-0 flex-col items-start">
              <motion.span
                aria-hidden
                className="block size-[0.5625rem] rounded-full border"
                style={{
                  borderColor: "var(--color-ink-600)",
                  backgroundColor: "var(--color-ink-900)",
                }}
                animate={
                  reduced
                    ? {
                        borderColor: "var(--color-amber-accent)",
                        backgroundColor: "var(--color-amber-accent)",
                      }
                    : {
                        borderColor: [
                          "#26262a",
                          "#26262a",
                          "#d9a441",
                          "#26262a",
                        ],
                        backgroundColor: [
                          "#0b0b0d",
                          "#0b0b0d",
                          "#d9a441",
                          "#0b0b0d",
                        ],
                        boxShadow: [
                          "0 0 0 0 rgba(217,164,65,0)",
                          "0 0 0 0 rgba(217,164,65,0)",
                          "0 0 14px 2px rgba(217,164,65,0.35)",
                          "0 0 0 0 rgba(217,164,65,0)",
                        ],
                      }
                }
                transition={
                  reduced
                    ? { duration: 0 }
                    : {
                        duration: CYCLE,
                        ease: EASE,
                        repeat: Infinity,
                        times: [0, start, peak, end],
                      }
                }
              />
              <span className="mt-4 truncate font-[family-name:var(--font-mono)] text-[0.75rem] uppercase tracking-[0.14em] text-[var(--color-bone-300)]">
                {step.label}
              </span>
              <span className="mt-1 hidden text-xs leading-snug text-[var(--color-bone-600)] sm:block">
                {step.hint}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
