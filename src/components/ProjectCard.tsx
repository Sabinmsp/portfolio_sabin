"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";

export type ProjectItem = {
  title: string;
  summary: string;
  result?: string;
  github?: string;
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
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
      className="grid gap-3 py-6 first:pt-0 last:pb-0 md:grid-cols-[1fr_auto] md:gap-8"
    >
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="heading text-lg md:text-xl">{item.title}</h3>
          {item.result ? (
            <span className="metric-mono text-xs text-accent md:text-[13px]">
              {item.result}
            </span>
          ) : null}
        </div>
        <p
          className="mt-2 max-w-2xl text-sm leading-relaxed md:text-[15px]"
          style={{ color: "var(--text-muted)" }}
        >
          {item.summary}
        </p>
      </div>

      {item.github ? (
        <a
          href={item.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-fit w-fit items-center gap-1.5 border px-3 py-1.5 text-xs font-medium transition-colors hover:border-[var(--border-hover)] hover:text-accent"
          style={{
            color: "var(--text-heading)",
            borderColor: "var(--border)",
            borderRadius: 3,
          }}
        >
          <Github className="h-3 w-3" />
          Code
        </a>
      ) : null}
    </motion.article>
  );
}
