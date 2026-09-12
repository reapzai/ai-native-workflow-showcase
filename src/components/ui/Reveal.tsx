"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";
import { useMotionPreference } from "@/lib/use-motion-preference";

type RevealProps = {
  children: ReactNode;
  /** Seconds. Kept small — a live audience is faster than a long stagger. */
  delay?: number;
  /** Vertical travel in px. 0 where a shift would cause layout reflow. */
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span";
};

/**
 * The single entrance animation on this page. One component means one timing
 * curve everywhere, and one place to honour reduced motion.
 *
 * Reduced motion is handled by collapsing the transition to zero rather than
 * by rendering different markup — see useMotionPreference for why the markup
 * has to stay identical.
 *
 * The `reveal` class exists for the no-JavaScript fallback in the layout: the
 * server sends these elements at opacity 0, so without a script to animate
 * them they would stay invisible. See the <noscript> block in layout.tsx.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = "div",
}: RevealProps) {
  const { reduced } = useMotionPreference();
  const Tag = motion[as];

  return (
    <Tag
      className={className ? `reveal ${className}` : "reveal"}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: DURATION.base, ease: EASE, delay }
      }
    >
      {children}
    </Tag>
  );
}
