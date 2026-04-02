"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

export type ImpactMetric = { label: string; value: string };

export type ProjectLinks = {
  live?: string;
  github?: string;
};

export type ProjectItem = {
  year: string;
  title: string;
  bullets: string[];
  techTags: string[];
  impact: ImpactMetric[];
  links: ProjectLinks;
  /** Optional screenshot shown in a mockup frame */
  mockupImage?: string;
};

const actionClass =
  "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-card)]";

export default function ProjectCard({
  item,
  index,
}: {
  item: ProjectItem;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const isFirst = index === 0;
  /** First project: larger preview tile */
  const mockupFrameClass = isFirst
    ? "max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px]"
    : "max-w-[200px] sm:max-w-[240px] md:max-w-[280px]";

  return (
    <motion.article
      tabIndex={0}
      aria-label={`Project: ${item.title}`}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group/project relative rounded-2xl border bg-[var(--bg-card)] p-5 outline-none md:p-6
        shadow-[0_4px_24px_-8px_rgba(0,0,0,0.12)]
        transition-[transform,box-shadow,border-color] duration-300 ease-out
        md:hover:-translate-y-2 md:hover:scale-[1.02]
        md:hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.2),0_0_0_1px_rgba(29,185,84,0.22),0_0_32px_-8px_rgba(29,185,84,0.12)]
        md:focus-within:-translate-y-2 md:focus-within:scale-[1.02] md:focus-within:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.2),0_0_0_1px_rgba(29,185,84,0.22)]
        max-md:scale-100 max-md:hover:translate-y-0"
      style={{
        borderColor: "var(--border)",
      }}
    >
      {/* Top-right arrow */}
      <div
        className="pointer-events-none absolute right-4 top-4 z-20 opacity-0 transition-opacity duration-300 text-accent drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]
          md:group-hover/project:opacity-100 md:group-focus-within/project:opacity-100
          max-md:opacity-40"
        aria-hidden
      >
        <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8 lg:gap-10">
        {/* Left: project copy */}
        <div className="min-w-0 flex-1 md:pr-2">
          <div className="pr-8">
            <span className="inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-semibold tracking-wide text-accent">
              {item.year}
            </span>
            <h3
              className="mt-3 text-lg font-bold leading-snug md:text-xl"
              style={{ color: "var(--text-heading)" }}
            >
              {item.title}
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {item.techTags.map((tag, i) => (
                <span
                  key={tag}
                  className="rounded-md border px-2.5 py-1 text-[11px] font-medium transition-transform duration-300 md:text-xs
                    md:group-hover/project:-translate-y-0.5 md:group-focus-within/project:-translate-y-0.5"
                  style={{
                    color: "var(--text-muted)",
                    borderColor: "var(--border)",
                    background: "var(--bg)",
                    transitionDelay: `${i * 35}ms`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            className="mt-4 grid grid-cols-3 gap-2 rounded-xl border p-3 transition-all duration-300 max-md:border-[var(--border)]
              md:border-transparent md:bg-transparent md:opacity-0 md:max-h-0 md:overflow-hidden md:p-0
              md:group-hover/project:border-[var(--border)] md:group-hover/project:bg-[var(--bg)] md:group-hover/project:p-3 md:group-hover/project:opacity-100 md:group-hover/project:max-h-56
              md:group-focus-within/project:border-[var(--border)] md:group-focus-within/project:bg-[var(--bg)] md:group-focus-within/project:p-3 md:group-focus-within/project:opacity-100 md:group-focus-within/project:max-h-56"
            style={{ borderColor: "var(--border)" }}
          >
            {item.impact.map((m, i) => (
              <motion.div
                key={m.label}
                initial={reduceMotion ? false : { opacity: 0.9, y: 3 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="min-w-0 text-center md:text-left"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-accent/90">
                  {m.label}
                </p>
                <p
                  className="mt-0.5 truncate text-xs font-semibold"
                  style={{ color: "var(--text-heading)" }}
                  title={m.value}
                >
                  {m.value}
                </p>
              </motion.div>
            ))}
          </div>

          <div
            className="mt-4 flex flex-wrap gap-2 transition-all duration-300
              max-md:opacity-100
              md:opacity-0 md:max-h-0 md:overflow-hidden md:group-hover/project:opacity-100 md:group-hover/project:max-h-20
              md:group-focus-within/project:opacity-100 md:group-focus-within/project:max-h-20"
          >
            {item.links.live ? (
              <a
                href={item.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className={`${actionClass} bg-accent text-white hover:bg-[var(--color-accent-hover)]`}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live demo
              </a>
            ) : null}
            {item.links.github ? (
              <a
                href={item.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${actionClass} border border-[var(--border)] hover:border-accent/40 hover:text-accent`}
                style={{ color: "var(--text-heading)" }}
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
            ) : null}
          </div>

          <ul className="mt-5 space-y-2.5 border-t border-[var(--border)] pt-5">
            {item.bullets.map((point, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm leading-relaxed text-[var(--text-muted)] transition-colors duration-300 md:group-hover/project:text-[var(--text)] md:group-focus-within/project:text-[var(--text)]"
              >
                <span
                  className="mt-1.5 min-h-[6px] min-w-[6px] shrink-0 rounded-full bg-accent/45 transition-all duration-300
                    md:group-hover/project:bg-accent md:group-hover/project:shadow-[0_0_10px_rgba(29,185,84,0.4)]
                    md:group-focus-within/project:bg-accent"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: square preview (wider for first project) */}
        {item.mockupImage ? (
          <div className="flex w-full shrink-0 justify-center md:w-auto md:max-w-[46%] md:justify-end md:self-start lg:max-w-[44%]">
            <div className="flex w-full flex-col items-center md:items-end">
              <div
                className={`relative aspect-square w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]
                  shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.04)]
                  transition-transform duration-300 ease-out
                  md:group-hover/project:scale-[1.02] md:group-hover/project:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3),0_0_0_1px_rgba(29,185,84,0.12)]
                  ${mockupFrameClass}`}
              >
                <img
                  src={item.mockupImage}
                  alt={`${item.title} preview`}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <p
                className="mt-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]"
                aria-hidden
              >
                Preview
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
