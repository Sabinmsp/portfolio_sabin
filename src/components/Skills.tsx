"use client";

import Reveal, { SectionHeader } from "./Reveal";

const skillGroups = [
  {
    category: "AI & LLMs",
    blurb: "RAG pipelines, LLM apps, fine-tuning",
    items: [
      "RAG",
      "LangChain",
      "OpenAI API",
      "Claude API",
      "Hugging Face",
      "QLoRA fine-tuning",
    ],
    key: ["RAG", "LangChain"],
  },
  {
    category: "Backend",
    blurb: "APIs and server-side logic",
    items: ["Python", "FastAPI", "TypeScript", "Node.js", "REST APIs", "AWS"],
    key: ["Python", "FastAPI"],
  },
  {
    category: "Data",
    blurb: "Relational and vector storage",
    items: ["PostgreSQL", "pgvector", "Qdrant", "Redis"],
    key: ["PostgreSQL"],
  },
  {
    category: "Web & Tools",
    blurb: "Front end, CI and shipping",
    items: ["Next.js", "React", "Docker", "GitHub Actions", "Git"],
    key: ["Next.js"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-y">
      <div className="page-container">
        <SectionHeader
          title="Tech Stack"
          aside={
            <>
              The tools behind
              <br />
              my work.
            </>
          }
        />

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.06}>
              <div
                className="border-t-2 pt-6"
                style={{ borderColor: "var(--border-strong)" }}
              >
                <h3 className="heading text-3xl">{group.category}</h3>
                <p className="muted mt-2 text-sm">{group.blurb}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className={`chip ${group.key.includes(item) ? "chip--ink" : ""}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
