import { PresentationProvider } from "@/lib/presentation";
import { TopBar } from "@/components/chrome/TopBar";
import { ProgressRail } from "@/components/chrome/ProgressRail";
import { Hero } from "@/components/hero/Hero";
import { FitSection } from "@/components/fit/FitSection";
import { WorkflowSection } from "@/components/workflow/WorkflowSection";
import { PromptAnatomySection } from "@/components/prompt-anatomy/PromptAnatomySection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { QualityGatesSection } from "@/components/quality-gates/QualityGatesSection";
import { LearningSection } from "@/components/learning/LearningSection";
import { Outro } from "@/components/outro/Outro";

/**
 * The whole presentation is one page — a live walkthrough should never depend
 * on a route transition succeeding while somebody is watching.
 *
 * Sections run in the order of the talk track (docs/PRESENTATION.md) and their
 * ids match the registry in lib/sections.ts, which also drives the progress
 * rail and the keyboard navigation.
 */
export default function Page() {
  return (
    <PresentationProvider>
      <a
        href="#fit"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-full focus:border focus:border-[var(--line)] focus:bg-[var(--color-ink-850)] focus:px-4 focus:py-2 focus:text-sm"
      >
        Zum Inhalt springen
      </a>

      <TopBar />
      <ProgressRail />

      <main>
        <Hero />
        <FitSection />
        <WorkflowSection />
        <PromptAnatomySection />
        <ProjectsSection />
        <QualityGatesSection />
        <LearningSection />
        <Outro />
      </main>
    </PresentationProvider>
  );
}
