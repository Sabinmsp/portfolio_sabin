"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard, { type ProjectItem } from "./ProjectCard";

interface EducationEntry {
  year: string;
  title: string;
  subtitle: string;
}

const projects: ProjectItem[] = [
  {
    title: "GenAI Customer Support Agent",
    subtitle: "RAG + Tool Calling",
    techTags: ["FastAPI", "LangChain", "OpenRouter"],
    links: {},
    highlights: [
      "Architected a production-grade AI support agent capable of resolving multi-turn e-commerce queries by integrating dynamic RAG and external tool-calling.",
      "Engineered an end-to-end document ingestion pipeline, achieving high-precision semantic retrieval through optimized chunking strategies and vector embeddings.",
      "Implemented a robust API-driven execution layer, automating order lookups while enforcing strict JSON schema validation for deterministic backend processing.",
      "Reduced AI hallucination rates by ~30% by rigorously grounding LLM responses in real-time product databases and proprietary knowledge graphs.",
    ],
  },
  {
    title: "Gym Coach AI",
    subtitle: "Personalized RAG System",
    techTags: ["Python", "FAISS", "PyMuPDF"],
    links: {
      github: "https://github.com/Sabinmsp/gym-ai-coach",
    },
    highlights: [
      "Engineered a personalized AI advisory system, leveraging FAISS and PyMuPDF to extract and retrieve dense context from vectorized fitness literature.",
      "Architected a multi-step semantic retrieval pipeline capable of generating highly targeted, knowledge-grounded responses dynamically adapted to user profiles.",
      "Optimized inference latency by 40% and minimized token costs by implementing semantic caching and routing queries through task-specific LLMs.",
    ],
  },
  {
    title: "Text-to-Sign AI Accessibility Tool",
    subtitle: "Auslan Signing Avatar",
    techTags: ["Python", "MediaPipe", "Sentence Transformers"],
    links: {
      github: "https://github.com/Sabinmsp/coding_project_auslan",
    },
    highlights: [
      "Engineered a text-to-sign pipeline using semantic search and embeddings to retrieve Auslan signs and generate 2D avatar animations, with fingerspelling fallback for unsupported words.",
    ],
  },
  {
    title: "LLM Fine-Tuning: Qwen3-14B",
    subtitle: "4-bit QLoRA",
    techTags: ["Hugging Face Transformers", "PEFT", "TRL"],
    links: {},
    highlights: [
      "Fine-tuned a 14-billion-parameter language model on UltraChat data using 4-bit QLoRA on a single rented NVIDIA RTX 5090 cloud GPU, reducing trainable parameters and memory enough to adapt a model of this size on one GPU.",
    ],
  },
];

const education: EducationEntry[] = [
  {
    year: "2026 — 2027",
    title: "Master of Information Technology (Artificial Intelligence)",
    subtitle: "Charles Darwin University, Darwin, NT",
  },
  {
    year: "2023 — 2025",
    title: "Bachelor of Information Technology",
    subtitle: "Victoria University, Sydney, NSW",
  },
];

function SectionHeading({
  title,
  inView,
}: {
  title: string;
  inView: boolean;
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="heading mb-8 text-2xl md:mb-10 md:text-3xl"
    >
      {title}
    </motion.h2>
  );
}

export default function Experience() {
  const projectsRef = useRef(null);
  const educationRef = useRef(null);
  const projectsInView = useInView(projectsRef, { once: true, margin: "-60px" });
  const educationInView = useInView(educationRef, {
    once: true,
    margin: "-60px",
  });

  return (
    <>
      <section id="projects" className="section-y relative">
        <div className="page-container" ref={projectsRef}>
          <SectionHeading title="Projects" inView={projectsInView} />
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((item, i) => (
              <ProjectCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="section-y relative">
        <div className="page-container" ref={educationRef}>
          <SectionHeading title="Education" inView={educationInView} />
          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
