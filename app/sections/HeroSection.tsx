"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Container from "@/app/components/Container";
import Button from "@/app/components/Button";
import type { SiteContent } from "@/data/content";

interface HeroSectionProps {
  content: Pick<SiteContent, "name" | "role" | "tagline" | "bio" | "github" | "email">;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center overflow-hidden"
    >
      {/* Subtle gradient blob */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-amber-200/20 dark:bg-amber-900/10 blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none"
      />

      <Container className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-24">
        {/* Left — text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block font-mono text-xs font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400 mb-3">
              Hi, I&apos;m
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-stone-900 dark:text-stone-100 leading-none tracking-tight">
              {content.name}
              <span className="text-amber-500">.</span>
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xl font-mono text-stone-500 dark:text-stone-400"
          >
            {content.role}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-base text-stone-600 dark:text-stone-400 leading-relaxed max-w-md"
          >
            {content.bio}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg italic text-stone-400 dark:text-stone-500 font-light"
          >
            &ldquo;{content.tagline}&rdquo;
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-2">
            <Button href="#projects">View My Work</Button>
            <Button href={`mailto:${content.email}`} variant="outline">
              Get In Touch
            </Button>
            <Button href={content.github} external variant="ghost" className="gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </Button>
          </motion.div>
        </motion.div>

        {/* Right — pixel art illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative w-72 h-72 md:w-80 md:h-80">
            {/* Decorative frame */}
            <div className="absolute inset-0 rounded-2xl border-2 border-stone-900/10 dark:border-stone-100/10 bg-amber-50/60 dark:bg-stone-800/40 shadow-lg overflow-hidden">
              <Image
                src="/images/project-placeholder.svg"
                alt="Pixel art landscape illustration"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Pixel badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 bg-amber-400 border-2 border-stone-900 rounded-lg px-3 py-1.5 font-mono text-xs font-bold text-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]"
            >
              SOFTWARE ENG
            </motion.div>
          </div>
        </motion.div>
      </Container>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-stone-400"
        aria-hidden="true"
      >
        <span className="font-mono text-xs tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
