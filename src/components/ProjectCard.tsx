"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import ProjectVisual, { type ProjectVisualSpec } from "./ProjectVisual";

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
  visual: ProjectVisualSpec;
};

/**
 * A ledger row, not a card. No background, no box: the row is defined by the
 * hairline rule above it and the oversized numeral in the left margin.
 */
export default function ProjectCard({
  item,
  index,
}: {
  item: ProjectItem;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");

  /**
   * One filled action per row. When a project has no live deployment its
   * repository is the primary action, so it carries the fill.
   */
  const liveIsPrimary = Boolean(item.links.live);

  return (
    <motion.article
      aria-labelledby={`project-${number}`}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] as const }}
      className="ledger-row grid gap-x-10 gap-y-7 lg:grid-cols-[4.5rem_minmax(0,1.05fr)_minmax(0,0.95fr)]"
    >
      {/* Numeral, set in the margin on desktop */}
      <div className="flex items-baseline justify-between gap-4 lg:block">
        <span className="numeral" aria-hidden>
          {number}
        </span>
        <span className="meta lg:mt-4 lg:block">{item.year}</span>
      </div>

      <div className="lg:pt-1">
        <h3 id={`project-${number}`} className="t-h3">
          {item.title}
        </h3>

        <p
          className="t-body mt-4 max-w-[52ch]"
          style={{ color: "var(--text-muted)" }}
        >
          {item.summary}
        </p>

        <ul className="mt-7 flex flex-wrap gap-x-3 gap-y-3" aria-label="Stack">
          {item.techTags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {item.links.live ? (
            <a
              href={item.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Visit live site
              <ArrowUpRight className="h-[18px] w-[18px]" aria-hidden />
              <span className="sr-only">, opens in a new tab</span>
            </a>
          ) : null}

          {item.links.github ? (
            <a
              href={item.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${liveIsPrimary ? "btn-ghost" : "btn-primary"}`}
            >
              <Github className="h-[18px] w-[18px]" aria-hidden />
              {liveIsPrimary ? "Source" : "Read the source"}
              <span className="sr-only">, opens in a new tab</span>
            </a>
          ) : null}
        </div>
      </div>

      <div className="lg:pt-1">
        <ProjectVisual visual={item.visual} />
      </div>
    </motion.article>
  );
}
