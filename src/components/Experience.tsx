"use client";

import { ArrowUpRight } from "lucide-react";
import ProjectCard, { type ProjectItem } from "./ProjectCard";
import Reveal, { SectionHeader } from "./Reveal";

const projects: ProjectItem[] = [
  {
    title: "SignBridge: Text-to-Auslan Prototype",
    result: "83.9% of words signed (30 test sentences)",
    summary:
      "Turns spoken, typed or PDF text into recorded Auslan signs on a 2D figure, using 3,215 signs extracted with MediaPipe, with fingerspelling for words that have no sign. An optional Claude rewrite of PDF key points has every fact re-checked against the source.",
    github: "https://github.com/Sabinmsp/coding_project_auslan",
  },
  {
    title: "Café Online Ordering and Payments",
    client: true,
    link: "https://www.postiecoffee.com.au/",
    summary:
      "Built online ordering and checkout for a Darwin café on its existing Square system. Prices are recalculated on the server, card details go straight to Square, and orders are confirmed only by signed Square webhooks. Next.js, FastAPI, Square.",
  },
  {
    title: "Website for an NDIS Provider",
    client: true,
    link: "https://sweet-care-virid.vercel.app/",
    summary:
      "Designed and built a Darwin NDIS provider's website from the client's brief and deployed it on Vercel.",
  },
  {
    title: "Customer Support Agent",
    summary:
      "Built an e-commerce support agent using FastAPI, LangChain and RAG, with tool calling for order lookups.",
    github: "https://github.com/sidskarkii/Capstone-Final",
  },
  {
    title: "Gym Coach AI",
    summary:
      "Built a fitness coach app whose RAG layer tailors answers to each user's profile, with vector search (in-memory or Qdrant), switchable OpenAI/Ollama embeddings, a response cache and rate limiting. Next.js and TypeScript.",
    github: "https://github.com/Sabinmsp/gym-ai-coach",
  },
  {
    title: "Qwen3-14B Fine-Tuning",
    result: "14B model on one GPU",
    summary:
      "Fine-tuned Qwen3-14B on UltraChat with 4-bit QLoRA using Hugging Face PEFT and TRL.",
  },
];

type JourneyItem = {
  badge?: string;
  when?: string;
  title: string;
  org: string;
  place?: string;
  note?: string;
  current?: boolean;
};

const journey: JourneyItem[] = [
  {
    badge: "Current",
    when: "2026 to 2027",
    title: "Master of Information Technology (Artificial Intelligence)",
    org: "Charles Darwin University",
    place: "Darwin, NT",
    current: true,
  },
  {
    badge: "Client work",
    title: "Freelance Developer",
    org: "Darwin clients",
    note: "Built online ordering and Square payments for a caf\u00e9, and a website for an NDIS provider.",
  },
  {
    when: "2023 to 2025",
    title: "Bachelor of Information Technology",
    org: "Victoria University",
    place: "Sydney, NSW",
  },
];

export default function Experience() {
  return (
    <>
      <section id="projects" className="section-y">
        <div className="page-container">
          <SectionHeader
            title={
              <>
                Featured
                <br />
                Projects
              </>
            }
            aside={
              <a
                href="https://github.com/Sabinmsp"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display inline-flex items-center gap-2 text-base font-semibold"
                style={{ color: "var(--ink)" }}
              >
                GitHub
                <span className="icon-box !h-7 !w-7">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
            }
          >
            <p className="muted mt-6 max-w-md text-lg">
              Client work and independent builds. Each one links to the live
              site or the code where I can share it.
            </p>
          </SectionHeader>

          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((item, i) => (
              <ProjectCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="journey" className="section-y">
        <div className="page-container">
          <SectionHeader
            title="Journey."
            aside={
              <>
                Where I&rsquo;ve studied
                <br />
                and who I&rsquo;ve built for.
              </>
            }
          />

          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
            <span
              aria-hidden
              className="absolute top-[1.125rem] bottom-0 left-[1.125rem] w-px md:top-[1.125rem] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto"
              style={{ background: "var(--ink)" }}
            />
            {journey.map((item, i) => (
              <li key={item.title} className="relative">
                <Reveal
                  delay={i * 0.1}
                  className="grid grid-cols-[2.25rem_1fr] gap-5 md:block"
                >
                  <span
                    className={`timeline-dot relative ${item.current ? "timeline-dot--current" : ""}`}
                    aria-hidden
                  />
                  <div className="md:mt-7">
                    <div className="flex flex-wrap items-center gap-2">
                      {item.badge ? (
                        <span className="tag">{item.badge}</span>
                      ) : null}
                      {item.when ? (
                        <span className="muted text-sm">{item.when}</span>
                      ) : null}
                    </div>
                    <h3 className="heading mt-3 text-2xl md:text-[1.7rem]">
                      {item.title}
                    </h3>
                    <p className="heading mt-3 text-base">{item.org}</p>
                    {item.place ? (
                      <p className="muted text-sm">{item.place}</p>
                    ) : null}
                    {item.note ? (
                      <p className="muted mt-3 max-w-xs text-[15px] leading-relaxed">
                        {item.note}
                      </p>
                    ) : null}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
