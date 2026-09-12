import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Larger hit area and a visible border — used for the hero links. */
  variant?: "inline" | "chip";
};

/**
 * The only outbound link component. External targets are the one place this
 * page touches the network, and they are never needed for it to render.
 */
export function ExternalLink({
  href,
  children,
  className = "",
  variant = "inline",
}: ExternalLinkProps) {
  const base =
    "group inline-flex items-center gap-1.5 transition-colors duration-200";

  const styles =
    variant === "chip"
      ? "rounded-full border border-[var(--line)] bg-[var(--glass)] px-4 py-2 text-sm text-[var(--color-bone-300)] hover:border-[color-mix(in_oklab,var(--color-amber-accent)_45%,transparent)] hover:text-[var(--color-bone-50)]"
      : "text-[var(--color-bone-300)] hover:text-[var(--color-amber-soft)]";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      {children}
      <ArrowUpRight
        aria-hidden
        className="size-3.5 shrink-0 opacity-60 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px group-hover:opacity-100"
      />
    </a>
  );
}
