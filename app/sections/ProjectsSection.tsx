"use client";

import { useState } from "react";
import SectionWrapper from "@/app/components/SectionWrapper";
import SectionHeading from "@/app/components/SectionHeading";
import ProjectCard from "@/app/components/ProjectCard";
import ProjectModal from "@/app/components/ProjectModal";
import type { Project } from "@/data/content";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <SectionWrapper id="projects">
        <SectionHeading
          label="Work"
          title="Projects"
          subtitle="Things I've built."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={setActiveProject}
            />
          ))}
        </div>
      </SectionWrapper>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}
