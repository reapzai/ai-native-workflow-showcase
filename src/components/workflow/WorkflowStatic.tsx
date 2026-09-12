import { WORKFLOW_STEPS } from "@/lib/content";

/**
 * The reduced-motion form of the workflow section.
 *
 * Scroll-linked sticky sequences are exactly what a reduced-motion preference
 * is asking us not to do, so this is not the same section with the animation
 * switched off — it is a plain, complete, readable list. Same six steps, same
 * words, no transforms, no sticky.
 */
export function WorkflowStatic() {
  return (
    <ol className="mt-16 list-none space-y-px border-t border-[var(--line)]">
      {WORKFLOW_STEPS.map((step) => (
        <li
          key={step.n}
          className="grid gap-4 border-b border-[var(--line)] py-8 sm:grid-cols-[5rem_1fr] sm:gap-8"
        >
          <span className="font-[family-name:var(--font-mono)] text-sm tracking-[0.16em] text-[var(--color-amber-accent)]">
            {step.n}
          </span>
          <div>
            <h3 className="text-xl font-medium text-[var(--color-bone-50)]">
              {step.title}
            </h3>
            <p className="mt-2 text-[0.9375rem] text-[var(--color-bone-100)]">
              {step.claim}
            </p>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-[var(--color-bone-300)]">
              {step.body}
            </p>
            <p className="mt-3 font-[family-name:var(--font-mono)] text-xs text-[var(--color-bone-500)]">
              {step.detail}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
