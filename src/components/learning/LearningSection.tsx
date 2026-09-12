import { ArrowRight } from "lucide-react";
import { BEK_LINE, LEARNING, LEARNING_STATEMENT } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Statement } from "@/components/ui/Statement";

/**
 * Section 7 — the honest one.
 *
 * Framed as "today → goal" rather than as gaps, and with no progress bars:
 * a bar would put a made-up number on something that cannot be measured, and
 * this section only works if every line of it is true.
 */
export function LearningSection() {
  return (
    <Section
      id="learning"
      kicker="Wo ich besser werde"
      heading={
        <>
          Was ich heute schon kann —{" "}
          <span className="text-[var(--color-bone-500)]">
            und woran ich gerade arbeite.
          </span>
        </>
      }
      lede={
        <>
          Claude Code schreibt den Großteil meines Codes. Das ist der ehrliche
          Stand, und ich baue darunter gerade das Fundament aus. Beides gehört
          in dieses Gespräch.
        </>
      }
    >
      <ul className="mt-16 list-none border-t border-[var(--line)]">
        {LEARNING.map((item, i) => (
          <Reveal
            as="li"
            key={item.id}
            delay={i * 0.05}
            className="grid gap-x-10 gap-y-4 border-b border-[var(--line)] py-8 lg:grid-cols-[minmax(0,16rem)_1fr_1fr] lg:items-baseline"
          >
            <h3 className="text-base font-medium tracking-[-0.005em] text-[var(--color-bone-50)]">
              {item.title}
            </h3>

            <div className="flex items-start gap-3">
              <span className="mt-[0.4375rem] size-1.5 shrink-0 rounded-full bg-[var(--color-bone-700)]" />
              <div>
                <p className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-[var(--color-bone-600)]">
                  Heute
                </p>
                <p className="mt-1.5 text-base leading-relaxed text-[var(--color-bone-300)]">
                  {item.today}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ArrowRight
                aria-hidden
                className="mt-1 size-3.5 shrink-0 text-[var(--color-amber-accent)]"
              />
              <div>
                <p className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-[var(--color-amber-deep)]">
                  Ziel
                </p>
                <p className="mt-1.5 text-base leading-relaxed text-[var(--color-bone-100)]">
                  {item.goal}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>

      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Statement
          lead={LEARNING_STATEMENT.lead}
          emphasis={LEARNING_STATEMENT.emphasis}
        />

        <Reveal delay={0.08}>
          <p className="border-l border-[var(--color-amber-accent)]/40 pl-6 text-[1.0625rem] leading-relaxed text-pretty text-[var(--color-bone-300)]">
            {BEK_LINE}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
