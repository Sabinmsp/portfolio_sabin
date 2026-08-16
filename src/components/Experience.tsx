"use client";

import { motion, useReducedMotion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import SectionHead from "./SectionHead";
import { projects } from "@/data/projects";

interface EducationEntry {
  year: string;
  title: string;
  subtitle: string;
  detail: string;
}

const education: EducationEntry[] = [
  {
    year: "2026 to present",
    title: "Master of IT, Artificial Intelligence",
    subtitle: "Charles Darwin University",
    detail: "Applied AI: ML systems, agents, and production software.",
  },
  {
    year: "2023 to 2025",
    title: "Bachelor of Information Technology",
    subtitle: "Victoria University",
    detail:
      "Full-stack web and mobile: frontend, backend, databases, and system architecture.",
  },
];

export function Work() {
  return (
    <section id="work" className="section-y rule-top">
      <div className="page-container">
        <SectionHead
          index="01"
          kicker="Work"
          title="Three systems, built and running."
          lead="Each one solves a specific problem end to end. Source is public for all three."
        />

        <div>
          {projects.map((item, i) => (
            <ProjectCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Education() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="education" className="section-y rule-top">
      <div className="page-container">
        <SectionHead
          index="03"
          kicker="Study"
          title="Where the fundamentals came from."
          lead="A full-stack degree first, then a master's focused on applied AI."
        />

        <div>
          {education.map((item, i) => (
            <motion.article
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.5, ease: [0.2, 0.7, 0.3, 1] as const }
              }
              className="ledger-row grid gap-x-10 gap-y-5 lg:grid-cols-[4.5rem_minmax(0,1fr)]"
            >
              <div className="flex items-baseline justify-between gap-4 lg:block">
                <span className="numeral" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="lg:pt-1">
                <p className="meta">{item.year}</p>
                <h3 className="t-h3 mt-3">{item.title}</h3>
                <p
                  className="t-body mt-2 font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  {item.subtitle}
                </p>
                <p
                  className="t-body mt-4 max-w-[54ch]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.detail}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
