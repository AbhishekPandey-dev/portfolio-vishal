"use client";

import { useEffect, useRef, useState } from "react";

interface UseCounterOptions {
  target: number;
  duration?: number; // ms
  trigger?: boolean; // Start counting when true
  decimals?: number;
}

export function useCounter({
  target,
  duration = 2000,
  trigger = false,
  decimals = 0,
}: UseCounterOptions): string {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!trigger || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();

    const easeOutQuad = (t: number) => t * (2 - t);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(rawProgress);

      setValue(easedProgress * target);

      if (rawProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    requestAnimationFrame(animate);
  }, [trigger, target, duration]);

  return value.toFixed(decimals);
}
