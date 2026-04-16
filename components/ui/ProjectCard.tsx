"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInViewport } from "@/hooks/use-in-viewport";
import { EASING, DURATION } from "@/lib/animation-config";
import type { ProjectData } from "@/lib/constants";

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { ref, hasBeenInView } = useInViewport<HTMLDivElement>({
    threshold: 0.2,
    once: true,
  });

  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-20"
    >
      <div
        className={`w-full max-w-[1400px] mx-auto flex flex-col ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } gap-8 lg:gap-16 items-center`}
      >
        {/* Project Image / Video */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -80 : 80 }}
          animate={
            hasBeenInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: isEven ? -80 : 80 }
          }
          transition={{
            duration: DURATION.entrance,
            ease: EASING.expoOut,
          }}
          className="w-full lg:w-[60%] relative aspect-[16/10] overflow-hidden rounded-sm bg-vs-surface group"
        >
          {project.media.type === "video" ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            >
              {project.media.webm && (
                <source src={project.media.webm} type="video/webm" />
              )}
              {project.media.mp4 && (
                <source src={project.media.mp4} type="video/mp4" />
              )}
            </video>
          ) : (
            <Image
              src={project.media.src || ""}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          )}

          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>

        {/* Project Metadata */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 80 : -80 }}
          animate={
            hasBeenInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: isEven ? 80 : -80 }
          }
          transition={{
            duration: DURATION.entrance,
            ease: EASING.expoOut,
            delay: 0.15,
          }}
          className="w-full lg:w-[40%] flex flex-col gap-6"
        >
          {/* Category label */}
          <span className="font-label uppercase tracking-[0.3em] text-[11px] text-vs-accent">
            {project.categories.slice(0, 2).join(" · ")}
          </span>

          {/* Title */}
          <h3 className="text-display-lg font-headline font-bold text-white tracking-tight">
            {project.title}
          </h3>

          {/* Description */}
          {project.description && (
            <p className="text-vs-text-secondary text-base md:text-lg leading-relaxed font-body">
              {project.description}
            </p>
          )}

          {/* Metrics */}
          {project.metrics && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-vs-accent" />
              <span className="font-label uppercase tracking-[0.15em] text-[12px] text-vs-accent">
                {project.metrics}
              </span>
            </div>
          )}

          {/* Tech stack */}
          <p className="text-white/30 text-sm font-body leading-relaxed">
            {project.tags}
          </p>

          {/* CTA */}
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-3 mt-2 w-fit"
          >
            <span className="font-headline uppercase tracking-[0.15em] text-sm text-white font-medium group-hover/btn:text-vs-accent transition-colors duration-300">
              View Project
            </span>
            <span className="w-8 h-px bg-white group-hover/btn:w-12 group-hover/btn:bg-vs-accent transition-all duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
