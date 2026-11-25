"use client";

import SplitText from "./SplitText";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { LINKS } from "@/data/systems";

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-[var(--border)]">
      <div className="page-container grid gap-10 pt-16 md:grid-cols-2">
        <div>
          <p className="label-mono">Get in touch</p>
          <a
            href={`mailto:${LINKS.email}`}
            className="mt-3 inline-flex items-center gap-1.5 text-lg font-semibold text-[var(--ink)] hover:text-[var(--accent)]"
          >
            {LINKS.email} <ArrowUpRight className="h-4 w-4" />
          </a>
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
      <p className="footer-wordmark">
        <SplitText text="Sabin Pradhan" stagger={0.045} />
      </p>
      <p className="page-container muted pb-6 text-xs">
        © {new Date().getFullYear()} Sabin Pradhan · Darwin, NT
      </p>
    </footer>
  );
}
