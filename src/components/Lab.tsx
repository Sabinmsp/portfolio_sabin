"use client";

import { ArrowUpRight } from "lucide-react";
import Reveal, { SectionHeader } from "./Reveal";
import { openSystem } from "@/data/systems";

const STACK =
  "Python, TypeScript, FastAPI, Next.js, RAG, LangChain, Claude and OpenAI APIs, PostgreSQL, Supabase, Qdrant";

function go(id: string) {
  openSystem(id);
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal className="lab-row grid gap-3 border-t border-[var(--border)] py-8 md:grid-cols-[14rem_1fr] md:gap-10">
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
        <SectionHeader index="02" title="The lab" aside="Focus, delivery and tools." />

        <div className="border-b border-[var(--border)]">
          <Row label="Focus">
            <p className="heading text-2xl md:text-3xl">
              Grounded AI: the model reads, code decides.
            </p>
          </Row>

          <Row label="Delivered">
            <p>
              <a href="https://www.postiecoffee.com.au/" target="_blank" rel="noopener noreferrer" className={linkCls}>
                Postie Coffee <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <span className="muted"> · </span>
              <a href="https://sweet-care-virid.vercel.app/" target="_blank" rel="noopener noreferrer" className={linkCls}>
                NDIS provider <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </p>
          </Row>

          <Row label="Recognition">
            <p>
              CDU IT Code Fair 2026 ·{" "}
              <button type="button" onClick={() => go("signbridge")} className={linkCls}>
                SignBridge
              </button>
            </p>
          </Row>

          <Row label="Stack">
            <p>{STACK}</p>
          </Row>
        </div>
      </div>
    </section>
  );
}
