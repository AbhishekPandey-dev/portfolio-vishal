"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useInViewport } from "@/hooks/use-in-viewport";
import { EASING, DURATION } from "@/lib/animation-config";

export function CTASection() {
  const { ref, hasBeenInView } = useInViewport<HTMLElement>({
    threshold: 0.25,
    once: true,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-24 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(135deg, #000000 0%, #001a1f 30%, #000d10 60%, #000000 100%)",
          backgroundSize: "400% 400%",
          animation: "gradient-shift 15s ease infinite",
        }}
      />

      {/* Floating accent shape */}
      <div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] opacity-[0.03] pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, #00D9FF, transparent, #00D9FF, transparent)",
          borderRadius: "50%",
          animation: "float-rotate 20s linear infinite",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[900px] mx-auto text-center">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={
            hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
          }
          transition={{
            duration: DURATION.normal,
            ease: EASING.expoOut,
          }}
          className="font-label uppercase tracking-[0.3em] text-[11px] text-vs-accent block mb-8"
        >
          LET&apos;S CONNECT
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={
            hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
          }
          transition={{
            duration: DURATION.entrance,
            ease: EASING.expoOut,
            delay: 0.1,
          }}
          className="text-display-xl font-headline font-black text-white tracking-tight mb-6"
        >
          Let&apos;s build something{" "}
          <span className="text-vs-accent">extraordinary</span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={
            hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{
            duration: DURATION.slow,
            ease: EASING.expoOut,
            delay: 0.2,
          }}
          className="text-vs-text-secondary text-base md:text-lg leading-relaxed font-body max-w-[600px] mx-auto mb-12"
        >
          Share your idea, vision, or challenge—I&apos;m here to help turn it
          into a digital experience that performs beautifully.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={
            hasBeenInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.85 }
          }
          transition={{
            duration: DURATION.normal,
            ease: EASING.expoOut,
            delay: 0.35,
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary CTA */}
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center px-10 py-4 bg-vs-accent text-black font-headline font-bold uppercase tracking-[0.15em] text-sm hover:bg-white transition-colors duration-300 rounded-sm overflow-hidden"
            style={{
              animation: "glow-pulse 3s ease-in-out infinite",
            }}
          >
            <span className="relative z-10">Let&apos;s Talk</span>
          </Link>

          {/* Secondary CTA */}
          <Link
            href="mailto:hello@vishalsingh.dev"
            className="inline-flex items-center justify-center px-10 py-4 border border-white/20 text-white font-headline font-medium uppercase tracking-[0.15em] text-sm hover:border-vs-accent hover:text-vs-accent transition-all duration-300 rounded-sm"
          >
            Send an Email
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
