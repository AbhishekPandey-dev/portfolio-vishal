"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface UseScrollProgressReturn<T extends HTMLElement> {
  ref: RefObject<T | null>;
  progress: number; // 0 to 1
}

export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(): UseScrollProgressReturn<T> {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const updateProgress = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      // 0 = element just entered bottom of viewport
      // 1 = element has fully scrolled past top of viewport
      const rawProgress =
        (windowHeight - rect.top) / (windowHeight + elementHeight);
      setProgress(Math.max(0, Math.min(1, rawProgress)));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { ref, progress };
}
