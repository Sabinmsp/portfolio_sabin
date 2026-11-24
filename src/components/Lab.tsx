"use client";

import { ArrowUpRight } from "lucide-react";
import Reveal, { SectionHeader } from "./Reveal";
import { openSystem } from "@/data/systems";

const PRINCIPLES = [
  { text: "The model's output is validated again before it is trusted", system: "careeros", where: "CareerOS" },
  { text: "Quotes and facts are checked against the source text", system: "triage", where: "Housing triage" },
  { text: "A deterministic fallback, so users never get an error page", system: "careeros", where: "CareerOS" },
  { text: "The model reads; code decides scores and rankings", system: "triage", where: "Housing triage" },
];

const STACK = [
  { group: "AI", items: "RAG, LangChain, Claude and OpenAI APIs, Hugging Face (PEFT, TRL), MediaPipe" },
  { group: "Backend", items: "Python, FastAPI, TypeScript, Node.js, Zod, Pydantic" },
  { group: "Data", items: "PostgreSQL, Supabase, pgvector, Qdrant, SQLite" },
  { group: "Web", items: "Next.js, React, Tailwind, Vercel, Docker" },
];

const WORKFLOW = [
  { step: "Brief", example: "Postie's public site went live first; online ordering waits for the owner's decision." },
  { step: "Prototype", example: "SignBridge worked on real data before any polish." },
  { step: "Verify", example: "88 JS tests plus browser suites on SignBridge, 23 scoring tests on CareerOS, property tests on triage ranking." },
  { step: "Ship", example: "Postie Coffee and the NDIS provider site are live for real customers." },
];

function go(id: string) {
  openSystem(id);
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-3 border-t border-[var(--border)] py-8 md:grid-cols-[14rem_1fr] md:gap-10">
      <h3 className="label-mono pt-1">{label}</h3>
      <div>{children}</div>
    </Reveal>
  );
}

const linkCls =
  "inline-flex items-center gap-1 text-[var(--ink)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors hover:decoration-[var(--accent)]";

export default function Lab() {
  return (
    <section id="lab" className="section-y">
      <div className="page-container">
        <SectionHeader title="Inside the lab" aside={<>Focus, delivery and how I work.</>} />

        <div className="border-b border-[var(--border)]">
          <Row label="Focus">
            <p className="heading text-2xl md:text-3xl">
              Grounded AI: the model reads, code decides.
            </p>
            <ul className="mt-5 grid gap-2.5">
              {PRINCIPLES.map((p) => (
                <li key={p.text} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <span>{p.text}</span>
                  <button type="button" onClick={() => go(p.system)} className="muted text-sm hover:text-[var(--accent)]">
                    {p.where} →
                  </button>
                </li>
              ))}
            </ul>
          </Row>

          <Row label="Delivered">
            <ul className="grid gap-2.5">
              <li>
                <a href="https://www.postiecoffee.com.au/" target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Postie Coffee <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <span className="muted"> · café website, live; ordering system built</span>
              </li>
              <li>
                <a href="https://sweet-care-virid.vercel.app/" target="_blank" rel="noopener noreferrer" className={linkCls}>
                  NDIS provider <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <span className="muted"> · website from the client&rsquo;s brief, live</span>
              </li>
            </ul>
          </Row>

          <Row label="Recognition">
            <p>
              CDU IT Code Fair 2026 ·{" "}
              <button type="button" onClick={() => go("signbridge")} className={linkCls}>
                SignBridge
              </button>
            </p>
            <p className="muted mt-1 text-sm">
              3,215 Auslan signs extracted; 83.9% of words signed across 30 test sentences.
            </p>
          </Row>

          <Row label="Stack">
            <dl className="grid gap-2">
              {STACK.map((g) => (
                <div key={g.group} className="grid grid-cols-[5.5rem_1fr] gap-4">
                  <dt className="muted">{g.group}</dt>
                  <dd>{g.items}</dd>
                </div>
              ))}
            </dl>
          </Row>

          <Row label="How I work">
            <ol className="grid gap-2.5">
              {WORKFLOW.map((w, i) => (
                <li key={w.step} className="grid grid-cols-[5.5rem_1fr] gap-4">
                  <span className="muted">
                    {i + 1}. {w.step}
                  </span>
                  <span>{w.example}</span>
                </li>
              ))}
            </ol>
          </Row>

          <Row label="Education">
            <p className="text-[var(--ink)]">Master of IT (Artificial Intelligence)</p>
            <p className="muted text-sm">Charles Darwin University · 2026 to 2027</p>
            <p className="mt-3 text-[var(--ink)]">Bachelor of IT</p>
            <p className="muted text-sm">Victoria University · 2023 to 2025</p>
          </Row>
        </div>
      </div>
    </section>
  );
}
