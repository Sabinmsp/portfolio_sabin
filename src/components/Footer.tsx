"use client";

import { useTheme } from "./ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className="relative py-6 md:py-8"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="page-container flex flex-col items-center justify-between gap-3 sm:flex-row">
        <a href="#home" className="flex items-center gap-2">
          <img
            src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
            alt="S"
            className="h-6 w-6 rounded object-contain"
          />
          <span
            className="font-display text-sm font-semibold"
            style={{ color: "var(--text-heading)" }}
          >
            Sabin
          </span>
        </a>
        <p className="label-mono" style={{ color: "var(--text-faint)" }}>
          © {new Date().getFullYear()} Sabin Pradhan
        </p>
        <div className="flex gap-4">
          {[
            { label: "GitHub", href: "https://github.com/Sabinmsp" },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/sabin-pradhan-652b333b6/",
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono transition-colors hover:text-accent"
              style={{ color: "var(--text-muted)" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
