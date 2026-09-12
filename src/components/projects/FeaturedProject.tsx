import { FEATURED_PROJECT } from "@/lib/content";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The featured repository — the one closest to the role, so it gets the space.
 *
 * The numbers were counted in the repository during development and live in
 * content.ts. Nothing here is fetched at runtime: the GitHub API being slow or
 * rate-limited must never affect a live presentation.
 */
export function FeaturedProject() {
  const p = FEATURED_PROJECT;

  return (
    <Reveal className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--color-ink-850)]/70">
      {/* One soft ambient wash, only on this card — it marks it as the primary
          object on the page without adding a second visual language. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 size-[28rem] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, #d9a441 12%, transparent), transparent 65%)",
        }}
      />

      <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14 lg:p-14">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[var(--color-amber-accent)]/35 px-3 py-1 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-[var(--color-amber-soft)]">
              Live
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[0.75rem] uppercase tracking-[0.14em] text-[var(--color-bone-600)]">
              {p.language}
            </span>
          </div>

          <h3 className="display-md mt-6 font-[family-name:var(--font-mono)] text-[var(--color-bone-50)]">
            {p.name}
          </h3>

          <p className="mt-4 max-w-xl text-lg leading-snug text-balance text-[var(--color-bone-100)]">
            {p.tagline}
          </p>

          <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-pretty text-[var(--color-bone-300)]">
            {p.body}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <ExternalLink href={p.repo} variant="chip">
              Repository
            </ExternalLink>
            {p.live && (
              <ExternalLink href={p.live} variant="chip">
                {p.liveLabel}
              </ExternalLink>
            )}
          </div>
        </div>

        <div className="lg:border-l lg:border-[var(--line)] lg:pl-14">
          <p className="kicker">Im Repository gezählt</p>

          <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-2">
            {p.facts.map((fact) => (
              <div key={fact.label}>
                <dd className="font-[family-name:var(--font-mono)] text-2xl font-light tracking-[-0.02em] text-[var(--color-bone-50)]">
                  {fact.value}
                </dd>
                <dt className="mt-1 font-[family-name:var(--font-mono)] text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-bone-600)]">
                  {fact.label}
                </dt>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-[0.875rem] leading-relaxed text-[var(--color-bone-500)]">
            {p.highlight}
          </p>

          <ul className="mt-8 flex list-none flex-wrap gap-1.5">
            {p.stack.map((tech) => (
              <li
                key={tech}
                className="rounded border border-[var(--line-soft)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.75rem] text-[var(--color-bone-500)]"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
