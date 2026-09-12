"use client";

import { motion } from "motion/react";
import { PROMPT_PARTS } from "@/lib/content";
import { DURATION, EASE } from "@/lib/motion";

type Props = {
  /** id of the part currently being explained, or null for "all at rest". */
  activeId: string | null;
};

/**
 * The example prompt, rendered as one block of text with five labelled
 * regions. Whichever region is being explained lights up; the rest stay
 * legible but recede, so the reader can see the shape of the whole thing and
 * the part under discussion at the same time.
 *
 * The content is a real change from btc-website (see content.ts) — no invented
 * feature, no invented file.
 */
export function PromptCard({ activeId }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--color-ink-850)]/70 backdrop-blur-sm">
      {/* Title bar — deliberately not a fake macOS window. */}
      <div className="flex items-center gap-3 border-b border-[var(--line)] px-5 py-3">
        <span
          aria-hidden
          className="size-1.5 rounded-full bg-[var(--color-amber-accent)]"
        />
        <span className="font-[family-name:var(--font-mono)] text-[0.75rem] uppercase tracking-[0.16em] text-[var(--color-bone-500)]">
          Prompt · btc-website
        </span>
      </div>

      <div className="p-5 sm:p-6">
        {PROMPT_PARTS.map((part) => {
          const isActive = activeId === part.id;
          const isDimmed = activeId !== null && !isActive;

          return (
            <motion.div
              key={part.id}
              className="relative -mx-3 rounded-md px-3 py-2.5"
              animate={{
                // Dimmed, not hidden: the inactive parts still have to be
                // readable on a shared screen, or the shape of the whole
                // prompt is lost.
                opacity: isDimmed ? 0.42 : 1,
                backgroundColor: isActive
                  ? "rgba(217,164,65,0.05)"
                  : "rgba(217,164,65,0)",
              }}
              transition={{ duration: DURATION.base, ease: EASE }}
            >
              {/* The accent bar is the only thing that moves. */}
              <motion.span
                aria-hidden
                className="absolute left-0 top-2 bottom-2 w-px origin-top bg-[var(--color-amber-accent)]"
                initial={false}
                animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: DURATION.fast, ease: EASE }}
              />

              <p
                className={`font-[family-name:var(--font-mono)] text-[0.75rem] tracking-[0.16em] transition-colors duration-300 ${
                  isActive
                    ? "text-[var(--color-amber-accent)]"
                    : "text-[var(--color-bone-600)]"
                }`}
              >
                {part.label}
              </p>

              <pre className="mt-1.5 overflow-x-auto font-[family-name:var(--font-mono)] text-[0.78125rem] leading-[1.75] text-[var(--color-bone-300)]">
                <code>{part.lines.join("\n")}</code>
              </pre>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
