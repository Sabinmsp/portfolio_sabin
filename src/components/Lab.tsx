"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Award, GraduationCap } from "lucide-react";
import { SectionHeader } from "./Reveal";
import { openSystem } from "@/data/systems";

const EASE = [0.22, 1, 0.36, 1] as const;

const PRINCIPLES = [
  { text: "The model's output is validated again before it is trusted", system: "careeros", where: "CareerOS" },
  { text: "Quotes and facts are checked against the source text", system: "triage", where: "Housing triage" },
  { text: "A deterministic fallback, so users never get an error page", system: "careeros", where: "CareerOS" },
  { text: "The model reads; code decides scores and rankings", system: "triage", where: "Housing triage" },
];

const STACK = [
  { group: "AI", items: ["RAG", "LangChain", "Claude API", "OpenAI API", "Hugging Face", "PEFT / TRL", "MediaPipe"] },
  { group: "Backend", items: ["Python", "FastAPI", "TypeScript", "Node.js", "Zod", "Pydantic"] },
  { group: "Data", items: ["PostgreSQL", "Supabase", "pgvector", "Qdrant", "SQLite"] },
  { group: "Web", items: ["Next.js", "React", "Tailwind", "Vercel", "Docker"] },
];

const WORKFLOW = [
  { step: "Brief", example: "Postie: the public site went live first; online ordering waits for the owner's decision." },
  { step: "Prototype", example: "SignBridge: a working signer on real data before any polish." },
  { step: "Verify", example: "88 JS tests plus browser suites on SignBridge, 23 scoring tests on CareerOS, property tests on triage ranking." },
  { step: "Ship", example: "Postie Coffee and the NDIS provider site are live for real customers." },
];

function go(id: string) {
  openSystem(id);
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
}

function Card({
  className = "",
  children,
  i,
}: {
  className?: string;
  children: React.ReactNode;
  i: number;
}) {
  return (
    <motion.div
      className={`panel panel--spot p-5 md:p-6 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function Lab() {
  const [step, setStep] = useState(0);

  // Move the panel spotlight with the pointer.
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>(".panel--spot");
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="lab" className="section-y">
      <div className="page-container">
        <SectionHeader
          title={
            <>
              Inside the <span className="accent">lab.</span>
            </>
          }
          aside={<>What I focus on, what I&rsquo;ve delivered, and how I work.</>}
        />

        <div className="bento" onPointerMove={onMove}>
          {/* Focus */}
          <Card i={0} className="md:col-span-4 md:row-span-2">
            <p className="label-mono">Current focus</p>
            <p className="display mt-4 text-3xl md:text-[2.6rem]">
              Grounded AI: the model reads,
              <br className="hidden md:block" /> <span className="accent">code decides.</span>
            </p>
            <p className="muted mt-4 max-w-xl">
              The rules I build into every AI system. Each one links to the
              system that shows it.
            </p>
            <ul className="mt-6 grid gap-2">
              {PRINCIPLES.map((p) => (
                <li key={p.text}>
                  <button
                    type="button"
                    onClick={() => go(p.system)}
                    className="group flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left transition-colors hover:border-[var(--accent-line)]"
                    style={{ borderColor: "var(--border)", background: "var(--bg-elev)" }}
                  >
                    <span className="text-[15px] text-[var(--ink)]">{p.text}</span>
                    <span className="muted inline-flex shrink-0 items-center gap-1 text-xs group-hover:text-[var(--accent)]">
                      {p.where}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          {/* Award */}
          <Card i={1} className="md:col-span-2">
            <Award className="accent h-6 w-6" />
            <p className="label-mono mt-4">Award</p>
            <p className="heading mt-1 text-xl">CDU IT Code Fair 2026</p>
            <button
              type="button"
              onClick={() => go("signbridge")}
              className="muted mt-1 text-sm hover:text-[var(--accent)]"
            >
              For SignBridge, text to Auslan →
            </button>
          </Card>

          {/* Client delivery */}
          <Card i={2} className="md:col-span-2">
            <p className="label-mono">Client delivery</p>
            <ul className="mt-3 grid gap-3">
              <li>
                <a href="https://www.postiecoffee.com.au/" target="_blank" rel="noopener noreferrer" className="group block">
                  <span className="heading inline-flex items-center gap-1.5 text-[17px] group-hover:text-[var(--accent)]">
                    Postie Coffee <ArrowUpRight className="h-4 w-4" />
                  </span>
                  <span className="muted block text-[13px]">Café website, live · ordering system built</span>
                </a>
              </li>
              <li>
                <a href="https://sweet-care-virid.vercel.app/" target="_blank" rel="noopener noreferrer" className="group block">
                  <span className="heading inline-flex items-center gap-1.5 text-[17px] group-hover:text-[var(--accent)]">
                    NDIS provider <ArrowUpRight className="h-4 w-4" />
                  </span>
                  <span className="muted block text-[13px]">Website from the client&rsquo;s brief, live</span>
                </a>
              </li>
            </ul>
          </Card>

          {/* Numbers */}
          <Card i={3} className="md:col-span-3">
            <p className="label-mono">SignBridge, measured</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="display text-5xl">3,215</p>
                <p className="muted mt-1 text-sm">Auslan signs extracted with MediaPipe</p>
              </div>
              <div>
                <p className="display accent text-5xl">83.9%</p>
                <p className="muted mt-1 text-sm">of words signed across 30 test sentences</p>
              </div>
            </div>
          </Card>

          {/* Stack */}
          <Card i={4} className="md:col-span-3">
            <p className="label-mono">Stack I ship with</p>
            <div className="mt-4 grid gap-3">
              {STACK.map((g) => (
                <div key={g.group} className="flex flex-wrap items-center gap-1.5">
                  <span className="muted w-16 shrink-0 text-xs font-semibold uppercase tracking-wider">
                    {g.group}
                  </span>
                  {g.items.map((it) => (
                    <span key={it} className="chip !py-0.5 !text-[13px]">
                      {it}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </Card>

          {/* Workflow */}
          <Card i={5} className="md:col-span-4">
            <p className="label-mono">How I work</p>
            <div className="mt-4 grid grid-cols-4 gap-2" role="tablist" aria-label="Workflow steps">
              {WORKFLOW.map((w, i) => (
                <button
                  key={w.step}
                  type="button"
                  role="tab"
                  aria-selected={i === step}
                  onMouseEnter={() => setStep(i)}
                  onFocus={() => setStep(i)}
                  onClick={() => setStep(i)}
                  className="relative rounded-xl border px-2 py-3 text-center transition-colors"
                  style={{
                    borderColor: i === step ? "var(--accent)" : "var(--border)",
                    background: i === step ? "var(--accent-soft)" : "var(--bg-elev)",
                  }}
                >
                  <span className="muted block text-[11px] tabular-nums">0{i + 1}</span>
                  <span className="heading block text-[15px]">{w.step}</span>
                </button>
              ))}
            </div>
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-[15px] leading-relaxed text-[var(--ink)]"
              aria-live="polite"
            >
              {WORKFLOW[step].example}
            </motion.p>
          </Card>

          {/* Education */}
          <Card i={6} className="md:col-span-2">
            <GraduationCap className="accent h-6 w-6" />
            <p className="label-mono mt-4">Education</p>
            <p className="heading mt-1 text-[17px]">Master of IT (Artificial Intelligence)</p>
            <p className="muted text-[13px]">Charles Darwin University · 2026 to 2027</p>
            <p className="heading mt-3 text-[17px]">Bachelor of IT</p>
            <p className="muted text-[13px]">Victoria University · 2023 to 2025</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
