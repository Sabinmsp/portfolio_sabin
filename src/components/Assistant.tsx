"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { SectionHeader } from "./Reveal";
import { FALLBACK, retrieve, SUGGESTED, type Source } from "@/data/knowledge";
import { openSystem } from "@/data/systems";

type Msg =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "bot"; text: string; sources: Source[]; score: number | null };

const MAX_LEN = 300;
let nextId = 1;

function useTyped(text: string, on: boolean) {
  const [n, setN] = useState(on ? 0 : text.length);
  useEffect(() => {
    if (!on) return;
    setN(0);
    const id = window.setInterval(() => {
      setN((x) => {
        if (x >= text.length) {
          window.clearInterval(id);
          return x;
        }
        return Math.min(text.length, x + 3);
      });
    }, 16);
    return () => window.clearInterval(id);
  }, [text, on]);
  return { shown: text.slice(0, n), done: n >= text.length };
}

function BotBubble({ msg, animate }: { msg: Extract<Msg, { role: "bot" }>; animate: boolean }) {
  const { shown, done } = useTyped(msg.text, animate);
  const openSource = (s: Source) => {
    if (s.kind === "system") {
      openSystem(s.id);
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    } else if (s.href.startsWith("#")) {
      document.querySelector(s.href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(s.href, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <div className="bubble bubble--bot">
      <p>
        {shown}
        {done ? null : <span className="ask-caret" aria-hidden />}
      </p>
      {done && msg.sources.length ? (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="muted text-xs">Sources:</span>
          {msg.sources.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => openSource(s)}
              className="chip !text-xs transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {s.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function Assistant() {
  const reduce = useReducedMotion();
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: 0,
      role: "bot",
      text: "Hi, I'm Sabin's guide. Ask about his projects, experience or stack. I only answer from verified notes about his work, and I'll say so when I don't know.",
      sources: [],
      score: null,
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const lastBot = [...msgs].reverse().find((m) => m.role === "bot")?.id;

  const ask = useCallback(
    (raw: string) => {
      const q = raw.trim().slice(0, MAX_LEN);
      if (!q || thinking) return;
      setMsgs((m) => [...m, { id: nextId++, role: "user", text: q }]);
      setInput("");
      setThinking(true);
      window.setTimeout(
        () => {
          const hit = retrieve(q);
          setMsgs((m) => [
            ...m,
            hit
              ? { id: nextId++, role: "bot", text: hit.note.answer, sources: hit.note.sources, score: hit.score }
              : { id: nextId++, role: "bot", text: FALLBACK, sources: [], score: null },
          ]);
          setThinking(false);
        },
        reduce ? 0 : 550,
      );
    },
    [thinking, reduce],
  );

  // Other parts of the page can ask a question here.
  useEffect(() => {
    const on = (e: Event) => ask((e as CustomEvent<string>).detail);
    window.addEventListener("lab:ask", on);
    return () => window.removeEventListener("lab:ask", on);
  }, [ask]);

  // Keep the newest message in view inside the log (not the whole page).
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [msgs, thinking, reduce]);

  return (
    <section id="ask" className="section-y">
      <div className="page-container">
        <SectionHeader
          index="03"
          title="Ask me"
          aside="Answers only from verified notes."
        />

        <div className="panel grid lg:grid-cols-[1fr_20rem]">
          <div className="flex min-h-[30rem] flex-col">
            <div className="flex items-center gap-3 border-b px-5 py-4" style={{ borderColor: "var(--border)" }}>
              <div>
                <p className="heading text-[15px]">Sabin&rsquo;s guide</p>
                <p className="muted inline-flex items-center gap-1.5 text-xs">
                  <span className="status-dot" aria-hidden /> Online · answers in your browser
                </p>
              </div>
            </div>

            <div
              ref={logRef}
              className="flex max-h-[26rem] flex-1 flex-col gap-3 overflow-y-auto px-5 py-5"
              aria-live="polite"
              data-lenis-prevent
            >
              <AnimatePresence initial={false}>
                {msgs.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={m.role === "user" ? "flex justify-end" : ""}
                  >
                    {m.role === "user" ? (
                      <div className="bubble bubble--user">{m.text}</div>
                    ) : (
                      <BotBubble msg={m} animate={!reduce && m.id === lastBot && m.id !== 0} />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {thinking ? (
                <div className="bubble bubble--bot w-fit thinking" aria-label="Thinking">
                  <span />
                  <span />
                  <span />
                </div>
              ) : null}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2 border-t p-3"
              style={{ borderColor: "var(--border)" }}
            >
              <label htmlFor="ask-input" className="sr-only">
                Ask about Sabin
              </label>
              <input
                id="ask-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={MAX_LEN}
                placeholder="Ask about projects, experience or skills…"
                autoComplete="off"
                className="min-w-0 flex-1 rounded-full border bg-transparent px-4 py-3 text-[15px] outline-none focus:border-[var(--accent)]"
                style={{ borderColor: "var(--border-strong)", color: "var(--ink)" }}
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full transition-opacity disabled:opacity-40"
                style={{ background: "var(--accent)", color: "var(--on-accent)" }}
                aria-label="Send question"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </form>
          </div>

          <aside className="border-t p-5 lg:border-t-0 lg:border-l" style={{ borderColor: "var(--border)" }}>
            <p className="label-mono">Try asking</p>
            <div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:items-start">
              {SUGGESTED.slice(0, 3).map((q) => (
                <button key={q} type="button" onClick={() => ask(q)} className="ask-chip text-left">
                  {q}
                </button>
              ))}
            </div>

          </aside>
        </div>
      </div>
    </section>
  );
}
