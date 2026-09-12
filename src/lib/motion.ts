import type { Transition, Variants } from "motion/react";

/**
 * Shared motion tokens.
 *
 * Everything here is short on purpose. The page is screen-shared and talked
 * over: an animation that takes longer than the sentence describing it is in
 * the way. Nothing exceeds 700ms.
 */

/** Standard ease — calm, slightly decelerating, no overshoot. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** For things that move with the scroll rather than on their own. */
export const SPRING: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 24,
  mass: 0.6,
};

export const DURATION = {
  fast: 0.24,
  base: 0.45,
  slow: 0.7,
} as const;

/** Fade up — the default entrance for text blocks and cards. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

/** Same, but without movement — used where a shift would cause reflow. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE } },
};

/** Parent for staggered lists. */
export function stagger(step = 0.07, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: step, delayChildren: delay },
    },
  };
}

/**
 * Viewport config used by every `whileInView`. `once` matters for a live
 * presentation: scrolling back must not replay an animation mid-sentence.
 */
export const VIEWPORT = { once: true, amount: 0.35 } as const;
