import type { Project } from "@/lib/content";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The three supporting repositories. Compact on purpose — the featured card
 * carries the detail, these carry the range: Python, Java, Node, all of them
 * part of the same running system.
 */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Reveal
      as="li"
      delay={index * 0.07}
      className="group flex list-none flex-col rounded-xl border border-[var(--line)] bg-[var(--color-ink-850)]/50 p-7 transition-colors duration-300 hover:border-[color-mix(in_oklab,var(--color-amber-accent)_28%,transparent)]"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="font-[family-name:var(--font-mono)] text-base text-[var(--color-bone-50)]">
          {project.name}
        </h4>
        <span className="shrink-0 font-[family-name:var(--font-mono)] text-[0.75rem] uppercase tracking-[0.14em] text-[var(--color-bone-600)]">
          {project.language}
        </span>
      </div>

      <p className="mt-3 text-base leading-snug text-[var(--color-bone-100)]">
        {project.tagline}
      </p>

      <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-bone-300)]">
        {project.body}
      </p>

      <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        {project.facts.map((fact) => (
          <div key={fact.label} className="flex items-baseline gap-1.5">
            <dt className="sr-only">{fact.label}</dt>
            <dd className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-bone-50)]">
              {fact.value}
            </dd>
            <span
              aria-hidden
              className="font-[family-name:var(--font-mono)] text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-bone-600)]"
            >
              {fact.label}
            </span>
          </div>
        ))}
      </dl>

      <p className="mt-6 border-l border-[var(--color-amber-accent)]/35 pl-4 text-[0.875rem] leading-relaxed text-[var(--color-bone-500)]">
        {project.highlight}
      </p>

      <div className="mt-auto pt-6">
        <ExternalLink href={project.repo} className="text-sm">
          Repository
        </ExternalLink>
      </div>
    </Reveal>
  );
}
