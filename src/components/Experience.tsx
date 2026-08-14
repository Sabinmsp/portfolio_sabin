"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import ProjectCard, { type ProjectItem } from "./ProjectCard";

interface EducationEntry {
  year: string;
  title: string;
  subtitle: string;
  detail: string;
}

const projects: ProjectItem[] = [
  {
    year: "2026",
    title: "CareerOS",
    techTags: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Claude"],
    links: {
      live: "https://careeros-lemon.vercel.app",
      github: "https://github.com/Sabinmsp/careeros",
    },
    summary:
      "AI employability tool. Paste a job description and it compares your resume evidence against the role, names the gaps, then turns them into a project and a seven-day plan.",
  },
  {
    year: "2026",
    title: "Gym AI Coach",
    techTags: ["Next.js", "TypeScript", "Tailwind", "RAG", "OpenAI"],
    links: {
      github: "https://github.com/Sabinmsp/gym-ai-coach",
    },
    summary:
      "iPhone-style fitness coach UI with a real Ask AI pipeline: retrieve fitness knowledge, answer from retrieved chunks only, and show the RAG steps in a debug panel.",
  },
  {
    year: "2026",
    title: "AI RC Car Simulator",
    techTags: ["Python", "FastAPI", "WebSocket", "Ollama"],
    links: {
      github: "https://github.com/Sabinmsp/ai_rc_car_simulator",
    },
    summary:
      "Local simulator for an AI-controlled RC car. Type a search command, watch a 2D room, and see the LLM pick safe actions over WebSocket. No hardware needed.",
  },
];

const education: EducationEntry[] = [
  {
    year: "2026 — present",
    title: "Master of IT, Artificial Intelligence",
    subtitle: "Charles Darwin University",
    detail:
      "Applied AI: ML systems, agents, and production software.",
  },
  {
    year: "2023 — 2025",
    title: "Bachelor of Information Technology",
    subtitle: "Victoria University",
    detail:
      "Full-stack web and mobile — frontend, backend, databases, and system architecture.",
  },
];

export default function Experience() {
  const [tab, setTab] = useState<"systems" | "education">("systems");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="experience" className="section-y relative">
      <div className="page-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-8 md:mb-10"
        >
          <h2 className="heading text-2xl md:text-3xl">Work</h2>
          <p
            className="mt-2 max-w-xl text-sm md:text-[15px]"
            style={{ color: "var(--text-muted)" }}
          >
            Three projects from GitHub — career matching, gym coaching, and an RC
            car simulator.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="mb-8 flex gap-0 border-b"
          style={{ borderColor: "var(--border)" }}
          role="tablist"
        >
          {(
            [
              { key: "systems" as const, label: "Projects" },
              { key: "education" as const, label: "Education" },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className="relative px-4 py-2.5 text-sm font-medium transition-colors"
              style={{
                color:
                  tab === t.key ? "var(--text-heading)" : "var(--text-muted)",
              }}
            >
              {t.label}
              {tab === t.key ? (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute inset-x-0 -bottom-px h-px bg-accent"
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              ) : null}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {tab === "systems" ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="grid gap-4 md:grid-cols-1 lg:grid-cols-3"
            >
              {projects.map((item, i) => (
                <ProjectCard key={item.title} item={item} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="divide-y"
              style={{ borderColor: "var(--border)" }}
            >
              {education.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-1 py-5 first:pt-0 last:pb-0 sm:grid-cols-[140px_1fr] sm:gap-6"
                  style={{ borderColor: "var(--border)" }}
                >
                  <p className="label-mono pt-1">{item.year}</p>
                  <div>
                    <h3 className="heading text-base md:text-lg">{item.title}</h3>
                    <p className="mt-0.5 text-sm text-accent">{item.subtitle}</p>
                    <p
                      className="mt-2 text-sm leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
