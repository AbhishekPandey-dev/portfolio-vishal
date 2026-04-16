"use client";

import { useInViewport } from "@/hooks/use-in-viewport";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SERVICES } from "@/lib/constants";

export function WhatIDo() {
  const { ref, hasBeenInView } = useInViewport<HTMLElement>({
    threshold: 0.15,
    once: true,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 py-24"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,217,255,0.03)_0%,_transparent_50%)]" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel>WHAT I DO</SectionLabel>
          <h2 className="text-display-lg font-headline font-bold text-white tracking-tight mt-4">
            Services that deliver results
          </h2>
        </div>

        {/* Service grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
              isInView={hasBeenInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
