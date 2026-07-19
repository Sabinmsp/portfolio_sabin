"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export type ImpactMetric = { label: string; value: string };

export type ProjectLinks = {
  live?: string;
  github?: string;
};

export type ProjectItem = {
  year: string;
  title: string;
  bullets: string[];
  /** Engineering stack — rendered as mono labels */
  techTags: string[];
  impact: ImpactMetric[];
  links: ProjectLinks;
  mockupImage?: string;
  mockupUrl?: string;
  /** Placeholder JSON / API snippet — replace with real project output */
  systemOutput?: string;
};

export default function ProjectCard({
  item,
  index,
}: {
  item: ProjectItem;
  index: number;
}) {
  const reverse = index % 2 === 1;

  return (
    <motion.article
      aria-label={`Project: ${item.title}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="border-t py-10 first:border-t-0 first:pt-0 last:pb-0 md:py-12"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className={`flex flex-col gap-8 lg:items-start lg:gap-12 ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        {/* Screenshot frame */}
        {item.mockupImage ? (
          <div className="w-full shrink-0 lg:w-[48%]">
            <div className="browser-frame">
              <div className="browser-frame__bar">
                <span className="browser-frame__dot" />
                <span className="browser-frame__dot" />
                <span className="browser-frame__dot" />
                <span className="browser-frame__url">
                  {item.mockupUrl ?? item.title.toLowerCase().replace(/\s+/g, "-")}
                </span>
              </div>
              <div className="browser-frame__body">
                <img
                  src={item.mockupImage}
                  alt={`${item.title} screenshot`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        ) : null}

        {/* Copy */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="heading text-xl md:text-2xl">{item.title}</h3>
            <span className="label-mono">{item.year}</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.techTags.map((tag) => (
              <span key={tag} className="stack-label">
                {tag}
              </span>
            ))}
          </div>

          {item.impact.length > 0 ? (
            <dl className="mt-5 grid grid-cols-3 gap-3">
              {item.impact.map((m) => (
                <div key={m.label}>
                  <dt className="label-mono">{m.label}</dt>
                  <dd
                    className="metric-mono mt-0.5 text-sm font-medium"
                    style={{ color: "var(--text-heading)" }}
                  >
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <ul className="mt-5 space-y-2">
            {item.bullets.map((point, i) => (
              <li
                key={i}
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                <span className="text-accent mr-2 font-mono text-xs" aria-hidden>
                  →
                </span>
                {point}
              </li>
            ))}
          </ul>

          {item.systemOutput ? (
            <div className="mt-5">
              <p className="label-mono mb-2">system.output</p>
              <pre className="code-block" aria-label="Sample system output">
                {item.systemOutput}
              </pre>
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-2">
            {item.links.live ? (
              <a
                href={item.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-accent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-hover"
                style={{ borderRadius: 3 }}
              >
                <ExternalLink className="h-3 w-3" />
                Live demo
              </a>
            ) : null}
            {item.links.github ? (
              <a
                href={item.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-medium transition-colors hover:border-[var(--border-hover)] hover:text-accent"
                style={{
                  color: "var(--text-heading)",
                  borderColor: "var(--border)",
                  borderRadius: 3,
                }}
              >
                <Github className="h-3 w-3" />
                GitHub
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
