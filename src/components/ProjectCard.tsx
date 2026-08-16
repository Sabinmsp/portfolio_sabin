"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Plus } from "lucide-react";
import ProjectVisual from "./ProjectVisual";
import type { ProjectItem } from "@/data/projects";

/**
 * A ledger row, not a card. No background, no box: the row is defined by the
 * hairline rule above it and the oversized numeral in the left margin.
 *
 * The copy is ordered for a reviewer skimming for signal: problem, then the
 * engineering, then the stack, then the links that prove it.
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
  const headingId = `project-${number}`;

  /**
   * One filled action per row. When a project has no live deployment its
   * repository is the primary action, so it carries the fill.
   */
  const liveIsPrimary = Boolean(item.links.live);

  return (
    <motion.article
      aria-labelledby={headingId}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
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
        <h3 id={headingId} className="t-h3">
          {item.title}
        </h3>

        <p
          className="t-body mt-4 max-w-[54ch]"
          style={{ color: "var(--text)" }}
        >
          {item.problem}
        </p>

        <p className="meta mt-7">Engineering</p>
        <p
          className="t-body mt-2 max-w-[54ch]"
          style={{ color: "var(--text-muted)" }}
        >
          {item.engineering}
        </p>

        <details className="details-block mt-6">
          <summary className="details-summary">
            <Plus className="details-icon h-4 w-4 shrink-0" aria-hidden />
            <span>Engineering details</span>
          </summary>
          <ul className="mt-4 flex flex-col gap-3">
            {item.details.map((line) => (
              <li key={line} className="details-item t-label">
                {line}
              </li>
            ))}
          </ul>
        </details>

        <p className="meta mt-7">Stack</p>
        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-3" aria-label="Stack">
          {item.stack.map((tag) => (
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
              Live demo
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
