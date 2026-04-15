"use client";

import { RevealText } from "../ui/RevealText";

export function ContactSection() {
  return (
    <section className="bg-white text-black py-40 px-8 min-h-[70vh] flex flex-col justify-center">
      <div className="max-w-[1400px] mx-auto text-center w-full">
        <RevealText>
          <h2 className="text-[clamp(4rem,12vw,14rem)] font-black uppercase mb-12 font-headline leading-[0.85] tracking-tighter cursor-crosshair hover:italic transition-all duration-700">
            LET&apos;S TALK.
          </h2>
        </RevealText>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 font-headline uppercase tracking-[0.2em] text-lg font-bold">
          <a href="mailto:vishal@pixelforge.in" className="hover:line-through transition-all duration-300">
            vishal@pixelforge.in
          </a>
          <span className="hidden md:block w-2 h-2 bg-black"></span>
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="hover:line-through transition-all duration-300">
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
