"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface UseInViewportOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean; // If true, stays "in view" permanently after first trigger
}

interface UseInViewportReturn<T extends HTMLElement> {
  ref: RefObject<T | null>;
  isInView: boolean;
  hasBeenInView: boolean;
}

export function useInViewport<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewportOptions = {}
): UseInViewportReturn<T> {
  const { threshold = 0.25, rootMargin = "0px", once = true } = options;
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsInView(true);
      setHasBeenInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        if (inView) {
          setHasBeenInView(true);
          if (once) observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView, hasBeenInView };
}
