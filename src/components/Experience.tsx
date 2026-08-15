"use client";

import { motion, useReducedMotion } from "framer-motion";
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
    visual: {
      kind: "flow",
      input: "resume + job description",
      steps: [
        "match evidence to the role",
        "name the gaps",
        "return a project and a seven-day plan",
      ],
      output: "something to actually build",
      caption: "Pipeline: evidence in, plan out.",
    },
  },
  {
    year: "2026",
    title: "Gym AI Coach",
    techTags: ["Next.js", "TypeScript", "Tailwind", "RAG", "OpenAI"],
    links: {
      github: "https://github.com/Sabinmsp/gym-ai-coach",
    },
    summary:
      "iPhone style fitness coach UI with a real Ask AI pipeline: retrieve fitness knowledge, answer from retrieved chunks only, and show every RAG step in a debug panel.",
    visual: {
      kind: "flow",
      input: "a fitness question",
      steps: [
        "retrieve matching knowledge chunks",
        "answer from those chunks only",
        "log every step to the debug panel",
      ],
      output: "an answer you can trace",
      caption: "Retrieval path, nothing hidden.",
    },
  },
  {
    year: "2026",
    title: "AI RC Car Simulator",
    techTags: ["Python", "FastAPI", "WebSocket", "Ollama"],
    links: {
      github: "https://github.com/Sabinmsp/ai_rc_car_simulator",
    },
    summary:
      "Local simulator for an AI controlled RC car. Type a search command, watch a 2D room, and see the LLM pick safe actions over a WebSocket. No hardware needed.",
    visual: {
      kind: "flow",
      input: "typed search command",
      steps: [
        "local LLM reads the room state",
        "picks a safe next action",
        "streams it over the WebSocket",
      ],
      output: "car moves in the 2D room",
      caption: "Control loop, no hardware in it.",
    },
  },
];

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

function SectionHead({
  index,
  kicker,
  title,
  lead,
}: {
  index: string;
  kicker: string;
  title: string;
  lead: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] as const }}
      className="mb-12 md:mb-16"
    >
      <p className="meta">
        {index} / {kicker}
      </p>
      <h2 className="t-h2 mt-4">{title}</h2>
      <p
        className="t-lead mt-5 max-w-[48ch]"
        style={{ color: "var(--text-muted)" }}
      >
        {lead}
      </p>
    </motion.header>
  );
}

export default function Experience() {
  const reduceMotion = useReducedMotion();

  return (
    <>
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

      <section id="education" className="section-y rule-top">
        <div className="page-container">
          <SectionHead
            index="02"
            kicker="Study"
            title="Where the fundamentals came from."
            lead="A full-stack degree first, then a master's focused on applied AI."
          />

          <div>
            {education.map((item, i) => (
              <motion.article
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] as const }}
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
                    className="t-body mt-4 max-w-[52ch]"
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
    </>
  );
}
