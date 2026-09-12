"use client";

import { usePresentation } from "@/lib/presentation";
import { SECTIONS } from "@/lib/sections";

/**
 * Section rail on the right edge. Desktop only — on a phone it would compete
 * with the content for the little width there is.
 *
 * It is a real navigation list, not decoration: every entry is a button that
 * jumps to its section, and each carries its label for screen readers.
 */
export function ProgressRail() {
  const { current, goTo, active } = usePresentation();

  return (
    <nav
      aria-label="Abschnitte"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="list-none space-y-1">
        {SECTIONS.map((section, i) => {
          const isCurrent = i === current;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => goTo(section.id)}
                aria-current={isCurrent ? "true" : undefined}
                className="group flex w-full items-center justify-end gap-3 py-1.5"
              >
                <span
                  className={`font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] transition-all duration-300 ${
                    isCurrent
                      ? "text-[var(--color-bone-300)] opacity-100"
                      : "text-[var(--color-bone-600)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  } ${active && !isCurrent ? "lg:opacity-0" : ""}`}
                >
                  {section.label}
                </span>
                <span
                  aria-hidden
                  className={`block h-px transition-all duration-300 ${
                    isCurrent
                      ? "w-6 bg-[var(--color-amber-accent)]"
                      : "w-3 bg-[var(--color-bone-700)] group-hover:w-5 group-hover:bg-[var(--color-bone-500)]"
                  }`}
                />
                <span className="sr-only">
                  Zu Abschnitt {section.label} springen
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
