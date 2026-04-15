import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  
  // Custom default easing for the Cinematic look
  gsap.defaults({
    ease: "power2.out",
    duration: 0.8
  });
}

export { gsap, ScrollTrigger, useGSAP };
