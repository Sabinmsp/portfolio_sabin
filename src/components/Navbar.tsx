"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, X, Sun, Moon, ArrowUpRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { name: "Home", href: "#top" },
  { name: "About", href: "#about" },
  { name: "Ask me", href: "#ask" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#journey" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
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
      transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[340px] -translate-x-1/2 md:top-6"
    >
      <nav
        aria-label="Main"
        className="nav-pill flex items-center justify-between py-2 pr-2 pl-4"
      >
        <motion.a
          href="#top"
          className="font-display inline-block text-lg font-bold tracking-tight"
          whileHover={{ rotate: [0, -12, 9, -5, 0], scale: 1.06 }}
          transition={{ duration: 0.6 }}
        >
          Sabin
        </motion.a>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggle}
            className="grid h-9 w-9 place-items-center rounded-lg opacity-80 transition-opacity hover:opacity-100"
            aria-label={
              theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
            }
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setIsOpen((o) => !o)}
            className="nav-pill__menu-btn"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <MoreHorizontal className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="nav-pill mt-2 p-2"
          >
            <ul className="grid">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-display block rounded-lg px-3 py-2.5 text-lg font-semibold transition-opacity hover:opacity-70"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/Sabin_Pradhan-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="font-display mt-1 flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold"
              style={{ background: "var(--on-ink)", color: "var(--ink)" }}
            >
              Resume
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
