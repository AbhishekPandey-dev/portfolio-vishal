"use client";

import { motion } from "framer-motion";
import { Zap, ShoppingBag, Gauge, Palette, type LucideIcon } from "lucide-react";
import { EASING, DURATION, STAGGER } from "@/lib/animation-config";

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  ShoppingBag,
  Gauge,
  Palette,
};

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
  isInView: boolean;
}

export function ServiceCard({
  icon,
  title,
  description,
  index,
  isInView,
}: ServiceCardProps) {
  const Icon = ICON_MAP[icon] || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: DURATION.normal,
        ease: EASING.expoOut,
        delay: index * STAGGER.normal,
      }}
      className="group relative p-8 md:p-10 rounded-sm border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-vs-accent/20 transition-all duration-500 cursor-default"
    >
      {/* Icon */}
      <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-sm bg-vs-accent-muted group-hover:bg-vs-accent/20 transition-colors duration-500">
        <Icon
          className="w-6 h-6 text-vs-accent group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
          strokeWidth={1.5}
        />
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-headline font-bold text-white mb-4 group-hover:text-vs-accent transition-colors duration-500">
        {title}
      </h3>

      {/* Description */}
      <p className="text-vs-text-secondary text-sm md:text-base leading-relaxed font-body">
        {description}
      </p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-vs-accent/50 to-transparent transition-all duration-700" />
    </motion.div>
  );
}
