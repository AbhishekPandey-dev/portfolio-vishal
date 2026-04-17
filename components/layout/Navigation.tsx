"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import Image from "next/image";

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isAtFooter, setIsAtFooter] = useState(false);

  // Detect Footer to hide Nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtFooter(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    const footer = document.querySelector("#footer");
    if (footer) observer.observe(footer);

    return () => {
      if (footer) observer.unobserve(footer);
    };
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Serif tags for a brutalist aesthetic
  const asymmetricTags = [
    "Start here",
    "What we do",
    "Who am I?",
    "Expertise",
    "Get in touch",
  ];

  return (
    <>
      {/* Permanent Header Bar */}
      <AnimatePresence>
        {!isAtFooter && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="fixed top-0 w-full z-[60] flex justify-between items-center px-6 py-6 md:px-12 pointer-events-none mix-blend-difference"
          >
            <div className="pointer-events-auto">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-lg md:text-xl font-bold font-headline text-white uppercase tracking-widest hover:opacity-70 transition-opacity"
              >
                VISHAL SINGH
              </Link>
            </div>
            <div className="pointer-events-auto">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white text-base font-headline font-bold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
              >
                {isOpen ? "CLOSE" : "MENU"}
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[50] bg-[#050505] text-white px-6 py-6 md:px-12 flex flex-col overflow-hidden"
          >
            {/* Animated Grid Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.15,
                backgroundPosition: ["0px 0px", "60px 60px"],
              }}
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
              transition={{
                opacity: { duration: 1, delay: 0.5 },
                backgroundPosition: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            />

            {/* Glowing Vignette */}
            <div className="absolute inset-0 pointer-events-none z-0 bg-radial-gradient from-transparent via-transparent to-black" />

            {/* Visual Gimmick Feature - floating showcase (desktop only) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 hidden lg:flex items-center gap-6 opacity-30 select-none">
              <span className="text-[15vw] font-serif italic text-white font-light">
                * (
              </span>
              <div className="w-[12vw] aspect-[3/4] relative overflow-hidden rounded-md grayscale contrast-125 mx-2">
                <Image
                  src="/images/nappadori.png"
                  alt="Showreel"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[15vw] font-serif italic text-white font-light">
                )
              </span>
            </div>

            {/* Middle Section: Menu Links */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full">
              <div className="flex flex-col items-center space-y-2 md:space-y-4">
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.href;

                  return (
                    <div
                      key={link.href}
                      className="relative group overflow-hidden cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      {/* Asymmetric Serif Tags (Desktop) */}
                      <span className="absolute -left-16 md:-left-24 top-1/2 -translate-y-1/2 hidden md:block font-serif italic text-xs md:text-sm text-white/40 group-hover:text-white/80 transition-colors duration-300 pointer-events-none">
                        {i % 2 === 0 ? asymmetricTags[i] : ""}
                      </span>
                      <span className="absolute -right-16 md:-right-24 top-1/2 -translate-y-1/2 hidden md:block font-serif italic text-xs md:text-sm text-white/40 group-hover:text-white/80 transition-colors duration-300 pointer-events-none">
                        {i % 2 !== 0 ? asymmetricTags[i] : ""}
                      </span>

                      {/* Main Link Wrapper - Double Text Hover Animation */}
                      <Link
                        href={link.href}
                        className="block relative overflow-hidden"
                      >
                        {/* Static/Initial Text (slides up and disappears on hover) */}
                        <div
                          className={`font-headline font-black text-[14vw] md:text-[9vw] uppercase tracking-tighter leading-[0.8] pb-2 transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full ${
                            isActive ? "text-vs-accent" : "text-white"
                          }`}
                        >
                          {link.label}
                        </div>
                        {/* Hover Text (slides up from below to replace) */}
                        <div
                          className={`absolute top-0 left-0 w-full font-headline font-black text-[14vw] md:text-[9vw] uppercase tracking-tighter leading-[0.8] pb-2 translate-y-full transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:translate-y-0 text-center ${
                            isActive ? "text-white" : "text-vs-accent"
                          }`}
                        >
                          {link.label}
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
