'use client'

import { FloatingIconsHero, type IconProps } from "@/components/ui/floating-icons-hero-section";

const demoIcons: IconProps[] = [
  // Total 16 unique icons based on public/assets/tech-icons
  { id: 1, imageUrl: "REACT.png", alt: "React", className: "top-[10%] left-[10%]" },
  { id: 2, imageUrl: "NODE JS.png", alt: "Node.js", className: "top-[20%] right-[8%]" },
  { id: 3, imageUrl: "TYPESCRIPT.png", alt: "TypeScript", className: "top-[80%] left-[10%]" },
  { id: 4, imageUrl: "MONGO DB.png", alt: "MongoDB", className: "bottom-[10%] right-[10%]" },
  { id: 5, imageUrl: "JAVASCRIPT.png", alt: "JavaScript", className: "top-[5%] left-[30%]" },
  { id: 6, imageUrl: "HTML5.png", alt: "HTML5", className: "top-[5%] right-[30%]" },
  { id: 7, imageUrl: "TAILWIND.png", alt: "Tailwind CSS", className: "bottom-[8%] left-[25%]" },
  { id: 8, imageUrl: "BOOTSTRAP.png", alt: "Bootstrap", className: "top-[40%] left-[15%]" },
  { id: 9, imageUrl: "GITHUB.png", alt: "GitHub", className: "top-[75%] right-[25%]" },
  { id: 10, imageUrl: "GIT.png", alt: "Git", className: "top-[90%] left-[70%]" },
  { id: 11, imageUrl: "PYTHON.png", alt: "Python", className: "top-[50%] right-[5%]" },
  { id: 12, imageUrl: "PHP.png", alt: "PHP", className: "top-[55%] left-[5%]" },
  { id: 13, imageUrl: "SHOPIFY.png", alt: "Shopify", className: "top-[5%] left-[55%]" },
  { id: 14, imageUrl: "WORDPRESS.png", alt: "WordPress", className: "bottom-[5%] right-[45%]" },
  { id: 15, imageUrl: "JAVA.png", alt: "Java", className: "top-[25%] right-[20%]" },
  { id: 16, imageUrl: "REDIS.png", alt: "Redis", className: "top-[60%] left-[30%]" },
];

export function HeroSection() {
  return (
    <FloatingIconsHero
      title="Vishal Singh"
      subtitle="Full Stack Web Developer • UI/UX Designer • 8+ Years Experience"
      icons={demoIcons}
      className="bg-black"
    />
  )
}
