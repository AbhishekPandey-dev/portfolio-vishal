"use client";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { SELECTED_PROJECTS } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function SelectedWork() {
  return (
    <div className="relative">
      {/* Section label */}
      <div className="flex justify-center pt-20 pb-0">
        <SectionLabel>SELECTED WORK</SectionLabel>
      </div>

      {/* Project cards — each is ~100vh */}
      {SELECTED_PROJECTS.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} />
      ))}
    </div>
  );
}
