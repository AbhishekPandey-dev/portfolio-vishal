"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useInViewport } from "@/hooks/use-in-viewport";
import { CLIENT_BRANDS } from "@/lib/constants";
import { EASING, DURATION } from "@/lib/animation-config";
import Image from "next/image";
import { useState, useRef, useMemo } from "react";

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

interface MarqueeRowProps {
  items: string[];
  direction: "left" | "right";
  onHover: (brand: string | null) => void;
}

function MarqueeRow({ items, direction, onHover }: MarqueeRowProps) {
  const scrollValue = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className="relative flex overflow-hidden whitespace-nowrap border-y border-white/5 py-8 md:py-12 group/row select-none">
      <motion.div
        animate={{ x: scrollValue }}
        transition={{
          duration: 80, // Slower, highly elegant crawl
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-12 md:gap-24 px-6 md:px-12 items-center"
      >
        {/* Double items for seamless loop */}
        {[...items, ...items].map((brand, i) => (
          <div
            key={`${brand}-${i}`}
            onMouseEnter={() => onHover(brand)}
            onMouseLeave={() => onHover(null)}
            className="group/item flex items-center gap-4 cursor-none"
          >
            <span className="text-display-md md:text-display-xl font-headline font-black uppercase tracking-tighter transition-all duration-500 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.15)] group-hover/item:text-white group-hover/item:[-webkit-text-stroke:1px_white] group-hover/row:opacity-30 group-hover/item:!opacity-100">
              {brand}
            </span>
            <span className="w-2 h-2 rounded-full bg-vs-accent/20" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function ExperienceShowcase() {
  const { ref, hasBeenInView } = useInViewport<HTMLElement>({
    threshold: 0.1,
    once: true,
  });

  const [activeBrand, setActiveBrand] = useState<string | null>(null);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseRotate = useMotionValue(0);

  // Spring physics for "following" feel
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const springRotate = useSpring(mouseRotate, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotate = (x - mouseX.get()) * 0.1;
    
    mouseX.set(x);
    mouseY.set(y);
    mouseRotate.set(rotate);
  };

  // Split brands into two rows
  const row1 = useMemo(() => CLIENT_BRANDS.slice(0, Math.ceil(CLIENT_BRANDS.length / 2)), []);
  const row2 = useMemo(() => CLIENT_BRANDS.slice(Math.ceil(CLIENT_BRANDS.length / 2)), []);

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center py-24 md:py-32 overflow-hidden bg-vs-surface"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,217,255,0.03)_0%,_transparent_60%)] pointer-events-none" />
      
      {/* Ambient Dimming Overlay (Triggers on Hover) */}
      <div 
        className={`absolute inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-all duration-700 pointer-events-none ${
          activeBrand ? "opacity-100" : "opacity-0"
        }`} 
      />

      {/* Floating Image Reveal (Desktop Only) */}
      <div className="absolute inset-0 z-50 pointer-events-none hidden lg:block">
        <AnimatePresence mode="wait">
          {activeBrand && BRAND_IMAGE_MAP[activeBrand] && (
            <motion.div
              key={activeBrand}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              style={{
                left: springX,
                top: springY,
                rotate: springRotate,
                x: "-50%",
                y: "-50%",
              }}
              className="absolute w-[320px] aspect-[16/10] overflow-hidden rounded-sm shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 bg-black z-50"
            >
              <Image
                src={BRAND_IMAGE_MAP[activeBrand]}
                alt={activeBrand}
                fill
                className="object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] scale-110 hover:scale-100"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              
              {/* Premium Corner Accents */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/40" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/40" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/40" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/40" />

              {/* Data Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end font-label text-[10px] tracking-widest text-white uppercase overflow-hidden">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="font-bold text-white/90"
                >
                  {activeBrand}
                </motion.div>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="text-vs-accent"
                >
                  [ VIEW ]
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Editorial Header */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={hasBeenInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: DURATION.normal, ease: EASING.expoOut }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="font-label uppercase tracking-[0.4em] text-[10px] text-vs-accent block mb-4">
              EXPERIENCE INDEX
            </span>
            <h2 className="text-display-md md:text-display-lg font-headline font-black text-white leading-none tracking-tighter">
              BEYOND <br /> <span className="text-vs-accent">BOUNDARIES</span>
            </h2>
          </div>
          <p className="max-w-[400px] text-vs-text-secondary text-sm md:text-base font-body opacity-60">
            Partnering with visionary brands to redefine digital structural honesty and cinematic experiences.
          </p>
        </motion.div>
      </div>

      {/* Kinetic Marquee Rows */}
      <div className="relative z-10 flex flex-col w-screen">
        <MarqueeRow items={row1} direction="left" onHover={setActiveBrand} />
        <MarqueeRow items={row2} direction="right" onHover={setActiveBrand} />
      </div>
    </section>
  );
}
