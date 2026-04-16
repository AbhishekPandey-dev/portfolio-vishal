"use client";

import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="py-32 px-8 flex flex-col items-center min-h-screen justify-center pb-32">
      <div className="max-w-4xl w-full">
        <SectionLabel>Manifesto</SectionLabel>
        
        <RevealText>
          <p className="font-headline text-3xl md:text-5xl lg:text-6xl font-light leading-tight text-white mb-20 tracking-tighter">
             I build <span className="font-bold italic">cinematic</span> digital experiences that live at the intersection of raw performance and editorial design. My process is rooted in architectural honesty and visual impact.
          </p>
        </RevealText>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-12">
          <div>
            <h4 className="font-headline uppercase tracking-widest text-xs mb-6 text-white/60">Capabilities</h4>
            <ul className="space-y-4 font-headline uppercase text-sm tracking-widest text-white/80">
              <li className="flex items-center gap-4"><span className="w-2 h-2 bg-white"></span>React / Next.js Development</li>
              <li className="flex items-center gap-4"><span className="w-2 h-2 bg-white"></span>Tailwind / Motion Design</li>
              <li className="flex items-center gap-4"><span className="w-2 h-2 bg-white"></span>Shopify Custom Liquid</li>
              <li className="flex items-center gap-4"><span className="w-2 h-2 bg-white"></span>WordPress Architecture</li>
            </ul>
          </div>
          
          <div className="flex flex-col justify-end">
            <RevealText delay={0.2}>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                Based in the void, working globally. With nearly a decade of experience, I’ve refined the art of translating complex business needs into simple, powerful web interfaces.
              </p>
            </RevealText>
            
            <a href="/contact" className="inline-flex items-center gap-4 font-headline uppercase tracking-[0.3em] text-xs hover:gap-8 transition-all duration-500 ease-cinematic text-white group">
              Let&apos;s connect 
              <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
