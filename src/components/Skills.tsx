"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
  {
    category: "AI Ecosystem & LLMs",
    items: [
      "LangChain",
      "OpenAI API",
      "Anthropic Claude",
      "OpenRouter",
      "Hugging Face (Transformers, PEFT, TRL)",
      "Sentence Transformers",
      "MediaPipe",
    ],
  },
  {
    category: "GenAI Architecture",
    items: [
      "RAG Pipelines",
      "Agentic Workflows",
      "Tool Calling",
      "Semantic Search",
      "Embedding Models",
      "JSON Structured Outputs",
      "LLM Fine-Tuning (QLoRA, 4-bit Quantization)",
    ],
  },
  {
    category: "Backend & Cloud",
    items: [
      "Python (FastAPI)",
      "TypeScript (Node.js)",
      "AWS / Cloud Deployments",
      "REST APIs",
      "Stateless Architecture",
    ],
  },
  {
    category: "Data & Vector DBs",
    items: [
      "PostgreSQL (pgvector)",
      "FAISS",
      "Qdrant",
      "MongoDB",
      "Redis (Caching)",
    ],
  },
  {
    category: "MLOps & Infra",
    items: [
      "Docker",
      "CI/CD (GitHub Actions)",
      "LLM Observability",
      "Cloud GPU Training",
      "Git",
      "Next.js / React",
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="skills" className="section-y relative">
      <div className="page-container" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="heading mb-8 text-2xl md:mb-10 md:text-3xl"
        >
          Skills
        </motion.h2>

        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.05 * i }}
              className="grid gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[200px_1fr] sm:gap-6"
              style={{ borderColor: "var(--border)" }}
            >
              <h3 className="heading pt-1 text-sm md:text-base">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span key={item} className="stack-label">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
