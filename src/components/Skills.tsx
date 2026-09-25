"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
  {
    category: "AI",
    items: "RAG, LangChain, OpenAI and Claude APIs, Hugging Face, QLoRA fine-tuning",
  },
  {
    category: "Backend",
    items: "Python, FastAPI, TypeScript, Node.js, REST APIs, AWS",
  },
  {
    category: "Data",
    items: "PostgreSQL, pgvector, FAISS, Qdrant, MongoDB, Redis",
  },
  {
    category: "Tools",
    items: "Docker, GitHub Actions, Git, Next.js, React",
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
          className="heading mb-6 text-2xl md:mb-8 md:text-3xl"
        >
          Skills
        </motion.h2>

        <motion.dl
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="grid max-w-4xl gap-x-6 gap-y-3 sm:grid-cols-[100px_1fr]"
        >
          {skillGroups.map((group) => (
            <div key={group.category} className="contents">
              <dt className="label-mono pt-0.5">{group.category}</dt>
              <dd
                className="mb-2 text-sm leading-relaxed sm:mb-0 md:text-[15px]"
                style={{ color: "var(--text)" }}
              >
                {group.items}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
