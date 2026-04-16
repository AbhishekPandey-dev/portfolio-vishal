import {
  FloatingIconsHero,
  type IconProps,
} from "@/components/ui/floating-icons-hero-section";

const demoIcons: IconProps[] = [
  // Top Outer Ring
  { id: 1, imageUrl: "REACT.png", alt: "React", className: "top-[5%] left-[5%]" },
  { id: 2, imageUrl: "NODE JS.png", alt: "Node.js", className: "top-[5%] right-[5%]" },
  { id: 3, imageUrl: "TYPESCRIPT.png", alt: "TypeScript", className: "top-[5%] left-[30%]" },
  { id: 4, imageUrl: "MONGO DB.png", alt: "MongoDB", className: "top-[5%] right-[30%]" },
  
  // Side Rails
  { id: 5, imageUrl: "JAVASCRIPT.png", alt: "JavaScript", className: "top-[30%] left-[2%]" },
  { id: 6, imageUrl: "HTML5.png", alt: "HTML5", className: "top-[30%] right-[2%]" },
  { id: 7, imageUrl: "TAILWIND.png", alt: "Tailwind CSS", className: "top-[60%] left-[2%]" },
  { id: 8, imageUrl: "BOOTSTRAP.png", alt: "Bootstrap", className: "top-[60%] right-[2%]" },
  
  // Bottom Outer Ring
  { id: 9, imageUrl: "GITHUB.png", alt: "GitHub", className: "bottom-[5%] left-[5%]" },
  { id: 10, imageUrl: "GIT.png", alt: "Git", className: "bottom-[5%] right-[5%]" },
  { id: 11, imageUrl: "PYTHON.png", alt: "Python", className: "bottom-[5%] left-[30%]" },
  { id: 12, imageUrl: "PHP.png", alt: "PHP", className: "bottom-[5%] right-[30%]" },
  
  // Floating Accents (Extreme edges)
  { id: 13, imageUrl: "SHOPIFY.png", alt: "Shopify", className: "top-[15%] left-[12%]" },
  { id: 14, imageUrl: "WORDPRESS.png", alt: "WordPress", className: "top-[15%] right-[12%]" },
  { id: 15, imageUrl: "JAVA.png", alt: "Java", className: "bottom-[15%] left-[12%]" },
  { id: 16, imageUrl: "REDIS.png", alt: "Redis", className: "bottom-[15%] right-[12%]" },
];

export default function Home() {
  return (
    <FloatingIconsHero
      title="Vishal Singh"
      subtitle={[
        "Full Stack Web Developer",
        "UI/UX Designer",
        "8+ Years Experience",
      ]}
      icons={demoIcons}
      className="bg-black"
    />
  );
}
