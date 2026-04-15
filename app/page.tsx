import { HeroSection } from "@/components/sections/HeroSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-32 md:gap-48 pb-0">
      <HeroSection />
      
      {/* Works/Portfolio map to /work */}
      <WorkSection />
      
      {/* Manifesto maps to /about */}
      <AboutSection />
      
      {/* Methodology maps to /process */}
      <ProcessSection />
      
      {/* Contact maps to /contact */}
      <ContactSection />
    </div>
  );
}
