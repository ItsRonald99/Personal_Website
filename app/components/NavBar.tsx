"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "./Container";
import DarkModeToggle from "./DarkModeToggle";

const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#interests", label: "Interests" },
  { href: "#education", label: "Education" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const shadow = useTransform(scrollY, [0, 60], [0, 1]);
  const [shadowVal, setShadowVal] = useState(0);

  useEffect(() => {
    return shadow.on("change", (v) => setShadowVal(v));
  }, [shadow]);

  return (
    <header
      className="sticky top-0 z-30 bg-[#F8F4EE]/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200/60 dark:border-stone-800/60 transition-shadow"
      style={{ boxShadow: shadowVal > 0.1 ? "0 2px 16px rgba(0,0,0,0.07)" : "none" }}
    >
      <Container className="flex items-center justify-between h-14">
        <a
          href="#"
          className="font-mono font-bold text-stone-900 dark:text-stone-100 tracking-tight text-base hover:text-amber-600 dark:hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
        >
          ronald.dev
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded px-1"
            >
              {link.label}
            </a>
          ))}
          <DarkModeToggle />
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <DarkModeToggle />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-[#F8F4EE] dark:bg-stone-950 px-6 pb-4 pt-3 flex flex-col gap-3"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-sm text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </motion.nav>
      )}
    </header>
  );
}
