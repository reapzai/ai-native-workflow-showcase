import { OUTRO, PROFILE } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { ExternalLink } from "@/components/ui/ExternalLink";

/**
 * The last screen. Three lines, the links, one note about the occasion.
 * No call-to-action button — the call to action is the conversation that is
 * already happening while this is on screen.
 */
export function Outro() {
  return (
    <section
      id="outro"
      aria-labelledby="outro-heading"
      className="relative z-10 flex min-h-[92svh] flex-col justify-between py-28 sm:py-32"
    >
      <div className="mx-auto flex w-full max-w-[76rem] flex-1 flex-col justify-center px-6 sm:px-10 lg:px-14">
        <h2 id="outro-heading" className="display-xl text-[var(--color-bone-50)]">
          {OUTRO.lines.map((line, i) => (
            <Reveal as="span" key={line} className="block" delay={i * 0.09}>
              <span className={i === 1 ? "accent" : undefined}>{line}</span>
            </Reveal>
          ))}
        </h2>

        <Reveal delay={0.34}>
          <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-[var(--line)] pt-8">
            <p className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-bone-300)]">
              {PROFILE.name} / {PROFILE.handle}
            </p>
            <ExternalLink href={PROFILE.github} className="text-sm">
              {PROFILE.githubLabel}
            </ExternalLink>
            <ExternalLink href={PROFILE.site} className="text-sm">
              {PROFILE.siteLabel}
            </ExternalLink>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto w-full max-w-[76rem] px-6 sm:px-10 lg:px-14">
        <Reveal delay={0.1}>
          <p className="kicker">{OUTRO.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
