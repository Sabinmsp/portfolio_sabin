"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export type ProjectLinks = {
  live?: string;
  github?: string;
};

export type ProjectItem = {
  title: string;
  subtitle: string;
  highlights: string[];
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
      className="flex flex-col border p-5 md:p-6"
      style={{
        borderColor: "var(--border)",
        background: "var(--bg-card)",
        borderRadius: 4,
      }}
    >
      <h3 className="heading text-lg md:text-xl">{item.title}</h3>
      <p className="label-mono mt-1 text-accent">{item.subtitle}</p>

      <ul
        className="mt-4 flex-1 space-y-2 text-sm leading-relaxed md:text-[15px]"
        style={{ color: "var(--text-muted)" }}
      >
        {item.highlights.map((point) => (
          <li key={point} className="flex gap-2.5">
            <span
              aria-hidden
              className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {item.techTags.map((tag) => (
          <span key={tag} className="stack-label">
            {tag}
          </span>
        ))}
      </div>

      {item.links.live || item.links.github ? (
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
      ) : null}
    </motion.article>
  );
}
