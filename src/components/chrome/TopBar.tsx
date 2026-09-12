"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useMotionPreference } from "@/lib/use-motion-preference";
import { Presentation, RotateCcw, X } from "lucide-react";
import { usePresentation } from "@/lib/presentation";
import { SECTIONS } from "@/lib/sections";

/**
 * Fixed chrome: a hairline scroll-progress bar and the presentation controls.
 *
 * Presentation mode does not change how the page scrolls — it only removes
 * the things that are not the presentation and puts the current section in
 * the corner, so a glance is enough to know where you are while talking.
 */
export function TopBar() {
  const { reduced } = useMotionPreference();
  const { active, toggle, reset, current } = usePresentation();
  const { scrollYProgress } = useScroll();

  // Spring only for the progress bar: a raw scroll value on a 1px line looks
  // jittery on a projector, and this is the one place smoothing helps.
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  const section = SECTIONS[current];

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-[var(--color-amber-accent)]"
        style={{ scaleX: reduced ? scrollYProgress : progress }}
      />

      <div className="fixed right-5 top-5 z-50 flex items-center gap-2 sm:right-8 sm:top-7">
        {active && (
          <span className="hidden items-center gap-2.5 rounded-full border border-[var(--line)] bg-[var(--color-ink-900)]/85 px-3.5 py-2 backdrop-blur-sm sm:flex">
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] tracking-[0.16em] text-[var(--color-amber-accent)]">
              {String(current + 1).padStart(2, "0")}
              <span className="text-[var(--color-bone-700)]">
                /{String(SECTIONS.length).padStart(2, "0")}
              </span>
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-[var(--color-bone-500)]">
              {section.label}
            </span>
          </span>
        )}

        <button
          type="button"
          onClick={reset}
          title="Zurück zum Anfang (R)"
          className="flex size-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--color-ink-900)]/85 text-[var(--color-bone-500)] backdrop-blur-sm transition-colors duration-200 hover:border-[var(--color-bone-700)] hover:text-[var(--color-bone-100)]"
        >
          <RotateCcw aria-hidden className="size-3.5" />
          <span className="sr-only">Präsentation zurücksetzen</span>
        </button>

        <button
          type="button"
          onClick={toggle}
          aria-pressed={active}
          title={
            active
              ? "Präsentationsmodus beenden (Esc)"
              : "Präsentationsmodus (P) — Pfeiltasten springen zwischen Abschnitten"
          }
          className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-[0.75rem] uppercase tracking-[0.14em] backdrop-blur-sm transition-colors duration-200 ${
            active
              ? "border-[color-mix(in_oklab,#d9a441_45%,transparent)] bg-[rgba(217,164,65,0.08)] text-[var(--color-amber-soft)]"
              : "border-[var(--line)] bg-[var(--color-ink-900)]/85 text-[var(--color-bone-500)] hover:border-[var(--color-bone-700)] hover:text-[var(--color-bone-100)]"
          }`}
        >
          {active ? (
            <X aria-hidden className="size-3.5" />
          ) : (
            <Presentation aria-hidden className="size-3.5" />
          )}
          <span className="font-[family-name:var(--font-mono)]">
            {active ? "Beenden" : "Präsentation"}
          </span>
        </button>
      </div>

      {/* Keyboard hint. Shown once presentation mode is on, and only where
          there is a keyboard to speak of. */}
      {active && (
        <p className="fixed bottom-5 left-1/2 z-50 hidden -translate-x-1/2 rounded-full border border-[var(--line)] bg-[var(--color-ink-900)]/85 px-4 py-2 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-[var(--color-bone-600)] backdrop-blur-sm lg:block">
          ↑ ↓ Abschnitt · R Anfang · Esc beenden
        </p>
      )}
    </>
  );
}
