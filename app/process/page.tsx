"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProcessStep } from "@/types";

const STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description: "Unearthing the core essence of your brand. We dive deep into user personas, market landscapes, and technical constraints."
  },
  {
    number: "02",
    title: "Strategy",
    description: "Mapping the architectural blueprint. We define user flows, content hierarchies, and the stylistic direction."
  },
  {
    number: "03",
    title: "Design",
    description: "The visual manifestation. Applying our cinematic brutalist philosophy to create high-impact, editorial interfaces."
  },
  {
    number: "04",
    title: "Development",
    description: "Translating pixels into high-performance code. Utilizing modern stacks to ensure the fluidity and precision is realized."
  }
];

export default function ProcessPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax the massive numbers slightly
  useGSAP(() => {
    const numbers = gsap.utils.toArray(".step-number") as HTMLElement[];
    
    numbers.forEach((num) => {
      gsap.to(num, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: num.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-black pt-32 pb-32">
      <div className="text-center mb-24">
        <SectionLabel>Methodology</SectionLabel>
        <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter uppercase mt-4">The Process</h2>
      </div>

      <div>
        {STEPS.map((step) => (
          <div key={step.number} className="min-h-[80vh] flex flex-col justify-center items-center text-center px-8 sticky top-0 bg-black overflow-hidden border-t border-white/5">
            <div className="step-number text-[180px] md:text-[320px] massive-stroke absolute inset-0 flex items-center justify-center z-0 select-none opacity-50 font-black font-headline">
              {step.number}
            </div>
            
            <div className="relative z-10 max-w-2xl px-4">
              <h3 className="font-headline text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8 text-white">
                {step.title}
              </h3>
              <p className="font-body text-lg md:text-xl text-white/60 mx-auto leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
