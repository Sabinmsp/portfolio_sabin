"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Search } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { LINKS } from "@/data/systems";

const navLinks = [
  { name: "About", href: "#top" },
  { name: "Projects", href: "#projects" },
  { name: "Lab", href: "#lab" },
  { name: "Ask me", href: "#ask" },
  { name: "Contact", href: "#contact" },
];

const openPalette = () => window.dispatchEvent(new Event("lab:palette"));

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
    <motion.header
      ref={ref}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`nav-bar fixed inset-x-0 top-0 z-50 ${scrolled ? "nav-bar--scrolled" : ""}`}
    >
      <nav aria-label="Main" className="page-container flex h-16 items-center justify-between gap-6 md:h-20">
        <a href="#top" className="nav-link !text-[var(--ink)]">
          Sabin<span className="accent">.</span>
        </a>

        <ul className="hidden flex-1 items-center justify-evenly md:flex">
          {navLinks.map((l) => (
            <li key={l.name}>
              <a href={l.href} className="nav-link">
                <span className="nav-link__roll" data-text={l.name}>
                  {l.name}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openPalette}
            className="grid h-9 w-9 place-items-center rounded-full text-[var(--text-muted)] transition-colors hover:text-[var(--ink)]"
            aria-label="Open command palette (Ctrl or Cmd + K)"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            onClick={toggle}
            className="grid h-9 w-9 place-items-center rounded-full text-[var(--text-muted)] transition-colors hover:text-[var(--ink)]"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-gradient ml-2 hidden !px-4 !py-2 !text-[11px] md:inline-flex"
          >
            Resume
          </a>
          <button
            onClick={() => setIsOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

    </motion.header>

      {/* Full-screen menu on phones */}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col justify-between bg-[var(--bg)] px-5 pt-6 pb-10 md:hidden"
          >
            <ul>
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <a href={l.href} onClick={() => setIsOpen(false)} className="mega-title block py-1 !text-[13vw]">
                    {l.name}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" className="pill-gradient">
                Resume
              </a>
              <button
                type="button"
                className="btn-line"
                onClick={() => {
                  setIsOpen(false);
                  openPalette();
                }}
              >
                <Search className="h-4 w-4" /> Search
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
