"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Work", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled ? "border-b backdrop-blur-md" : ""
      }`}
      style={
        scrolled
          ? {
              background: "color-mix(in srgb, var(--bg) 88%, transparent)",
              borderColor: "var(--border)",
            }
          : undefined
      }
    >
      <div className="page-container flex items-center justify-between py-3.5 md:py-4">
        <a href="#home" className="flex items-center gap-2.5 group">
          <img
            src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
            alt="S"
            className="h-7 w-7 rounded object-contain"
          />
          <span
            className="font-display text-[15px] font-semibold tracking-tight"
            style={{ color: "var(--text-heading)" }}
          >
            Sabin
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[13px] transition-colors hover:text-[var(--text-heading)]"
              style={{ color: "var(--text-muted)" }}
            >
              {link.name}
            </a>
          ))}

          <button
            onClick={toggle}
            className="p-1.5 transition-colors hover:text-accent"
            style={{
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
              borderRadius: 3,
            }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )}
          </button>

          <a
            href="#contact"
            className="bg-accent px-3.5 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-accent-hover"
            style={{ borderRadius: 3 }}
          >
            Hire me
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            className="p-1.5"
            style={{
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
              borderRadius: 3,
            }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: "var(--text-muted)" }}
            aria-label="Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b md:hidden"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <div className="page-container flex flex-col gap-1 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-1 py-2 text-sm"
                  style={{ color: "var(--text)" }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}
