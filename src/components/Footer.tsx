"use client";

import { useTheme } from "./ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="rule-top py-10 md:py-12">
      <div className="page-container flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <a href="#home" className="flex items-center gap-2.5">
          <img
            src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
            alt=""
            width={26}
            height={26}
            className="h-[26px] w-[26px] object-contain"
            style={{ borderRadius: "var(--radius)" }}
          />
          <span
            className="font-display text-[1.0625rem] font-semibold"
            style={{ color: "var(--text-heading)" }}
          >
            Sabin Pradhan
          </span>
        </a>

        <ul className="flex flex-wrap gap-x-7 gap-y-3">
          {[
            { label: "GitHub", href: "https://github.com/Sabinmsp" },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/sabin-pradhan-652b333b6/",
            },
          ].map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-rule meta-plain"
              >
                {link.label}
                <span className="sr-only">, opens in a new tab</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="meta-plain" style={{ color: "var(--text-dim)" }}>
          © {new Date().getFullYear()} Sabin Pradhan
        </p>
      </div>
    </footer>
  );
}
