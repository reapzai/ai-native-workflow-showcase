import { Reveal } from "@/components/ui/Reveal";

/**
 * A shortened, faithful excerpt of btc-website/.github/workflows/deploy.yml.
 *
 * It is here because a claim about quality gates is worth little on its own —
 * this is the file that actually enforces them, including the comment that
 * explains why `needs: test` is there at all.
 */
const LINES: { text: string; kind: "comment" | "key" | "cmd" | "plain" }[] = [
  { text: "# .github/workflows/deploy.yml", kind: "comment" },
  { text: "on:", kind: "key" },
  { text: "  push:", kind: "plain" },
  { text: "    branches: [master]", kind: "plain" },
  { text: "", kind: "plain" },
  { text: "jobs:", kind: "key" },
  { text: "  test:", kind: "key" },
  { text: "    steps:", kind: "plain" },
  { text: "      - run: npm ci", kind: "cmd" },
  { text: "      - run: npx tsc --noEmit", kind: "cmd" },
  { text: "      - run: npm test", kind: "cmd" },
  { text: "", kind: "plain" },
  { text: "  deploy:", kind: "key" },
  { text: "    needs: test", kind: "cmd" },
];

const COLOURS = {
  comment: "text-[var(--color-bone-700)]",
  key: "text-[var(--color-bone-300)]",
  cmd: "text-[var(--color-amber-soft)]",
  plain: "text-[var(--color-bone-500)]",
} as const;

export function CiExcerpt() {
  return (
    <Reveal className="lg:sticky lg:top-28">
      <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--color-ink-850)]/60">
        <div className="flex items-center gap-3 border-b border-[var(--line)] px-5 py-3">
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-[var(--color-amber-accent)]"
          />
          <span className="font-[family-name:var(--font-mono)] text-[0.75rem] uppercase tracking-[0.16em] text-[var(--color-bone-500)]">
            Auszug · btc-website
          </span>
        </div>

        <pre className="overflow-x-auto px-5 py-5 font-[family-name:var(--font-mono)] text-[0.78125rem] leading-[1.8]">
          <code>
            {LINES.map((line, i) => (
              <span key={i} className={`block ${COLOURS[line.kind]}`}>
                {line.text || " "}
              </span>
            ))}
          </code>
        </pre>
      </div>

      <p className="mt-5 border-l border-[var(--color-amber-accent)]/40 pl-5 text-[0.9375rem] leading-relaxed text-[var(--color-bone-500)]">
        <span className="text-[var(--color-bone-300)]">
          Warum <span className="font-[family-name:var(--font-mono)]">needs: test</span> dasteht:
        </span>{" "}
        vorher lief der Test-Workflow daneben her und hat den Deploy nicht
        aufgehalten. Rot war rot — und ging trotzdem raus.
      </p>
    </Reveal>
  );
}
