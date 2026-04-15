"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { type Project } from "@/types";
import { SectionLabel } from "../ui/SectionLabel";

const DUMMY_PROJECTS: Project[] = [
  {
    id: "px1",
    title: "PIXELFORGE",
    category: "MERN Stack / UI Design",
    year: "2024",
    description: "Modern minimalist website interface with clean typography.",
    tags: ["MERN", "Design"],
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "ls2",
    title: "LUMINA STORE",
    category: "Shopify / Liquid",
    year: "2023",
    description: "Sleek e-commerce dashboard showing analytics and product management.",
    tags: ["Shopify"],
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "at3",
    title: "ARCHI-TECH",
    category: "WordPress / Headless",
    year: "2023",
    description: "Minimalist architectural photography website layout.",
    tags: ["WordPress"],
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "sn4",
    title: "SYNAPSE",
    category: "Full Stack / API",
    year: "2022",
    description: "Abstract digital art interface with glowing accents.",
    tags: ["API", "React"],
    coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
  }
];

export function WorkSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".project-card") as HTMLElement[];
    
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-[#0E0E0E] py-32 px-8 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-baseline mb-20 border-b border-white/10 pb-4">
          <SectionLabel>Selected Work</SectionLabel>
          <span className="font-label text-sm uppercase tracking-[0.3em] text-white/40">2021 — 2024</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
          {DUMMY_PROJECTS.map((project) => (
            <div key={project.id} className="project-card group relative aspect-[4/5] bg-black overflow-hidden cursor-pointer">
              <div className="absolute inset-0 z-0">
                <Image 
                  src={project.coverImage} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[700ms] group-hover:scale-105 ease-cinematic"
                />
              </div>
              <div className="absolute inset-0 z-10 p-12 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                <span className="font-label text-[10px] uppercase tracking-[0.3em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white/80">
                  {project.category}
                </span>
                <h3 className="text-4xl md:text-5xl font-black font-headline uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-cinematic text-white">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
