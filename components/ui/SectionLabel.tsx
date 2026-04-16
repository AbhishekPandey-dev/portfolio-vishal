"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { SparklesText } from "./sparkles-text";

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const chars = wrapperRef.current.querySelectorAll(".char");
    const accentBox = wrapperRef.current.querySelector(".accent-box");
    
    // Animate the brutalist accent box
    gsap.fromTo(accentBox,
      { scale: 0, rotate: -90, opacity: 0 },
      {
        scale: 1, 
        rotate: 0, 
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.5)",
        scrollTrigger: { trigger: wrapperRef.current, start: "top 90%" }
      }
    );

    // Cinematic blur text reveal
    gsap.fromTo(chars, 
      { opacity: 0, x: 10, filter: "blur(8px)" },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        stagger: 0.04,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 90%",
        }
      }
    );
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
    <div ref={wrapperRef} className={cn("inline-flex items-center gap-4 mb-8", className)}>
      <span className="accent-box w-2.5 h-2.5 bg-vs-accent shrink-0" />
      <SparklesText 
        sparklesCount={6}
        colors={{ first: "#00D9FF", second: "#FFFFFF" }}
        className="inline-block font-label uppercase tracking-[0.5em] text-md md:text-base font-bold text-white/90"
      >
        {renderContent()}
      </SparklesText>
    </div>
  );
}
