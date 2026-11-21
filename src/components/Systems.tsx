"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Pause, Play } from "lucide-react";
import { SectionHeader } from "./Reveal";
import {
  askAssistant,
  otherWork,
  systems,
  type System,
  type SystemNode,
} from "@/data/systems";

const EASE = [0.22, 1, 0.36, 1] as const;
const TOUR_MS = 2600;

// Diagram coordinates are 0-100; pad them so nodes never touch the edges.
const X = (x: number) => 8 + x * 0.84;
const Y = (y: number) => 12 + y * 0.76;

function edgePath(a: SystemNode, b: SystemNode) {
  const ax = X(a.x);
  const ay = Y(a.y);
  const bx = X(b.x);
  const by = Y(b.y);
  const mx = (ax + bx) / 2;
  return `M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${by}, ${bx} ${by}`;
}

function toneClass(s: System) {
  return s.statusTone === "live" ? "tag tag--live" : "tag";
}

function Diagram({
  system,
  active,
  onSelect,
}: {
  system: System;
  active: string;
  onSelect: (id: string) => void;
}) {
  const byId = Object.fromEntries(system.nodes.map((n) => [n.id, n]));
  const linked = new Set<string>([active]);
  for (const e of system.edges) {
    if (e.from === active) linked.add(e.to);
    if (e.to === active) linked.add(e.from);
  }

  return (
    <div className="sys-canvas" role="group" aria-label={`${system.name} architecture`}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {system.edges.map((e) => {
          const hot = e.from === active || e.to === active;
          return (
            <motion.path
              key={`${e.from}-${e.to}`}
              d={edgePath(byId[e.from], byId[e.to])}
              className={`sys-edge ${hot ? "sys-edge--hot sys-edge--flow" : "sys-edge--flow"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: hot ? 1 : 0.55 }}
              transition={{ duration: 0.8, ease: EASE }}
            />
          );
        })}
      </svg>

      {system.edges
        .filter((e) => e.label)
        .map((e) => {
          const a = byId[e.from];
          const b = byId[e.to];
          return (
            <span
              key={`l-${e.from}-${e.to}`}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-1.5 text-[10px] tracking-wide whitespace-nowrap"
              style={{
                left: `${(X(a.x) + X(b.x)) / 2}%`,
                top: `${(Y(a.y) + Y(b.y)) / 2}%`,
                background: "var(--bg-elev)",
                color: "var(--text-muted)",
              }}
            >
              {e.label}
            </span>
          );
        })}

      {system.nodes.map((n, i) => (
        <motion.button
          key={n.id}
          type="button"
          onClick={() => onSelect(n.id)}
          onFocus={() => onSelect(n.id)}
          aria-pressed={n.id === active}
          className={`sys-node ${n.id === active ? "sys-node--active" : ""} ${
            linked.has(n.id) ? "" : "sys-node--dim"
          }`}
          style={{ left: `${X(n.x)}%`, top: `${Y(n.y)}%` }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }}
        >
          {n.mine ? <span className="sys-node__mine">Mine</span> : null}
          <span className="sys-node__label">{n.label}</span>
          <span className="sys-node__kind">{n.kind}</span>
        </motion.button>
      ))}
    </div>
  );
}

/** Phones: the same pipeline as a tappable vertical list. */
function StepList({
  system,
  active,
  onSelect,
}: {
  system: System;
  active: string;
  onSelect: (id: string) => void;
}) {
  const byId = Object.fromEntries(system.nodes.map((n) => [n.id, n]));
  return (
    <ol className="relative grid gap-2">
      <span
        aria-hidden
        className="absolute top-4 bottom-4 left-[1.05rem] w-px"
        style={{ background: "var(--border-strong)" }}
      />
      {system.tour.map((id) => {
        const n = byId[id];
        const on = id === active;
        return (
          <li key={id} className="relative">
            <button
              type="button"
              onClick={() => onSelect(id)}
              aria-expanded={on}
              className="flex w-full items-start gap-3 rounded-xl p-2 text-left"
              style={{ background: on ? "var(--accent-soft)" : "transparent" }}
            >
              <span
                className="relative z-10 mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border"
                style={{
                  borderColor: on ? "var(--accent)" : "var(--border-strong)",
                  background: "var(--bg)",
                }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: on ? "var(--accent)" : "var(--text-faint)" }}
                />
              </span>
              <span>
                <span className="heading block text-[15px]">
                  {n.label}
                  {n.mine ? <span className="accent ml-2 text-[11px] font-bold uppercase">Mine</span> : null}
                </span>
                <span className="muted block text-[13px]">{n.kind}</span>
                {on ? <span className="mt-2 block text-[14px] leading-relaxed">{n.detail}</span> : null}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export default function Systems() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-25% 0px -25% 0px" });
  const [sysId, setSysId] = useState(systems[0].id);
  const system = systems.find((s) => s.id === sysId)!;
  const [active, setActive] = useState(system.tour[0]);
  const [touring, setTouring] = useState(true);
  const node = system.nodes.find((n) => n.id === active)!;

  const choose = useCallback((id: string) => {
    const s = systems.find((x) => x.id === id);
    if (!s) return;
    setSysId(id);
    setActive(s.tour[0]);
    setTouring(true);
  }, []);

  const pick = (id: string) => {
    setTouring(false);
    setActive(id);
  };

  // Other parts of the page (hero, assistant, palette) can open a system.
  useEffect(() => {
    const on = (e: Event) => choose((e as CustomEvent<string>).detail);
    window.addEventListener("lab:open-system", on);
    return () => window.removeEventListener("lab:open-system", on);
  }, [choose]);

  // Auto-tour: walk the pipeline while the section is on screen.
  useEffect(() => {
    if (!touring || reduce || !inView) return;
    const id = window.setInterval(() => {
      setActive((cur) => {
        const i = system.tour.indexOf(cur);
        return system.tour[(i + 1) % system.tour.length];
      });
    }, TOUR_MS);
    return () => window.clearInterval(id);
  }, [touring, reduce, inView, system]);

  // Keyboard: arrow keys move through the pipeline.
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const i = system.tour.indexOf(active);
    const next = e.key === "ArrowRight" ? i + 1 : i - 1;
    pick(system.tour[(next + system.tour.length) % system.tour.length]);
  };

  return (
    <section id="projects" ref={sectionRef} className="section-y">
      <div className="page-container">
        <SectionHeader
          title={
            <>
              Systems I&rsquo;ve <span className="accent">built.</span>
            </>
          }
          aside={
            <>
              Pick a system, then click any node to see what it does and why.
            </>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[17rem_1fr]">
          {/* System picker */}
          <div
            role="tablist"
            aria-label="Systems"
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
          >
            {systems.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                type="button"
                aria-selected={s.id === sysId}
                aria-controls="system-panel"
                onClick={() => choose(s.id)}
                className={`sys-tab shrink-0 lg:shrink ${s.id === sysId ? "sys-tab--active" : ""}`}
              >
                <span>
                  <span className="muted mr-2 text-xs tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="heading text-[15px] whitespace-nowrap">{s.name}</span>
                </span>
                <span
                  aria-hidden
                  className="hidden h-2 w-2 shrink-0 rounded-full lg:block"
                  style={{ background: s.id === sysId ? "var(--accent)" : "var(--border-strong)" }}
                />
              </button>
            ))}
          </div>

          {/* The selected system */}
          <div id="system-panel" role="tabpanel" className="panel p-4 md:p-6" onKeyDown={onKey}>
            <AnimatePresence mode="wait">
              <motion.div
                key={system.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className={toneClass(system)}>{system.status}</span>
                    <h3 className="heading mt-3 text-3xl md:text-4xl">{system.name}</h3>
                    <p className="muted mt-1 max-w-xl">{system.tagline}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setTouring((t) => !t)}
                      className="btn-line !px-3 !py-2 text-sm"
                      aria-label={touring ? "Pause the tour" : "Play the tour"}
                    >
                      {touring ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      <span className="hidden sm:inline">{touring ? "Pause tour" : "Play tour"}</span>
                    </button>
                    {system.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-line !px-3 !py-2 text-sm"
                      >
                        {l.label}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-6 hidden md:block">
                  <Diagram system={system} active={active} onSelect={pick} />
                  <p className="muted mt-2 text-xs">
                    Tip: use ← and → to step through the pipeline.
                  </p>
                </div>
                <div className="mt-6 md:hidden">
                  <StepList system={system} active={active} onSelect={pick} />
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-[1.3fr_1fr]">
                  {/* Selected node */}
                  <div
                    className="hidden rounded-2xl border p-5 md:block"
                    style={{ borderColor: "var(--border)", background: "var(--bg-elev)" }}
                    aria-live="polite"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="label-mono">
                          Step {system.tour.indexOf(node.id) + 1} of {system.tour.length}
                          {node.mine ? " · my stage" : ""}
                        </p>
                        <p className="heading mt-2 text-xl">{node.label}</p>
                        <p className="mt-2 leading-relaxed">{node.detail}</p>
                        {node.tech?.length ? (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {node.tech.map((t) => (
                              <span key={t} className="chip">
                                {t}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Facts */}
                  <div>
                    <p className="leading-relaxed">{system.summary}</p>
                    <dl className="mt-5 grid grid-cols-3 gap-3">
                      {system.facts.map((f) => (
                        <div key={f.label}>
                          <dt className="sr-only">{f.label}</dt>
                          <dd>
                            <span className="display block text-2xl md:text-3xl">{f.value}</span>
                            <span className="muted mt-1 block text-xs leading-snug">{f.label}</span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                    {system.note ? (
                      <p className="muted mt-5 border-l-2 pl-3 text-sm" style={{ borderColor: "var(--accent-line)" }}>
                        {system.note}
                      </p>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => {
                        askAssistant(`Tell me about ${system.name}`);
                        document.getElementById("ask")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="accent mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Ask the assistant about {system.name}
                    </button>
                  </div>
                </div>

                {system.media ? (
                  <figure className="mt-6 overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border)" }}>
                    <Image
                      src={system.media.src}
                      alt={system.media.alt}
                      width={system.media.width}
                      height={system.media.height}
                      sizes="(min-width: 1024px) 900px, 100vw"
                      className="h-auto w-full"
                    />
                    <figcaption className="muted border-t px-4 py-2 text-xs" style={{ borderColor: "var(--border)" }}>
                      The running app: {system.media.alt}.
                    </figcaption>
                  </figure>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Other work */}
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {otherWork.map((w) => (
            <a
              key={w.name}
              href={w.href}
              target="_blank"
              rel="noopener noreferrer"
              className="panel group flex items-start justify-between gap-4 p-5 transition-colors hover:border-[var(--accent-line)]"
            >
              <span>
                <span className="tag">{w.tag}</span>
                <span className="heading mt-3 block text-xl">{w.name}</span>
                <span className="muted mt-1 block text-[15px]">{w.detail}</span>
              </span>
              <span className="icon-box shrink-0" aria-hidden>
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
