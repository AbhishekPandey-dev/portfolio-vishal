"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInViewport } from "@/hooks/use-in-viewport";
import { SOCIAL_LINKS, NAV_LINKS } from "@/lib/constants";
import { EASING, DURATION } from "@/lib/animation-config";

// Simple SVG social icons (lucide-react doesn't include brand icons)
function SocialIcon({ label }: { label: string }) {
  const className = "w-4 h-4";
  switch (label) {
    case "GitHub":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "Twitter":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      );
  }
}

export function Footer() {
  const { ref, hasBeenInView } = useInViewport<HTMLElement>({
    threshold: 0.1,
    once: true,
  });

  return (
    <footer
      ref={ref}
      className="w-full py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-vs-container border-t border-white/[0.06]"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: DURATION.normal, ease: EASING.expoOut }}
          >
            <Link
              href="/"
              className="text-2xl font-black tracking-tighter text-white font-headline hover:opacity-70 transition-opacity"
            >
              VISHAL SINGH
            </Link>
            <p className="mt-3 text-white/40 text-sm font-body leading-relaxed max-w-[260px]">
              Full Stack Developer & Creative Director building digital experiences for the next era.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: DURATION.normal, ease: EASING.expoOut, delay: 0.1 }}
          >
            <h4 className="font-label uppercase tracking-[0.3em] text-[11px] text-white/60 mb-5">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 text-sm font-body hover:text-white transition-colors duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-px left-0 w-0 h-px bg-vs-accent group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: DURATION.normal, ease: EASING.expoOut, delay: 0.2 }}
          >
            <h4 className="font-label uppercase tracking-[0.3em] text-[11px] text-white/60 mb-5">
              Connect
            </h4>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => {
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center justify-center w-10 h-10 rounded-sm border border-white/[0.08] text-white/40 hover:text-vs-accent hover:border-vs-accent/30 hover:scale-110 transition-all duration-300"
                  >
                    <SocialIcon label={social.label} />
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Get in Touch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: DURATION.normal, ease: EASING.expoOut, delay: 0.3 }}
          >
            <h4 className="font-label uppercase tracking-[0.3em] text-[11px] text-white/60 mb-5">
              Get in Touch
            </h4>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-black font-headline font-bold uppercase tracking-[0.1em] text-xs hover:bg-vs-accent transition-colors duration-300 rounded-sm"
            >
              Start a Project
            </Link>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-label uppercase tracking-[0.2em] text-[10px] text-white/30">
            © {new Date().getFullYear()} VISHAL SINGH. ALL RIGHTS RESERVED.
          </span>
          <span className="font-label uppercase tracking-[0.2em] text-[10px] text-white/20">
            DESIGNED & BUILT WITH PRECISION
          </span>
        </div>
      </div>
    </footer>
  );
}
