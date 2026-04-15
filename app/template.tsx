"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Enter animation: The overlay slides UP to reveal the page
    gsap.set(overlay, { yPercent: 0 }); // starts covering
    gsap.to(overlay, {
      yPercent: -100, // moves up out of view
      duration: 1.2,
      ease: "power4.inOut",
      onComplete: () => {
        gsap.set(overlay, { display: "none" }); // hide completely when done
      }
    });

  }, [pathname]);

  return (
    <>
      {/* Overlay Element */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-white pointer-events-none flex flex-col justify-end"
      >
        {/* You could add a logo or progress bar here for extra cinematic effect */}
      </div>

      <div ref={containerRef} className="min-h-screen">
        {children}
      </div>
    </>
  );
}
