"use client";

import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  external = false,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-mono font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-amber-400 text-stone-900 hover:bg-amber-300 border-2 border-stone-900 shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] hover:shadow-[1px_1px_0px_0px_rgba(28,25,23,1)] hover:translate-x-[2px] hover:translate-y-[2px]",
    outline:
      "border-2 border-stone-900 dark:border-stone-200 text-stone-900 dark:text-stone-100 hover:bg-stone-900 hover:text-stone-50 dark:hover:bg-stone-200 dark:hover:text-stone-900",
    ghost:
      "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
