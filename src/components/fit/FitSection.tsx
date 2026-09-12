import { FIT_CARDS } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FitCard } from "@/components/fit/FitCard";

/**
 * Section 2 — deliberately short. It exists to establish the frame, not to
 * argue: each card names one line from the job description and one thing that
 * already exists because of it. No claim of a perfect match.
 */
export function FitSection() {
  return (
    <Section
      id="fit"
      kicker="Warum diese Rolle"
      heading={
        <>
          Die Ausschreibung beschreibt ziemlich genau,{" "}
          <span className="text-[var(--color-bone-500)]">
            wie ich ohnehin arbeite.
          </span>
        </>
      }
      lede={
        <>
          Das Wort „Vibe Coder“ ist mir aufgefallen, weil es kein Fremdwort für
          mich ist. Nicht alles davon kann ich gleich gut — aber das hier mache
          ich seit Monaten täglich.
        </>
      }
    >
      {/* Six cards make a clean 3x2 on desktop and 2x3 on tablet, so no card
          has to span and the reading order stays predictable. */}
      <ul className="mt-16 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FIT_CARDS.map((card, i) => (
          <FitCard key={card.id} card={card} index={i} />
        ))}
      </ul>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-2xl border-l border-[var(--color-amber-accent)]/40 pl-5 text-base leading-relaxed text-[var(--color-bone-500)]">
          Was ich noch nicht kann, steht weiter unten auf dieser Seite — in
          einem eigenen Abschnitt, nicht im Kleingedruckten.
        </p>
      </Reveal>
    </Section>
  );
}
