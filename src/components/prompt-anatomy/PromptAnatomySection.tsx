"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useMotionPreference } from "@/lib/use-motion-preference";
import { CONTEXT_LAYERS, PROMPT_PARTS } from "@/lib/content";
import { DURATION, EASE } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PromptCard } from "@/components/prompt-anatomy/PromptCard";

/**
 * Section 4 — how the prompt is put together.
 *
 * Different scroll shape from the workflow section on purpose: here the
 * artefact stays still (sticky) and the explanation moves past it. Two
 * identical sticky sequences in a row would read as a template.
 *
 * Each explanation announces itself via the viewport callback, which drives
 * the highlight in the card. Under reduced motion nothing is dimmed and the
 * two columns simply sit next to each other.
 */
export function PromptAnatomySection() {
  const { reduced } = useMotionPreference();
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <Section
      id="prompt"
      kicker="Wie ich Claude briefe"
      heading={
        <>
          Ein Prompt ist kein Wunsch.{" "}
          <span className="text-[var(--color-bone-500)]">
            Er ist eine Spezifikation.
          </span>
        </>
      }
      lede={
        <>
          Das hier ist ein echtes Beispiel aus btc-website: die Sichtbarkeit von
          Bewerbungs-Tickets im Clan-Dashboard. Fünf Teile, und der letzte ist
          der, den die meisten weglassen.
        </>
      }
    >
      <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
        {/* The artefact. Sticky from lg upwards, where there is room for it. */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <PromptCard activeId={reduced ? null : activeId} />
          </Reveal>
        </div>

        {/* The explanations. */}
        <ol className="list-none lg:pb-[30vh] lg:pt-[6vh]">
          {PROMPT_PARTS.map((part, i) => (
            <motion.li
              key={part.id}
              className="reveal border-b border-[var(--line-soft)] py-8 last:border-b-0 lg:flex lg:min-h-[36vh] lg:flex-col lg:justify-center lg:border-b-0"
              onViewportEnter={() => setActiveId(part.id)}
              viewport={{ amount: 0.6, margin: "-25% 0px -25% 0px" }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: DURATION.base, ease: EASE }
              }
            >
              <div className="flex items-center gap-3">
                <span className="font-[family-name:var(--font-mono)] text-[0.75rem] tracking-[0.16em] text-[var(--color-amber-accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[0.75rem] tracking-[0.16em] text-[var(--color-bone-500)]">
                  {part.label}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-medium leading-snug text-balance text-[var(--color-bone-50)]">
                {part.question}
              </h3>
              <p className="mt-2.5 text-base leading-relaxed text-[var(--color-bone-300)]">
                {part.note}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Where each kind of context belongs. */}
      <div className="mt-24 border-t border-[var(--line)] pt-12">
        <Reveal>
          <h3 className="text-lg font-medium text-[var(--color-bone-50)]">
            Was wohin gehört
          </h3>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-[var(--color-bone-500)]">
            Nicht jeder Kontext gehört in den Prompt. Was immer gilt, steht im
            Repo — sonst muss ich es jedes Mal neu erklären, und irgendwann
            vergesse ich es.
          </p>
        </Reveal>

        <ul className="mt-10 grid list-none gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {CONTEXT_LAYERS.map((layer, i) => (
            <Reveal
              as="li"
              key={layer.id}
              delay={i * 0.06}
              className="bg-[var(--color-ink-850)] p-6"
            >
              <p className="font-[family-name:var(--font-mono)] text-[0.75rem] uppercase tracking-[0.16em] text-[var(--color-bone-600)]">
                {layer.title}
              </p>
              <p className="accent mt-2 font-[family-name:var(--font-mono)] text-sm">
                {layer.target}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-bone-300)]">
                {layer.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
