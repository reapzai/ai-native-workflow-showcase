"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToQuery(onChange: () => void): () => void {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function readQuery(): boolean {
  return window.matchMedia(QUERY).matches;
}

/** Never fires — hydration alone flips this snapshot from false to true. */
function subscribeNever(): () => void {
  return () => {};
}

const alwaysTrue = () => true;
const alwaysFalse = () => false;

/**
 * Hydration-safe reduced-motion preference.
 *
 * Reading the media query directly during render returns the real value on the
 * very first client render, while the server — which has no media queries —
 * rendered the other branch. Any component that varies its markup on it
 * therefore breaks hydration, and React throws the tree away and rebuilds it.
 * That is not hypothetical: it happened here, and it hit precisely the people
 * who had asked for less movement.
 *
 * `useSyncExternalStore` is the primitive that solves this properly: React
 * uses `getServerSnapshot` during hydration, so server and client agree, and
 * re-renders with the real value immediately afterwards.
 *
 * `mounted` is exposed as well, for the places that would rather render the
 * plain version first and enhance afterwards than the other way round.
 */
export function useMotionPreference(): { reduced: boolean; mounted: boolean } {
  const reduced = useSyncExternalStore(
    subscribeToQuery,
    readQuery,
    alwaysFalse,
  );

  const mounted = useSyncExternalStore(
    subscribeNever,
    alwaysTrue,
    alwaysFalse,
  );

  return { reduced: mounted && reduced, mounted };
}
