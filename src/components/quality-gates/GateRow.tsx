"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useMotionPreference } from "@/lib/use-motion-preference";
import { Activity, Check, Cpu, Server } from "lucide-react";
import type { Gate } from "@/lib/content";
import { DURATION, EASE } from "@/lib/motion";

/* A server for "deploy" and a pulse for "observe" — deliberately not a rocket
   and not a satellite dish. The chain ends on a machine that is running, not
   on a launch. */
const ICONS = {
  generate: Cpu,
  gate: Check,
  ship: Server,
  observe: Activity,
} as const;

/**
 * One gate in the chain.
 *
 * It marks itself as passed when it reaches the middle of the viewport, which
 * is what turns the section into a pipeline running rather than a list being
 * read. The four `kind`s exist so that "generate" and "observe" do not look
 * like checks — they are not gates, they are the ends of the chain.
 */
export function GateRow({ gate, index }: { gate: Gate; index: number }) {
  const { reduced } = useMotionPreference();
  const [passed, setPassed] = useState(false);
  const Icon = ICONS[gate.kind];

  const isCheck = gate.kind === "gate";
  const lit = reduced || passed;

  return (
    <motion.li
      className="relative flex list-none gap-5 pb-10 sm:gap-7"
      onViewportEnter={() => setPassed(true)}
      viewport={{ once: true, amount: 0.8, margin: "0px 0px -35% 0px" }}
    >
      {/* Node */}
      <div className="relative z-10 flex size-9 shrink-0 items-center justify-center">
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border"
          initial={false}
          animate={{
            borderColor: lit
              ? "color-mix(in oklab, #d9a441 50%, transparent)"
              : "rgba(244,241,234,0.08)",
            backgroundColor: lit ? "rgba(217,164,65,0.08)" : "#0b0b0d",
          }}
          transition={{ duration: DURATION.base, ease: EASE }}
        />
        <motion.span
          initial={false}
          animate={{
            color: lit ? "#d9a441" : "#4a4741",
            scale: lit ? 1 : 0.85,
          }}
          transition={{ duration: DURATION.fast, ease: EASE }}
          className="relative"
        >
          <Icon aria-hidden className="size-4" strokeWidth={2} />
        </motion.span>
      </div>

      {/* Body */}
      <div className="min-w-0 flex-1 pt-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-base font-medium tracking-[-0.005em] text-[var(--color-bone-50)]">
            {gate.label}
          </h3>
          {isCheck && (
            <motion.span
              initial={false}
              animate={{ opacity: lit ? 1 : 0 }}
              transition={{ duration: DURATION.fast, ease: EASE }}
              className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-[var(--color-amber-deep)]"
            >
              muss grün sein
            </motion.span>
          )}
        </div>
        <p className="mt-2 max-w-xl text-base leading-relaxed text-[var(--color-bone-300)]">
          {gate.body}
        </p>
      </div>

      {/* Step number, right-aligned — gives the chain a spine on wide screens. */}
      <span
        aria-hidden
        className="hidden shrink-0 pt-2 font-[family-name:var(--font-mono)] text-[0.75rem] tracking-[0.16em] text-[var(--color-bone-700)] sm:block"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.li>
  );
}
