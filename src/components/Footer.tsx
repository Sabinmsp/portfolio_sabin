"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { LINKS } from "@/data/systems";

const explore = [
  { name: "Projects", href: "#projects" },
  { name: "Lab", href: "#lab" },
  { name: "Ask me", href: "#ask" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-[var(--border)]">
      <div className="page-container grid gap-10 pt-16 md:grid-cols-3">
        <div>
          <p className="label-mono">Get in touch</p>
          <a
            href={`mailto:${LINKS.email}`}
            className="mt-3 inline-flex items-center gap-1.5 text-lg font-semibold text-[var(--ink)] hover:text-[var(--accent)]"
          >
            {LINKS.email} <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div>
          <p className="label-mono">Explore</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {explore.map((l) => (
              <li key={l.name}>
                <a href={l.href} className="nav-link">
                  <span className="nav-link__roll" data-text={l.name}>
                    {l.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <div className="flex gap-6">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="nav-link">
              <span className="nav-link__roll" data-text="GitHub">GitHub</span>
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="nav-link">
              <span className="nav-link__roll" data-text="LinkedIn">LinkedIn</span>
            </a>
          </div>
          <a href="#top" className="muted mt-2 inline-flex items-center gap-1.5 text-sm hover:text-[var(--ink)]">
            Back to top <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Giant wordmark that rises into view */}
      <motion.p
        aria-hidden
        className="footer-wordmark"
        initial={{ y: "40%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        Sabin Pradhan
      </motion.p>
      <p className="page-container muted pb-6 text-xs">
        © {new Date().getFullYear()} Sabin Pradhan · Darwin, NT
      </p>
    </footer>
  );
}
