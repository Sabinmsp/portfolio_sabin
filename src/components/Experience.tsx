"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FolderGit2, GraduationCap } from "lucide-react";
import TiltCard from "./TiltCard";
import ProjectCard, { type ProjectItem } from "./ProjectCard";

interface TimelineEntry {
  year: string;
  title: string;
  subtitle: string;
  bullets: string[];
}

const projects: ProjectItem[] = [
  {
    year: "2026",
    title: "Food_ai",
    mockupImage: "/mockup-food-ai.png",
    techTags: ["Mobile", "Health", "Nutrition", "AI"],
    impact: [
      { label: "Focus", value: "Daily intake" },
      { label: "UX", value: "Guided flow" },
      { label: "Insights", value: "Activity + macros" },
    ],
    links: {
      github: "https://github.com/Sabinmsp",
    },
    bullets: [
      "Nutrition and activity companion: calories, macros, and steps in one calm, glanceable dashboard",
      "Personalized greeting and weekly rhythm so staying on track feels lightweight, not clinical",
      "Built for real daily use: fast navigation, clear charts, and a flow that fits how people actually eat and move",
    ],
  },
  {
    year: "2026",
    title: "Purpose AI",
    mockupImage: "/mockup-purpose-ai.png",
    techTags: ["LLM", "RAG", "Next.js", "FastAPI"],
    impact: [
      { label: "Focus", value: "Goal clarity" },
      { label: "Flow", value: "Guided steps" },
      { label: "Trust", value: "Grounded answers" },
    ],
    links: {
      github: "https://github.com/Sabinmsp",
    },
    bullets: [
      "Purpose driven assistant: users define intent and get structured plans and next steps instead of generic chat",
      "Retrieval layer grounds responses in your content so advice stays relevant and consistent",
      "Built end to end with a clean API, responsive UI, and prompts tuned for actionable output",
    ],
  },
];

const education: TimelineEntry[] = [
  {
    year: "2026 to present",
    title: "Master of IT, Artificial Intelligence",
    subtitle: "Charles Darwin University",
    bullets: [
      "Focused on applied AI: machine learning systems, intelligent agents, and production software engineering",
      "Shipping real AI projects alongside coursework: RAG pipelines, AI agents, and full stack applications",
    ],
  },
  {
    year: "2023 to 2025",
    title: "Bachelor of Information Technology",
    subtitle: "Victoria University",
    bullets: [
      "Built and deployed full stack applications across web and mobile, end to end",
      "Delivered production quality projects spanning frontend, backend, databases, and system architecture",
    ],
  },
];

function EducationItem({ item, index }: { item: TimelineEntry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, delay: index * 0.12, ease: "easeOut" }}
      className="relative pl-12 pb-12 last:pb-0 group/item"
    >
      <div
        className="absolute left-[17px] top-6 bottom-0 w-[2px] group-last/item:hidden"
        style={{ background: "var(--border)" }}
      />
      <div
        className="absolute left-0 top-2 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300"
        style={{ background: "var(--bg)", border: "2px solid var(--border)" }}
      >
        <div className="h-3 w-3 rounded-full bg-accent transition-transform duration-300 group-hover/item:scale-125" />
      </div>

      <TiltCard className="card overflow-hidden rounded-2xl transition-all duration-300" maxTilt={5} scale={1.01}>
        <div className="p-6">
          <span className="inline-block rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold tracking-wider text-accent">
            {item.year}
          </span>
          <h3 className="mt-3 text-lg font-bold leading-snug" style={{ color: "var(--text-heading)" }}>
            {item.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-accent">{item.subtitle}</p>
          <ul className="mt-4 space-y-2.5">
            {item.bullets.map((point, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                <span className="mt-1.5 min-w-[6px] shrink-0 rounded-full bg-accent/40" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </TiltCard>
    </motion.div>
  );
}

function ProjectTimelineItem({ item, index }: { item: ProjectItem; index: number }) {
  return (
    <div className="relative pl-12 pb-12 last:pb-0 group/item">
      <div
        className="absolute left-[17px] top-6 bottom-0 w-[2px] group-last/item:hidden"
        style={{ background: "var(--border)" }}
      />
      <div
        className="absolute left-0 top-2 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300"
        style={{ background: "var(--bg)", border: "2px solid var(--border)" }}
      >
        <div className="h-3 w-3 rounded-full bg-accent transition-transform duration-300 group-hover/item:scale-125" />
      </div>

      <ProjectCard item={item} index={index} />
    </div>
  );
}

export default function Experience() {
  const [tab, setTab] = useState<"systems" | "education">("systems");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isProjects = tab === "systems";

  return (
    <section id="experience" className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 md:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl font-bold md:text-5xl" style={{ color: "var(--text-heading)" }}>
            Systems &amp; <span className="text-accent pop-text">Engineering Journey</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-accent" />
          <p className="mx-auto mt-4 max-w-lg text-sm md:text-lg" style={{ color: "var(--text-muted)" }}>
            Systems I&apos;ve architected and shipped, and the engineering foundation behind them.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-14 flex justify-center"
        >
          <div className="card-strong inline-flex gap-1.5 rounded-2xl p-1.5">
            {[
              { key: "systems" as const, label: "Projects", icon: FolderGit2 },
              { key: "education" as const, label: "Education", icon: GraduationCap },
            ].map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`relative inline-flex cursor-pointer items-center gap-2.5 rounded-xl px-7 py-3 text-sm font-semibold transition-all duration-300 ${
                  tab === t.key ? "text-white" : ""
                }`}
                style={tab !== t.key ? { color: "var(--text-muted)" } : undefined}
              >
                {tab === t.key && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 rounded-xl bg-accent shadow-md"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2.5">
                  <t.icon className="h-4 w-4" />
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl p-5 md:rounded-3xl md:p-10 card-strong"
        >
          <AnimatePresence mode="wait">
            {isProjects ? (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                {projects.map((item, i) => (
                  <ProjectTimelineItem key={item.title} item={item} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                {education.map((item, i) => (
                  <EducationItem key={item.title} item={item} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
