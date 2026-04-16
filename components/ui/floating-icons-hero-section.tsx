"use client";

import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';



// Interface for the props of each individual icon, adapted for Next/Image and PNGs
export interface IconProps {
  id: number;
  imageUrl: string;
  alt: string;
  className: string; // Used for custom positioning of the icon.
}

// Interface for the main hero component's props.
export interface FloatingIconsHeroProps {
  title: string;
  subtitle: string | string[] | React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
  icons: IconProps[];
  className?: string;
}

// A single icon component with its own motion logic
const Icon = ({
  mouseX,
  mouseY,
  iconData,
  index,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  iconData: IconProps;
  index: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Motion values for the icon's position, with spring physics for smooth movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
            Math.pow(mouseY.current - (rect.top + rect.height / 2), 2)
        );

        // If the cursor is close enough, repel the icon
        if (distance < 150) {
          const angle = Math.atan2(
            mouseY.current - (rect.top + rect.height / 2),
            mouseX.current - (rect.left + rect.width / 2)
          );
          // The closer the cursor, the stronger the repulsion
          const force = (1 - distance / 150) * 50;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          // Return to original position when cursor is away
          x.set(0);
          y.set(0);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      key={iconData.id}
      style={{
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn('absolute', iconData.className)}
    >
      {/* Inner wrapper for the continuous floating animation */}
      <motion.div
        className="flex items-center justify-center w-16 h-16 md:w-24 md:h-24"
        animate={{
          y: [0, -8, 0, 8, 0],
          x: [0, 6, 0, -6, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <div className="relative w-full h-full opacity-100">
           <Image
             src={`/assets/tech-icons/${iconData.imageUrl}`}
             alt={iconData.alt}
             fill
             className="object-contain"
           />
        </div>
      </motion.div>
    </motion.div>
  );
};

const FloatingIconsHero = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & FloatingIconsHeroProps
>(({ className, title, subtitle, ctaText, ctaHref, icons, ...props }, ref) => {
  // Refs to track the raw mouse position
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    mouseX.current = event.clientX;
    mouseY.current = event.clientY;
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        'relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-background py-20',
        className
      )}
      {...props}
    >
      {/* Container for the background floating icons */}
      <div className="absolute inset-0 w-full h-full max-w-[1400px] mx-auto opacity-80">
        {icons.map((iconData, index) => (
          <Icon
            key={iconData.id}
            mouseX={mouseX}
            mouseY={mouseY}
            iconData={iconData}
            index={index}
          />
        ))}
      </div>

      {/* Container for the foreground content */}
      <div className="relative z-10 text-center px-4 md:px-0 pointer-events-none">
        <h1 className="text-[12vw] md:text-[14vw] leading-[0.85] font-black uppercase tracking-tighter text-white font-headline flex flex-col items-center">
          {!mounted ? title : title.split(" ").map((word, i) => (
            <span key={i}>{word}</span>
          ))}
        </h1>
        <div className="mt-6 flex justify-center pointer-events-auto">
          {typeof subtitle === 'string' || Array.isArray(subtitle) ? (
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 max-w-4xl px-4 text-center">
              {Array.isArray(subtitle) ? (
                subtitle.map((item, i) => (
                  <React.Fragment key={i}>
                    <span className="font-headline uppercase tracking-[0.2em] text-white/80 text-sm md:text-base font-bold whitespace-nowrap">
                      {item}
                    </span>
                    {i < subtitle.length - 1 && (
                      <span className="text-white/20 text-base hidden md:inline">•</span>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <span className="font-headline uppercase tracking-[0.2em] text-white/80 text-sm md:text-base font-bold">
                  {subtitle}
                </span>
              )}
            </div>
          ) : (
            <div className="font-headline uppercase tracking-[0.2em] text-sm md:text-base font-bold">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
);

FloatingIconsHero.displayName = 'FloatingIconsHero';

export { FloatingIconsHero };
