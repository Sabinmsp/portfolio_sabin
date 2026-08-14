"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export type ProjectLinks = {
  live?: string;
  github?: string;
};

export type ProjectItem = {
  year: string;
  title: string;
  summary: string;
  techTags: string[];
  links: ProjectLinks;
};

export default function ProjectCard({
  item,
  index,
}: {
  item: ProjectItem;
  index: number;
}) {
  return (
    <motion.article
      aria-label={`Project: ${item.title}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
      className="border p-5 md:p-6"
      style={{
        borderColor: "var(--border)",
        background: "var(--bg-card)",
        borderRadius: 4,
      }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="heading text-lg md:text-xl">{item.title}</h3>
        <span className="label-mono">{item.year}</span>
      </div>

      <p
        className="mt-3 text-sm leading-relaxed md:text-[15px]"
        style={{ color: "var(--text-muted)" }}
      >
        {item.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.techTags.map((tag) => (
          <span key={tag} className="stack-label">
            {tag}
          </span>
        ))}
      </div>

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
            Live
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
    </motion.article>
  );
}
