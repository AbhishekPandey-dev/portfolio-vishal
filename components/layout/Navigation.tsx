"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function Navigation() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Basic GSAP shrink on scroll
    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      gsap.to(nav, {
        paddingTop: "1rem",
        paddingBottom: "1rem",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        scrollTrigger: {
          trigger: "body",
          start: "top -50",
          end: "top -100",
          toggleActions: "play none none reverse",
        },
      });
    }, nav);

    return () => ctx.revert();
  }, []);

  const navItems = [
    { label: "WORK", href: "/work" },
    { label: "PROCESS", href: "/process" },
    { label: "ABOUT", href: "/about" },
    { label: "SERVICES", href: "/services" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-xl flex justify-between items-center px-8 py-6 max-w-full mx-auto transition-all duration-300"
    >
      <Link
        href="/"
        className="text-2xl font-black tracking-tighter text-white font-headline hover:opacity-70 transition-opacity"
      >
        VISHAL SINGH
      </Link>

      <div className="hidden md:flex gap-10">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`font-headline uppercase tracking-widest text-sm transition-all duration-300 ${
                isActive
                  ? "text-white border-b-2 border-white pb-1"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <button className="hidden md:block font-headline uppercase tracking-widest text-sm bg-white text-black px-6 py-2 font-bold hover:bg-zinc-200 transition-all duration-300">
        RESUME
      </button>

      {/* Mobile Menu Icon (simplified) */}
      <button className="md:hidden text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>
    </nav>
  );
}
