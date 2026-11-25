"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { SectionHeader } from "./Reveal";
import {
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
              className={`sys-edge ${hot ? "sys-edge--hot sys-edge--flow" : ""}`}
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
          index="01"
          title="Projects"
          aside="Pick a system and click any step to see what it does and why."
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
                  <span className="sys-tab__name whitespace-nowrap">{s.name}</span>
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
                    <h3 className="heading mt-3 text-2xl md:text-3xl">{system.name}</h3>
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
                </div>
                <div className="mt-6 md:hidden">
                  <StepList system={system} active={active} onSelect={pick} />
                </div>

                {/* The selected step, in one or two lines */}
                <div className="mt-5 hidden min-h-[3.5rem] md:block" aria-live="polite">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={node.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="max-w-3xl leading-relaxed"
                    >
                      <span className="heading">{node.label}.</span>{" "}
                      <span className="muted">{node.detail}</span>
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Other work */}
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          {otherWork.map((w) => (
            <li key={w.name}>
              <a href={w.href} target="_blank" rel="noopener noreferrer" className="link-quiet inline-flex items-center gap-1">
                {w.name} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
