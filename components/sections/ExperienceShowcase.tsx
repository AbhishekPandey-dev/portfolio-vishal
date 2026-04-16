"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useInViewport } from "@/hooks/use-in-viewport";
import { CLIENT_BRANDS } from "@/lib/constants";
import { EASING, DURATION } from "@/lib/animation-config";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const BRAND_IMAGE_MAP: Record<string, string> = {
  "Nappa Dori": "/images/mobile-img/nappadori.png",
  "Swiss Beauty": "/images/mobile-img/swissbeauty.png",
  "Shivan & Narresh": "/images/mobile-img/shivanandnarresh.png",
  "Outhouse Jewellery": "/images/mobile-img/outhouse.png",
  "Orange Tree": "/images/mobile-img/orangetree.png",
  "Perona": "/images/mobile-img/perona.png",
  "Manan Design": "/images/mobile-img/manan.png",
  "Jan & April": "/images/mobile-img/janandapril.png",
  "Cord Studio": "/images/mobile-img/cordstudio.png",
  "Artisan Lab": "/images/mobile-img/artisanlab.png",
  "Janavi": "/images/mobile-img/janavi.png",
  "Chashma": "/images/mobile-img/chashma.png",
  "OnCloud9": "/images/mobile-img/cloud9.png",
  "Lily Ann Cabinets": "/images/mobile-img/lilyanncabinets.png",
  "Transform Health": "/images/mobile-img/transformhealth.png",
  "Shaz & Kiks": "/images/mobile-img/shazkiks.png",
  "Ava Cabinetry": "/images/mobile-img/avacabinetry.png",
  "Idus": "/images/mobile-img/idus.png",
};

export function ExperienceShowcase() {
  const { ref, hasBeenInView } = useInViewport<HTMLElement>({
    threshold: 0.2,
    once: true,
  });

  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for "following" feel
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on cursor position relative to center of the image box
    const rotate = (x - mouseX.get()) * 0.1;
    
    mouseX.set(x);
    mouseY.set(y);
    mouseRotate.set(rotate);
  };

  const mouseRotate = useMotionValue(0);
  const springRotate = useSpring(mouseRotate, springConfig);

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-vs-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,217,255,0.03)_0%,_transparent_60%)]" />

      {/* Floating Image Reveal (Desktop Only) */}
      <div className="absolute inset-0 z-20 pointer-events-none hidden lg:block">
        <AnimatePresence>
          {activeBrand && BRAND_IMAGE_MAP[activeBrand] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
              transition={{ duration: 0.4, ease: EASING.expoOut }}
              style={{
                left: springX,
                top: springY,
                rotate: springRotate,
                x: "-50%",
                y: "-50%",
              }}
              className="absolute w-64 aspect-[4/5] overflow-hidden rounded-lg shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10"
            >
              <Image
                src={BRAND_IMAGE_MAP[activeBrand]}
                alt={activeBrand}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 w-full mb-16 relative z-30">
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
              onMouseEnter={() => setActiveBrand(brand)}
              onMouseLeave={() => setActiveBrand(null)}
              className="flex items-center justify-center py-8 px-4 rounded-sm border border-white/[0.06] bg-white/[0.02] hover:border-vs-accent hover:bg-white/[0.05] transition-all duration-300 group cursor-none md:cursor-pointer"
            >
              <span className="font-headline text-xs md:text-sm font-medium tracking-widest uppercase text-white/30 group-hover:text-vs-accent transition-colors duration-300 text-center">
                {brand}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
