"use client";

import { Heart } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="relative py-8 md:py-10" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2.5 group">
            <img
              src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
              alt="S"
              className="w-7 h-7 object-contain rounded-xl transition-transform group-hover:scale-110"
            />
            <span className="text-lg font-bold text-accent">Sabin</span>
          </a>
          <p className="text-sm flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
            Built with <Heart className="w-3.5 h-3.5 text-red-400" /> by Sabin Pradhan &copy; {new Date().getFullYear()}
          </p>
          <div className="flex gap-4">
            {[
              { label: "GitHub", href: "https://github.com/Sabinmsp" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/sabin-pradhan-652b333b6/" },
            ].map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent transition-colors" style={{ color: "var(--text-muted)" }}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
