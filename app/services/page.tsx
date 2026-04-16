"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Service } from "@/types";

const SERVICES: Service[] = [
  {
    id: "s1",
    title: "Design Strategy",
    description: "Systems architecture and identity formation. Turning abstract goals into structural reality.",
    tags: ["Creative Direction", "Systems"]
  },
  {
    id: "s2",
    title: "Interface Engineering",
    description: "Building the visual layer with maximum fidelity. From concept to interactive DOM elements.",
    tags: ["UI/UX", "Next.js"]
  },
  {
    id: "s3",
    title: "Backend Architecture",
    description: "Scalable API design and database modeling to support high-velocity front-ends.",
    tags: ["Node", "Database"]
  },
  {
    id: "s4",
    title: "E-Commerce",
    description: "Bespoke storefronts optimized for conversion without sacrificing aesthetic integrity.",
    tags: ["Shopify", "Liquid"]
  }
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".service-item",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-list",
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="py-32 px-8 bg-vs-surface min-h-[70vh] pb-32">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4 sticky top-32 self-start">
          <SectionLabel>Core Competencies</SectionLabel>
          <h2 className="font-headline text-5xl md:text-6xl font-black uppercase tracking-tighter mt-4">
            Services
          </h2>
        </div>
        
        <div className="lg:col-span-8 services-list space-y-16">
          {SERVICES.map((service, idx) => (
            <div key={service.id} className="service-item border-b border-white/10 pb-16">
              <h3 className="font-headline text-3xl md:text-4xl font-bold uppercase mb-6 flex gap-8 items-center text-white">
                <span className="text-white/20 font-light w-12 shrink-0">0{idx + 1}</span>
                {service.title}
              </h3>
              <div className="pl-0 md:pl-20">
                <p className="text-white/60 font-body text-lg leading-relaxed max-w-xl mb-8">
                  {service.description}
                </p>
                <div className="flex gap-4">
                  {service.tags.map(tag => (
                    <span key={tag} className="font-label text-[10px] uppercase tracking-[0.2em] px-4 py-2 bg-white/5 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
