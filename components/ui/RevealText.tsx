"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function RevealText({ children, className = "", delay = 0 }: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.fromTo(
      container,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        delay: delay,
        scrollTrigger: {
          trigger: container,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={containerRef}>{children}</div>
    </div>
  );
}
