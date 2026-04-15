"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".char");
    
    gsap.from(chars, {
      opacity: 0,
      y: 10,
      stagger: 0.02,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
      }
    });
  }, [children]);

  // Manually split text into spans if it's a string
  const renderContent = () => {
    if (typeof children === "string") {
      return children.split("").map((char, index) => (
        <span key={index} className="char inline-block whitespace-pre">
          {char}
        </span>
      ));
    }
    return children;
  };

  return (
    <span 
      ref={containerRef}
      className={cn("inline-block font-label uppercase tracking-[0.3em] text-[12px] text-white/40 mb-8", className)}
    >
      {renderContent()}
    </span>
  );
}
