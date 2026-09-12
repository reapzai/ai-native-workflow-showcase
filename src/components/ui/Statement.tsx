import { Reveal } from "@/components/ui/Reveal";

type StatementProps = {
  lead: string;
  emphasis: string;
  className?: string;
};

/**
 * The editorial pause between sections. Deliberately rationed: the serif
 * appears exactly three times on the page, so each one still lands.
 *
 * The second line is the claim; it gets the italic serif and the accent.
 */
export function Statement({ lead, emphasis, className = "" }: StatementProps) {
  return (
    <Reveal className={className}>
      <p className="display-md text-balance">
        <span className="text-[var(--color-bone-500)]">{lead}</span>
        <br />
        <span className="font-[family-name:var(--font-serif)] italic text-[var(--color-bone-50)]">
          {emphasis}
        </span>
      </p>
    </Reveal>
  );
}
