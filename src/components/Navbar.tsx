"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Sun, Moon, Download } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { site } from "@/data/site";

const navLinks = [
  { name: "Work", href: "#work", key: "01" },
  { name: "Approach", href: "#approach", key: "02" },
  { name: "Study", href: "#education", key: "03" },
  { name: "Contact", href: "#contact", key: "04" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={reduceMotion ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.2, 0.7, 0.3, 1] as const }}
      className="fixed top-0 right-0 left-0 z-50"
      style={{
        height: "var(--nav-h)",
        background: scrolled
          ? "color-mix(in srgb, var(--bg) 92%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : undefined,
        borderBottom: scrolled
          ? "var(--rule-hair) solid var(--border)"
          : "var(--rule-hair) solid transparent",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}
    >
      <div className="page-container flex h-full items-center justify-between">
        <a href="#home" className="tap flex items-center gap-2.5">
          <img
            src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
            alt=""
            width={30}
            height={30}
            className="h-[30px] w-[30px] object-contain"
            style={{ borderRadius: "var(--radius)" }}
          />
          <span
            className="font-display text-[1.0625rem] font-semibold tracking-tight"
            style={{ color: "var(--text-heading)" }}
          >
            {site.name}
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="tap group meta-plain gap-1.5 transition-colors"
            >
              <span
                aria-hidden
                className="transition-colors"
                style={{ color: "var(--text-dim)" }}
              >
                {link.key}
              </span>
              <span className="group-hover:text-[var(--accent)] transition-colors">
                {link.name}
              </span>
            </a>
          ))}

          <a
            href={site.resume}
            download
            className="tap meta-plain gap-2 px-3 transition-colors hover:text-[var(--accent)]"
            style={{
              color: "var(--text-heading)",
              border: "var(--rule-hair) solid var(--border-strong)",
              borderRadius: "var(--radius)",
            }}
          >
            <Download className="h-4 w-4" aria-hidden />
            Resume
          </a>

          <button
            onClick={toggle}
            type="button"
            className="p-2 transition-colors hover:text-[var(--accent)]"
            style={{
              color: "var(--text-muted)",
              border: "var(--rule-hair) solid var(--border-strong)",
              borderRadius: "var(--radius)",
            }}
            aria-label={
              theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
            }
          >
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px]" aria-hidden />
            ) : (
              <Moon className="h-[18px] w-[18px]" aria-hidden />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            type="button"
            className="p-2"
            style={{
              color: "var(--text-muted)",
              border: "var(--rule-hair) solid var(--border-strong)",
              borderRadius: "var(--radius)",
            }}
            aria-label={
              theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
            }
          >
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px]" aria-hidden />
            ) : (
              <Moon className="h-[18px] w-[18px]" aria-hidden />
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="p-2"
            style={{
              color: "var(--text-heading)",
              border: "var(--rule-hair) solid var(--border-strong)",
              borderRadius: "var(--radius)",
            }}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-[18px] w-[18px]" aria-hidden />
            ) : (
              <Menu className="h-[18px] w-[18px]" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0.7, 0.3, 1] as const }}
            className="overflow-hidden md:hidden"
            style={{
              background: "var(--bg)",
              borderBottom: "var(--rule-heavy) solid var(--border-ink)",
            }}
          >
            <div className="page-container flex flex-col py-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="meta-plain flex items-center gap-3 py-4"
                  style={{
                    color: "var(--text-heading)",
                    borderTop: "var(--rule-hair) solid var(--border)",
                  }}
                >
                  <span aria-hidden style={{ color: "var(--text-dim)" }}>
                    {link.key}
                  </span>
                  {link.name}
                </a>
              ))}

              <a
                href={site.resume}
                download
                onClick={() => setIsOpen(false)}
                className="meta-plain flex items-center gap-3 py-4"
                style={{
                  color: "var(--accent)",
                  borderTop: "var(--rule-hair) solid var(--border)",
                }}
              >
                <Download className="h-[18px] w-[18px]" aria-hidden />
                Download resume
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}
