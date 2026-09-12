import type { FitCard as FitCardData } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  card: FitCardData;
  index: number;
};

/**
 * One card maps a line from the job ad to something that already exists in a
 * repository. The role wording sits on top in mono — quoted, not claimed —
 * and the proof line at the bottom is the part that can be checked.
 */
export function FitCard({ card, index }: Props) {
  return (
    <Reveal
      as="li"
      delay={index * 0.06}
      className="group relative flex flex-col rounded-xl border border-[var(--line)] bg-[var(--color-ink-850)]/60 p-7 transition-colors duration-300 hover:border-[color-mix(in_oklab,var(--color-amber-accent)_32%,transparent)]"
    >
      {/* Hairline that warms on hover — the only hover decoration used here. */}
      <span
        aria-hidden
        className="absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[var(--color-amber-accent)] to-transparent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
      />

      <p className="font-[family-name:var(--font-mono)] text-[0.75rem] uppercase tracking-[0.14em] text-[var(--color-bone-600)]">
        {card.role}
      </p>

      <h3 className="mt-4 text-xl font-medium tracking-[-0.01em] text-[var(--color-bone-50)]">
        {card.title}
      </h3>

      <p className="mt-3 text-base leading-relaxed text-[var(--color-bone-300)]">
        {card.body}
      </p>

      {card.personal && (
        <p className="mt-3 text-base leading-relaxed text-[var(--color-bone-500)]">
          {card.personal}
        </p>
      )}

      <p className="mt-auto pt-6 font-[family-name:var(--font-mono)] text-[0.8125rem] leading-relaxed text-[var(--color-amber-soft)]/90">
        {card.proof}
      </p>
    </Reveal>
  );
}
