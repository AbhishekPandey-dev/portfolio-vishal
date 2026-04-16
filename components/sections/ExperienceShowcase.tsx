"use client";

import { motion } from "framer-motion";
import { useInViewport } from "@/hooks/use-in-viewport";
import { CLIENT_BRANDS } from "@/lib/constants";
import { EASING, DURATION, STAGGER } from "@/lib/animation-config";

export function ExperienceShowcase() {
  const { ref, hasBeenInView } = useInViewport<HTMLElement>({
    threshold: 0.2,
    once: true,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-vs-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,217,255,0.03)_0%,_transparent_60%)]" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center">
        {/* Central quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={
            hasBeenInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.92 }
          }
          transition={{
            duration: DURATION.slow,
            ease: EASING.expoOut,
          }}
          className="text-center mb-20"
        >
          <span className="font-label uppercase tracking-[0.3em] text-[11px] text-vs-accent block mb-6">
            TRUSTED BY
          </span>
          <h2 className="text-display-lg font-headline font-bold text-white tracking-tight max-w-[700px]">
            I help brands and businesses{" "}
            <span className="text-vs-accent">move faster</span>
          </h2>
          <p className="mt-6 text-vs-text-secondary text-base md:text-lg font-body max-w-[500px] mx-auto">
            Through design and code, anything is possible.
          </p>
        </motion.div>

        {/* Client brands grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 w-full mb-16">
          {CLIENT_BRANDS.map((brand, index) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 20 }}
              animate={
                hasBeenInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{
                duration: DURATION.normal,
                ease: EASING.expoOut,
                delay: index * 0.05,
              }}
              className="flex items-center justify-center py-5 px-4 rounded-sm border border-white/[0.06] bg-white/[0.02] hover:border-vs-accent/20 hover:bg-white/[0.04] transition-all duration-500 group"
            >
              <span className="font-headline text-sm font-medium text-white/40 group-hover:text-white/80 transition-colors duration-500 text-center">
                {brand}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
