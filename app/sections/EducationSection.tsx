"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/app/components/SectionWrapper";
import SectionHeading from "@/app/components/SectionHeading";
import type { Education } from "@/data/content";

interface EducationSectionProps {
  education: Education[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <SectionWrapper id="education">
      <SectionHeading
        label="Background"
        title="Education"
        subtitle="Academic foundation and relevant coursework."
      />
      <div className="space-y-10">
        {education.map((edu, i) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-amber-300 dark:before:bg-amber-700"
          >
            {/* Timeline dot */}
            <div className="absolute left-[-5px] top-1.5 w-3 h-3 rounded-sm bg-amber-400 border-2 border-stone-900 dark:border-stone-100" aria-hidden="true" />

            <div className="rounded-2xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    {edu.degree}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-stone-400 dark:text-stone-500">
                    {edu.location}
                  </p>
                </div>
                <span className="inline-block font-mono text-xs font-bold tracking-wide text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 px-3 py-1 rounded-full self-start mt-1 sm:mt-0 whitespace-nowrap">
                  {edu.period}
                </span>
              </div>

              <p className="text-sm text-stone-500 dark:text-stone-400 mb-5">
                {edu.description}
              </p>

              {edu.courses.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3">
                    Relevant Coursework
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {edu.courses.map((course) => (
                      <div
                        key={course.name}
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
                      >
                        <span className="text-sm text-stone-700 dark:text-stone-300">
                          {course.name}
                        </span>
                        {course.grade && (
                          <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 ml-2">
                            {course.grade}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
