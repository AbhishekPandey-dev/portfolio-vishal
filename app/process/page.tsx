"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProcessStep } from "@/types";

const STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & Understanding",
    description: "We begin by diving deep into your business objectives. We analyze your target audience, identify market opportunities, and establish a clear project vision to ensure we start on the right foot.",
    tags: ["USER RESEARCH", "MARKET ANALYSIS", "COMPETITOR ANALYSIS", "PROJECT ROADMAP"]
  },
  {
    number: "02",
    title: "Strategy & Planning",
    description: "With the insights gained, we chart a strategic course. Defining the foundational blueprints and technical architecture ensures seamless execution and aligns every decision with your ultimate goals.",
    tags: ["ROADMAP CREATION", "ARCHITECTURE DESIGN", "TECHNICAL SPECIFICATION", "RESOURCE PLANNING"]
  },
  {
    number: "03",
    title: "Design & Prototyping",
    description: "Bringing the vision to life visually. We craft user-centric experiences, focusing on accessible, intuitive interfaces that resonate with users and embody your brand identity.",
    tags: ["WIREFRAMING", "UI DESIGN", "UX DESIGN", "DESIGN SYSTEM", "PROTOTYPING"]
  },
  {
    number: "04",
    title: "Development & Building",
    description: "Where code meets creativity. We transform concepts into responsive, performant products using the latest frameworks and best practices, ensuring robust scalable architecture.",
    tags: ["FRONT-END DEVELOPMENT", "BACK-END DEVELOPMENT", "API INTEGRATION", "CMS SETUP", "PERFORMANCE OPTIMIZATION"]
  },
  {
    number: "05",
    title: "Testing & QA",
    description: "Rigorous testing ensures everything works flawlessly. We validate performance, cross-browser compatibility, and identify areas for improvement before launch so the experience is perfect.",
    tags: ["CROSS-BROWSER TESTING", "USABILITY TESTING", "PERFORMANCE TESTING", "BUG FIXING & QA"]
  },
  {
    number: "06",
    title: "Launch & Deployment",
    description: "The culmination of our journey. We deploy the project to the live environment, ensuring a smooth transition and taking care of the entire process so you can focus on your business.",
    tags: ["FINAL REVIEW", "DEPLOYMENT", "SERVER CONFIGURATION", "POST-LAUNCH MONITORING"]
  },
  {
    number: "07",
    title: "Ongoing Support",
    description: "We're here for the long run. We provide continuous monitoring and maintenance to ensure your product remains robust, secure, and ready to scale alongside your evolving needs.",
    tags: ["MAINTENANCE", "SECURITY UPDATES", "PERFORMANCE MONITORING", "FEATURE ADDITIONS"]
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
            <div className="step-number text-[180px] md:text-[320px] massive-stroke absolute inset-0 flex items-center justify-center z-0 select-none opacity-50 font-black font-headline tracking-tighter">
              {step.number}
            </div>
            
            <div className="relative z-10 max-w-3xl px-4 flex flex-col items-center">
              <h3 className="font-headline text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8 text-white">
                {step.title}
              </h3>
              <p className="font-body text-lg md:text-xl text-white/60 mx-auto leading-relaxed mb-10 max-w-2xl">
                {step.description}
              </p>
              
              {step.tags && (
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {step.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="text-[10px] sm:text-xs font-mono px-3 py-1.5 border border-white/20 text-white/60 uppercase tracking-widest rounded-full bg-black/50 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
