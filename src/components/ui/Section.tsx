import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

type SectionProps = {
  id: string;
  /** Small mono label above the heading. */
  kicker?: string;
  /** The section heading. Rendered as <h2>; the hero brings its own <h1>. */
  heading?: ReactNode;
  /** One paragraph under the heading, at most. */
  lede?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Set on sections that build their own vertical rhythm (sticky blocks). */
  bare?: boolean;
};

/**
 * Every section shares the same gutter, max width and header rhythm, so the
 * page reads as one document rather than eight stacked designs.
 */
export function Section({
  id,
  kicker,
  heading,
  lede,
  children,
  className = "",
  bare = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={heading ? `${id}-heading` : undefined}
      className={`relative z-10 ${bare ? "" : "py-28 sm:py-36 lg:py-44"} ${className}`}
    >
      <div className="mx-auto w-full max-w-[76rem] px-6 sm:px-10 lg:px-14">
        {(kicker || heading || lede) && (
          <header className="max-w-3xl">
            {kicker && (
              <Reveal y={8}>
                <p className="kicker flex items-center gap-3">
                  <span
                    aria-hidden
                    className="inline-block h-px w-6 bg-[var(--color-amber-accent)] opacity-70"
                  />
                  {kicker}
                </p>
              </Reveal>
            )}
            {heading && (
              <Reveal delay={0.06}>
                <h2
                  id={`${id}-heading`}
                  className="display-lg mt-5 text-balance text-[var(--color-bone-50)]"
                >
                  {heading}
                </h2>
              </Reveal>
            )}
            {lede && (
              <Reveal delay={0.12}>
                <p className="lede mt-6 max-w-2xl text-pretty">{lede}</p>
              </Reveal>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
