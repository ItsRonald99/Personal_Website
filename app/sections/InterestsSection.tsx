"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/app/components/SectionWrapper";
import SectionHeading from "@/app/components/SectionHeading";
import type { Interest } from "@/data/content";

interface InterestsSectionProps {
  interests: Interest[];
}

export default function InterestsSection({ interests }: InterestsSectionProps) {
  return (
    <SectionWrapper id="interests" className="bg-amber-50/50 dark:bg-stone-900/50">
      <SectionHeading
        label="Beyond code"
        title="Interests"
        subtitle="Things that keep me curious outside of engineering."
      />
      <div className="flex flex-wrap gap-3">
        {interests.map((interest, i) => (
          <motion.div
            key={interest.id}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            whileHover={{ scale: 1.08, y: -2 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 shadow-sm hover:border-amber-400 hover:shadow-md transition-all cursor-default select-none"
          >
            <span className="text-xl" aria-hidden="true">{interest.icon}</span>
            <span className="font-mono text-sm font-medium text-stone-700 dark:text-stone-300">
              {interest.label}
            </span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
