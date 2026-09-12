import { PROJECTS, PROJECTS_NOTE, PROFILE } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { ProjectCard } from "@/components/projects/ProjectCard";

/**
 * Section 5 — the evidence.
 *
 * One featured repository, three underneath. The message is not the numbers;
 * it is that all four are one running system with real users.
 */
export function ProjectsSection() {
  return (
    <Section
      id="projects"
      kicker="Echte Systeme, keine Demos"
      heading={
        <>
          Das sind keine Tutorials.{" "}
          <span className="text-[var(--color-bone-500)]">
            Die Sachen werden benutzt.
          </span>
        </>
      }
      lede={PROJECTS_NOTE}
    >
      <div className="mt-16">
        <FeaturedProject />
      </div>

      <ul className="mt-4 grid list-none gap-4 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </ul>

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[var(--line)] pt-8">
          <p className="text-base text-[var(--color-bone-500)]">
            Alle vier Repositories sind öffentlich einsehbar.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <ExternalLink href={PROFILE.github} className="text-sm">
              {PROFILE.githubLabel}
            </ExternalLink>
            <ExternalLink href={PROFILE.site} className="text-sm">
              {PROFILE.siteLabel}
            </ExternalLink>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
