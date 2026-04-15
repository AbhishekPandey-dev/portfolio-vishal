"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { RevealText } from "../ui/RevealText";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-line",
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.5,
          ease: "expo.out",
          delay: 0.5,
        },
      );

      gsap.fromTo(
        ".hero-stat",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 1.2,
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="min-h-[85vh] flex flex-col justify-end px-8 pb-20 mt-12 md:mt-24 max-w-[1400px] mx-auto"
    >
      <h1 className="text-[15vw] md:text-[18vw] font-black uppercase mb-4 font-headline leading-[0.85] tracking-tighter">
        <div className="overflow-hidden">
          <div className="hero-line">VISHAL</div>
        </div>
        <div className="overflow-hidden">
          <div className="hero-line">SINGH</div>
        </div>
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mt-12">
        <RevealText delay={1} className="max-w-xl">
          <p className="font-headline text-xl md:text-2xl uppercase tracking-widest text-white/80">
            Full Stack Web Developer (MERN), UI/UX Designer, Shopify & WordPress
            Specialist with 8+ years of experience.
          </p>
        </RevealText>

        <div className="flex gap-12 pt-8 md:pt-0">
          <div className="hero-stat flex flex-col">
            <span className="text-4xl font-bold font-headline">8+</span>
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-white/40">
              Years Exp
            </span>
          </div>
          <div className="hero-stat flex flex-col">
            <span className="text-4xl font-bold font-headline">55+</span>
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-white/40">
              Websites
            </span>
          </div>
          <div className="hero-stat flex flex-col">
            <span className="text-4xl font-bold font-headline">25+</span>
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-white/40">
              Clients
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
