import { PROFILE } from "@/lib/content";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/ui/Reveal";
import { PipelineLoop } from "@/components/hero/PipelineLoop";
import { ScrollHint } from "@/components/hero/ScrollHint";

/**
 * First screen. It has one job: make clear within two seconds that this is a
 * presentation about a way of working, not a portfolio landing page.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative z-10 flex min-h-[100svh] flex-col justify-between pt-28 pb-10 sm:pt-32"
    >
      <div className="mx-auto flex w-full max-w-[76rem] flex-1 flex-col justify-center px-6 sm:px-10 lg:px-14">
        <Reveal y={10}>
          <p className="kicker flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block h-px w-6 bg-[var(--color-amber-accent)] opacity-70"
            />
            {PROFILE.name} / {PROFILE.handle}
          </p>
        </Reveal>

        <h1
          id="hero-heading"
          className="display-xl mt-8 max-w-4xl text-balance text-[var(--color-bone-50)]"
        >
          <Reveal as="span" className="block" delay={0.05}>
            Von der Idee
            <span className="accent mx-3 inline-block font-[family-name:var(--font-serif)] not-italic">
              →
            </span>
            in Produktion.
          </Reveal>
          <Reveal as="span" className="mt-1 block text-[var(--color-bone-500)]" delay={0.14}>
            KI-gestützt.
          </Reveal>
        </h1>

        <Reveal delay={0.24}>
          <p className="lede mt-9 max-w-xl text-pretty">
            Ich nutze Claude Code, um Anforderungen in lauffähige Produkte zu
            übersetzen — und teste, deploye und iteriere sie in Produktion.
          </p>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ExternalLink href={PROFILE.github} variant="chip">
              {PROFILE.githubLabel}
            </ExternalLink>
            <ExternalLink href={PROFILE.site} variant="chip">
              {PROFILE.siteLabel}
            </ExternalLink>
          </div>
        </Reveal>

        <Reveal delay={0.42} className="mt-20 max-w-3xl sm:mt-24">
          <PipelineLoop />
        </Reveal>
      </div>

      <div className="mx-auto w-full max-w-[76rem] px-6 sm:px-10 lg:px-14">
        <ScrollHint />
      </div>
    </section>
  );
}
