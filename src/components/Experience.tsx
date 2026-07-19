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
    title: "Food_ai",
    mockupImage: "/mockup-food-ai.png",
    mockupUrl: "food-ai.app/dashboard",
    techTags: ["React Native", "TypeScript", "FastAPI", "PostgreSQL"],
    impact: [
      { label: "surface", value: "intake + steps" },
      { label: "ux", value: "guided daily flow" },
      { label: "latency", value: "<200ms charts" },
    ],
    links: {
      github: "https://github.com/Sabinmsp",
    },
    bullets: [
      "Nutrition and activity companion: calories, macros, and steps in one glanceable dashboard",
      "Personalized greeting and weekly rhythm so tracking stays lightweight",
      "Built for daily use: fast navigation, clear charts, flow that matches how people eat and move",
    ],
    systemOutput: `// GET /api/v1/nutrition/summary?day=today
{
  "calories": 1840,
  "protein_g": 142,
  "steps": 8742,
  "status": "on_track"
}`,
  },
  {
    year: "2026",
    title: "Purpose AI",
    mockupImage: "/mockup-purpose-ai.png",
    mockupUrl: "purpose.ai/api/v1/plan",
    techTags: ["Next.js", "FastAPI", "LangChain", "pgvector"],
    impact: [
      { label: "pattern", value: "RAG + agents" },
      { label: "grounding", value: "retrieved docs" },
      { label: "output", value: "actionable plans" },
    ],
    links: {
      github: "https://github.com/Sabinmsp",
    },
    bullets: [
      "Purpose-driven assistant: users define intent and get structured plans instead of generic chat",
      "Retrieval layer grounds responses in source content for consistent, relevant advice",
      "End-to-end stack: clean API, responsive UI, prompts tuned for actionable output",
    ],
    systemOutput: `// POST /api/v1/retrieve  ·  top_k=4
{
  "query": "clarify Q2 goals",
  "chunks": 4,
  "avg_score": 0.84,
  "model": "gpt-4o-mini"
}`,
  },
];

const education: EducationEntry[] = [
  {
    year: "2026 — present",
    title: "Master of IT, Artificial Intelligence",
    subtitle: "Charles Darwin University",
    detail:
      "Applied AI: ML systems, agents, and production software. Shipping RAG pipelines alongside coursework.",
  },
  {
    year: "2023 — 2025",
    title: "Bachelor of Information Technology",
    subtitle: "Victoria University",
    detail:
      "Full-stack web and mobile, end to end — frontend, backend, databases, and system architecture.",
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
          <h2 className="heading text-2xl md:text-3xl">Selected work</h2>
          <p
            className="mt-2 max-w-xl text-sm md:text-[15px]"
            style={{ color: "var(--text-muted)" }}
          >
            Systems I&apos;ve designed and shipped, plus the academic foundation
            behind them.
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
