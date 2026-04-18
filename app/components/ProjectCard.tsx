"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { Project, ProjectMediaItem } from "@/data/content";
import MediaCarousel from "@/app/components/MediaCarousel";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  index: number;
}

function resolveMedia(project: Project): ProjectMediaItem[] {
  if (project.media && project.media.length > 0) return project.media;
  const fallback: ProjectMediaItem[] = [];
  if (project.imageUrl) fallback.push({ type: "image", src: project.imageUrl });
  if (project.youtubeId) fallback.push({ type: "youtube", id: project.youtubeId });
  return fallback;
}

export default function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const media = useMemo(() => resolveMedia(project), [project]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-2xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 overflow-hidden cursor-pointer shadow-sm hover:shadow-lg hover:border-amber-400 transition-all duration-300"
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(project);
        }
      }}
    >
      {/* Media carousel */}
      {media.length > 0 && (
        <MediaCarousel items={media} title={project.title} />
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer link hint */}
        <div className="flex items-center gap-1 text-xs font-mono text-amber-600 dark:text-amber-400 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>View details</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.article>
  );
}
