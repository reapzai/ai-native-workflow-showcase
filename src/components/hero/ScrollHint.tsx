"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useMotionPreference } from "@/lib/use-motion-preference";

/**
 * A hint that scrolling is the interaction, which removes itself as soon as
 * the point is made — it fades out over the first 200px of scroll.
 *
 * The travelling tick is always in the markup and merely stops moving under
 * reduced motion, so server and client render the same tree.
 */
export function ScrollHint() {
  const { reduced } = useMotionPreference();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <motion.div
      style={{ opacity: reduced ? 1 : opacity }}
      className="flex items-center gap-3 pb-2"
    >
      <span
        aria-hidden
        className="relative block h-8 w-px overflow-hidden bg-[var(--line)]"
      >
        <motion.span
          className="absolute inset-x-0 h-3 bg-[var(--color-amber-accent)]"
          initial={{ y: -12 }}
          animate={reduced ? { y: -12, opacity: 0 } : { y: 32 }}
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: 2.1,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }
          }
        />
      </span>
      <span className="kicker">Scrollen · ca. 4 Minuten</span>
    </motion.div>
  );
}
