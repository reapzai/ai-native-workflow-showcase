"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SECTIONS, type SectionId } from "@/lib/sections";

type PresentationValue = {
  /** Chrome is reduced to the bare minimum while this is on. */
  active: boolean;
  toggle: () => void;
  /** Back to the top, in the state the presentation should start in. */
  reset: () => void;
  goTo: (id: SectionId) => void;
  /** Index into SECTIONS of whatever is currently filling the viewport. */
  current: number;
};

const PresentationContext = createContext<PresentationValue | null>(null);

/** How far into the viewport a section must reach to count as "current". */
const ACTIVE_LINE = 0.35;

function sectionTop(id: SectionId): number | null {
  const el = document.getElementById(id);
  if (!el) return null;
  return el.getBoundingClientRect().top + window.scrollY;
}

export function PresentationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(false);
  const [current, setCurrent] = useState(0);

  const toggle = useCallback(() => setActive((v) => !v), []);

  /**
   * Native smooth scrolling, never a scroll-hijack: the wheel keeps working
   * exactly as it did, this only adds a way to land on a section start.
   */
  const goTo = useCallback((id: SectionId) => {
    const top = sectionTop(id);
    if (top === null) return;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const reset = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* Track which section is on screen — feeds the progress rail. */
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.scrollY + window.innerHeight * ACTIVE_LINE;
      let index = 0;
      for (let i = 0; i < SECTIONS.length; i++) {
        const top = sectionTop(SECTIONS[i].id);
        if (top !== null && top <= line) index = i;
      }
      setCurrent(index);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Keyboard. Arrow keys only take over while presentation mode is on, so
     normal visitors keep untouched native scrolling. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }

      const key = event.key;

      if (key.toLowerCase() === "p") {
        event.preventDefault();
        toggle();
        return;
      }

      if (key.toLowerCase() === "r") {
        event.preventDefault();
        reset();
        return;
      }

      if (key === "Escape" && active) {
        event.preventDefault();
        setActive(false);
        return;
      }

      if (!active) return;

      if (key === "ArrowDown" || key === "PageDown") {
        event.preventDefault();
        const next = Math.min(current + 1, SECTIONS.length - 1);
        goTo(SECTIONS[next].id);
      } else if (key === "ArrowUp" || key === "PageUp") {
        event.preventDefault();
        const prev = Math.max(current - 1, 0);
        goTo(SECTIONS[prev].id);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, current, goTo, reset, toggle]);

  const value = useMemo(
    () => ({ active, toggle, reset, goTo, current }),
    [active, toggle, reset, goTo, current],
  );

  return (
    <PresentationContext.Provider value={value}>
      {children}
    </PresentationContext.Provider>
  );
}

export function usePresentation(): PresentationValue {
  const ctx = useContext(PresentationContext);
  if (!ctx) {
    throw new Error("usePresentation must be used inside PresentationProvider");
  }
  return ctx;
}
