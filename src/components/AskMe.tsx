"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Reveal, { SectionHeader } from "./Reveal";

// Every answer here comes from content elsewhere on this site.
const QA = [
  {
    q: "What does Sabin build?",
    a: "RAG systems and LLM applications, mostly Python and FastAPI on the back end and Next.js on the front.",
    source: "Skills, Projects",
  },
  {
    q: "Has he shipped for real clients?",
    a: "Yes. Online ordering and Square checkout for a Darwin café, with prices recalculated on the server and orders confirmed by signed webhooks. Plus a website for a Darwin NDIS provider, live on Vercel.",
    source: "Projects",
  },
  {
    q: "Best project to look at?",
    a: "SignBridge. It turns text into Auslan signs using 3,215 signs extracted with MediaPipe, and signed 83.9% of words across 30 test sentences. The code is on GitHub.",
    source: "Projects, GitHub",
  },
  {
    q: "Where is he based?",
    a: "Darwin, NT. He's doing a Master of IT in AI at Charles Darwin University and is open to AI engineering roles.",
    source: "Journey",
  },
];

const TYPE_MS = 18;
const HOLD_MS = 4500;

export default function AskMe() {
  const reduceMotion = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState(0);
  const [auto, setAuto] = useState(true);
  const answer = QA[active].a;
  const done = reduceMotion || typed >= answer.length;

  useEffect(() => {
    if (reduceMotion) return;
    if (typed < answer.length) {
      const id = window.setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
      return () => window.clearTimeout(id);
    }
    if (!auto) return;
    const id = window.setTimeout(() => {
      setActive((i) => (i + 1) % QA.length);
      setTyped(0);
    }, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [typed, answer.length, auto, reduceMotion]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
    setTyped(0);
  };

  return (
    <section id="ask" className="section-y">
      <div className="page-container">
        <SectionHeader
          title="Ask about me."
          aside={
            <>
              Grounded answers.
              <br />
              Nothing made up.
            </>
          }
        />

        <Reveal>
          <div className="ask-card grid md:grid-cols-[minmax(0,320px)_1fr]">
            <div
              className="flex flex-col gap-2.5 border-b p-5 md:border-r md:border-b-0 md:p-7"
              style={{ borderColor: "var(--border)" }}
            >
              <p className="label-mono mb-1">Pick a question</p>
              <div className="flex flex-wrap gap-2 md:flex-col md:items-start">
                {QA.map((item, i) => (
                  <button
                    key={item.q}
                    type="button"
                    onClick={() => pick(i)}
                    aria-pressed={i === active}
                    className={`ask-chip text-left ${i === active ? "ask-chip--active" : ""}`}
                  >
                    {item.q}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col p-5 md:p-9" aria-live="polite">
              <p className="label-mono">{QA[active].q}</p>
              <p className="heading mt-4 min-h-[9rem] text-xl font-medium md:min-h-[8rem] md:text-[1.7rem] md:leading-snug">
                {reduceMotion ? answer : answer.slice(0, typed)}
                {done ? null : <span className="ask-caret" aria-hidden />}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <span
                  className="tag tag--soft transition-opacity duration-300"
                  style={{ opacity: done ? 1 : 0 }}
                >
                  Source: {QA[active].source}
                </span>
                <span className="label-mono">
                  Answers come only from this site, which is how I build AI too.
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
