"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ArrowUpRight, Search } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { LINKS } from "@/data/systems";

const navLinks = [
  { name: "Systems", href: "#projects" },
  { name: "Lab", href: "#lab" },
  { name: "Ask", href: "#ask" },
  { name: "Contact", href: "#contact" },
];

const openPalette = () => window.dispatchEvent(new Event("lab:palette"));

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[52rem] -translate-x-1/2 md:top-5"
    >
      <nav aria-label="Main" className="nav-pill flex items-center justify-between gap-2 py-1.5 pr-1.5 pl-5">
        <a href="#top" className="font-display flex items-center gap-2 text-[17px] font-bold tracking-tight">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden />
          Sabin Pradhan
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.name}>
              <a
                href={l.href}
                className="rounded-full px-3 py-2 text-sm text-[var(--text)] transition-colors hover:text-[var(--accent)]"
              >
                {l.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openPalette}
            className="hidden h-9 items-center gap-2 rounded-full border px-3 text-sm text-[var(--text-muted)] transition-colors hover:border-[var(--accent-line)] hover:text-[var(--ink)] sm:inline-flex"
            style={{ borderColor: "var(--border)" }}
            aria-label="Open command palette"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="kbd !h-5 !min-w-0 !text-[10px]">⌘K</span>
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
            className="hidden h-9 items-center gap-1 rounded-full px-4 text-sm font-semibold md:inline-flex"
            style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          >
            Resume <ArrowUpRight className="h-3.5 w-3.5" />
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

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="nav-panel mt-2 p-2 md:hidden"
          >
            <ul className="grid">
              {navLinks.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    onClick={() => setIsOpen(false)}
                    className="font-display block rounded-xl px-4 py-3 text-lg font-semibold text-[var(--ink)]"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-1 grid grid-cols-2 gap-2 p-1">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  openPalette();
                }}
                className="btn-line justify-center !py-2.5 text-sm"
              >
                <Search className="h-4 w-4" /> Search
              </button>
              <a
                href={LINKS.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="btn-ink justify-center !py-2.5 text-sm"
              >
                Resume <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
