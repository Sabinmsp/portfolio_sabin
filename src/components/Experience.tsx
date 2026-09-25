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
    title: "Customer Support Agent",
    result: "~30% fewer hallucinations",
    summary:
      "Built an e-commerce support agent using FastAPI, LangChain and RAG, with tool calling for order lookups.",
  },
  {
    title: "Gym Coach AI",
    result: "40% lower latency",
    summary:
      "Built a RAG fitness assistant using Python, FAISS and PyMuPDF that tailors answers to each user's profile.",
    github: "https://github.com/Sabinmsp/gym-ai-coach",
  },
  {
    title: "Text-to-Sign Tool",
    summary:
      "Built a Python tool that turns English text into Auslan signing on a 2D avatar using embeddings and MediaPipe.",
    github: "https://github.com/Sabinmsp/coding_project_auslan",
  },
  {
    title: "Qwen3-14B Fine-Tuning",
    result: "14B model on one GPU",
    summary:
      "Fine-tuned Qwen3-14B on UltraChat with 4-bit QLoRA using Hugging Face PEFT and TRL.",
  },
];

const education: EducationEntry[] = [
  {
    year: "2026 to 2027",
    title: "Master of Information Technology (Artificial Intelligence)",
    subtitle: "Charles Darwin University, Darwin, NT",
  },
  {
    year: "2023 to 2025",
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
          <div className="divide-y divide-[var(--border)]" style={{ borderColor: "var(--border)" }}>
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
