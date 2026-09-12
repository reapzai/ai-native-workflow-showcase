"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { WorkflowStep } from "@/lib/content";
import { DURATION, EASE } from "@/lib/motion";

export type ModuleState = "pending" | "active" | "done";

type Props = {
  step: WorkflowStep;
  state: ModuleState;
  index: number;
};

/**
 * One row of the assembling system.
 *
 * The three states carry the whole idea of the section: a step is either not
 * built yet (dashed, dim), being built (lit, its detail revealed), or built
 * and settled (solid, quiet, ticked). Scrolling turns six pending rows into a
 * finished pipeline without anything flying around.
 */
export function WorkflowModule({ step, state, index }: Props) {
  const isActive = state === "active";
  const isDone = state === "done";

  return (
    <motion.li
      layout
      className="relative flex list-none gap-4 sm:gap-5"
      transition={{ duration: DURATION.base, ease: EASE }}
    >
      {/* Spine: node + the segment running down to the next node. */}
      <div className="relative flex w-4 shrink-0 flex-col items-center">
        <motion.span
          aria-hidden
          className="mt-3 block size-2 shrink-0 rounded-full"
          animate={{
            backgroundColor: isActive
              ? "#d9a441"
              : isDone
                ? "#8a6420"
                : "#26262a",
            boxShadow: isActive
              ? "0 0 12px 2px rgba(217,164,65,0.4)"
              : "0 0 0 0 rgba(217,164,65,0)",
            scale: isActive ? 1.25 : 1,
          }}
          transition={{ duration: DURATION.fast, ease: EASE }}
        />
        {index < 5 && (
          <span
            aria-hidden
            className="relative mt-2 w-px flex-1 bg-[var(--line-soft)]"
          >
            <motion.span
              className="absolute inset-x-0 top-0 origin-top bg-[var(--color-amber-deep)]"
              style={{ bottom: 0 }}
              animate={{ scaleY: isDone ? 1 : 0 }}
              transition={{ duration: DURATION.base, ease: EASE }}
            />
          </span>
        )}
      </div>

      {/* The module itself. */}
      <motion.div
        className="mb-3 flex-1 rounded-lg border px-5 py-4"
        animate={{
          borderColor: isActive
            ? "color-mix(in oklab, #d9a441 40%, transparent)"
            : isDone
              ? "rgba(244,241,234,0.09)"
              : "rgba(244,241,234,0.05)",
          backgroundColor: isActive
            ? "rgba(217,164,65,0.045)"
            : "rgba(16,16,18,0.5)",
          opacity: state === "pending" ? 0.45 : 1,
        }}
        transition={{ duration: DURATION.base, ease: EASE }}
      >
        <div className="flex items-center gap-3">
          <span
            className={`font-[family-name:var(--font-mono)] text-[0.75rem] tracking-[0.16em] ${
              isActive
                ? "text-[var(--color-amber-accent)]"
                : "text-[var(--color-bone-600)]"
            }`}
          >
            {step.n}
          </span>
          <span
            className={`text-[0.9375rem] font-medium tracking-[-0.005em] ${
              isActive
                ? "text-[var(--color-bone-50)]"
                : "text-[var(--color-bone-300)]"
            }`}
          >
            {step.title}
          </span>

          {isDone && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: DURATION.fast, ease: EASE }}
              className="ml-auto text-[var(--color-amber-deep)]"
            >
              <Check aria-hidden className="size-3.5" />
              <span className="sr-only">abgeschlossen</span>
            </motion.span>
          )}
        </div>

        {/* The detail line only exists while the step is the current one —
            that is what makes the stack read as "being worked on". */}
        <motion.div
          initial={false}
          animate={{
            height: isActive ? "auto" : 0,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: DURATION.base, ease: EASE }}
          className="overflow-hidden"
        >
          <p className="pt-2 font-[family-name:var(--font-mono)] text-xs leading-relaxed text-[var(--color-bone-500)]">
            {step.detail}
          </p>
        </motion.div>
      </motion.div>
    </motion.li>
  );
}
