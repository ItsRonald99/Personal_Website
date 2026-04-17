"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Container from "./Container";

interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  withContainer?: boolean;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function SectionWrapper({
  children,
  id,
  className = "",
  withContainer = true,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={`py-20 ${className}`}
    >
      {withContainer ? <Container>{children}</Container> : children}
    </motion.section>
  );
}
