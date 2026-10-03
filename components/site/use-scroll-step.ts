"use client";

import { useEffect, useState } from "react";

/**
 * Reports how far the page has scrolled within the first viewport as a step in
 * [0, steps]. Callers map steps to Tailwind classes, so no inline styles are needed.
 * Always 0 when the user prefers reduced motion.
 */
export function useScrollStep(steps: number): number {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduceMotion.matches) {
        setStep(0);
        return;
      }
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      setStep(Math.round(progress * steps));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    reduceMotion.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      reduceMotion.removeEventListener("change", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [steps]);

  return step;
}
