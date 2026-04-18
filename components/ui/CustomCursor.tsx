"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Move cursor logic
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    // Hover logic
    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const text = target.getAttribute("data-cursor-text");

      if (text && textRef.current) {
        textRef.current.innerText = text;
        gsap.to(textRef.current, { opacity: 1, duration: 0.15, delay: 0.3 });
      }

      gsap.to(cursor, {
        scale: text ? 6 : 4,
        duration: 0.25,
        delay: text ? 0.3 : 0, 
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (textRef.current) {
        gsap.to(textRef.current, {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            if (textRef.current) textRef.current.innerText = "";
          },
        });
      }

      gsap.to(cursor, {
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Target links, buttons, and specific interactive elements for scaling/inversion
    const interactables = document.querySelectorAll('a, button, .project-card, [data-cursor="hover"]');
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 scale-100 transition-transform hidden md:flex items-center justify-center overflow-hidden"
    >
      <span
        ref={textRef}
        className="text-[3px] font-bold uppercase tracking-widest text-black opacity-0 text-center leading-none"
        style={{ color: "black", mixBlendMode: "normal" }}
      />
    </div>
  );
}
