"use client";

import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import Reveal from "./Reveal";

export type ProjectItem = {
  title: string;
  summary: string;
  result?: string;
  client?: boolean;
  github?: string;
  link?: string;
};

export default function ProjectCard({
  item,
  index,
}: {
  item: ProjectItem;
  index: number;
}) {
  const primary = item.link ?? item.github;

  return (
    <Reveal delay={(index % 2) * 0.08} className="h-full">
      <article
        aria-label={`Project: ${item.title}`}
        className="project-card h-full"
      >
        <div className="flex min-h-[2.1rem] items-start justify-between gap-4">
          <span className="label-mono">
            {String(index + 1).padStart(2, "0")}
          </span>
          {primary ? (
            <a
              href={primary}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-box"
              aria-label={`Open ${item.title}`}
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}
        </div>

        <h3 className="heading mt-6 text-2xl md:text-[1.9rem]">{item.title}</h3>

        {item.client || item.result ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.client ? <span className="tag">Client project</span> : null}
            {item.result ? (
              <span className="tag tag--soft">{item.result}</span>
            ) : null}
          </div>
        ) : null}

        <p className="muted mt-4 flex-1 text-[15px] leading-relaxed">
          {item.summary}
        </p>

        {item.link || item.github ? (
          <div
            className="mt-6 flex flex-wrap gap-5 border-t pt-4"
            style={{ borderColor: "var(--border)" }}
          >
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
                style={{ color: "var(--ink)" }}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live site
              </a>
            ) : null}
            {item.github ? (
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
                style={{ color: "var(--ink)" }}
              >
                <Github className="h-3.5 w-3.5" />
                Code
              </a>
            ) : null}
          </div>
        ) : null}
      </article>
    </Reveal>
  );
}
