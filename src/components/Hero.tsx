"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Award, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import NodeField from "./NodeField";
import { Magnetic } from "./Interactive";
import { LINKS, openSystem, systems } from "@/data/systems";

const EASE = [0.22, 1, 0.36, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

/** Where each system sits in the hero constellation (percent of the hero). */
const CONSTELLATION: Record<string, { x: number; y: number }> = {
  signbridge: { x: 66, y: 24 },
  postie: { x: 86, y: 19 },
  careeros: { x: 92, y: 45 },
  triage: { x: 75, y: 51 },
  gym: { x: 66, y: 74 },
  qlora: { x: 88, y: 72 },
};
const PATH_ORDER = ["signbridge", "postie", "careeros", "triage", "qlora", "gym"];

function MaskLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.05, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function goToSystem(id: string) {
  openSystem(id);
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const fieldY = useTransform(scrollY, [0, 900], [0, 180]);
  const fieldOpacity = useTransform(scrollY, [0, 700], [1, 0.25]);

  const pathD = PATH_ORDER.map((id, i) => {
    const p = CONSTELLATION[id];
    return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
  }).join(" ");

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Living network */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduce ? undefined : { y: fieldY, opacity: fieldOpacity }}
      >
        <NodeField className="hero-canvas" />
        <div className="hero-fade" />
      </motion.div>

      {/* Project constellation (desktop): each dot opens that system */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.path
            d={pathD}
            className="sys-edge sys-edge--flow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1.6, delay: 1.2, ease: EASE }}
          />
        </svg>
        {PATH_ORDER.map((id, i) => {
          const s = systems.find((x) => x.id === id)!;
          const p = CONSTELLATION[id];
          return (
            <motion.button
              key={id}
              type="button"
              onClick={() => goToSystem(id)}
              className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1 + i * 0.18, ease: EASE }}
              aria-label={`Open the ${s.name} system diagram`}
            >
              <span className="group flex items-center gap-2.5">
                <span className="relative grid h-4 w-4 place-items-center">
                  <span className="absolute h-4 w-4 rounded-full bg-[var(--accent-soft)] transition-transform duration-300 group-hover:scale-[2.2]" />
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
                <span className="nav-pill px-3 py-1 text-[13px] font-medium whitespace-nowrap transition-colors group-hover:border-[var(--accent-line)] group-hover:text-[var(--accent)]">
                  {s.name}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="page-container relative flex flex-1 flex-col justify-center pt-32 pb-10 md:pt-36">
        <motion.p {...rise(0.15)} className="label-mono inline-flex items-center gap-2.5">
          <span className="status-dot" aria-hidden />
          Open to AI engineering roles · Darwin, NT
        </motion.p>

        <h1 id="hero-title" className="hero-title mt-6 max-w-[15ch] lg:max-w-[11.5ch]">
          <MaskLine delay={0.25}>I turn complex</MaskLine>
          <MaskLine delay={0.37}>ideas into</MaskLine>
          <MaskLine delay={0.49}>
            <span className="accent">intelligent</span> systems.
          </MaskLine>
        </h1>

        <motion.p {...rise(0.75)} className="mt-7 max-w-xl text-lg leading-relaxed md:text-xl">
          AI Engineer &amp; Full-Stack Developer building real-world software,
          automation and AI experiences.
        </motion.p>

        <motion.div {...rise(0.9)} className="mt-9 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a href="#projects" className="btn-ink">
              View projects
              <ArrowRight className="h-4 w-4" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" className="btn-line">
              Resume
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="btn-line">
              Contact
            </a>
          </Magnetic>
          <span className="muted ml-1 hidden items-center gap-1.5 text-sm md:inline-flex">
            or press <span className="kbd">⌘</span>
            <span className="kbd">K</span> to explore
          </span>
        </motion.div>
      </div>

      {/* The 10-second recruiter summary */}
      <motion.div {...rise(1.1)} className="page-container relative pb-8 md:pb-10">
        <dl
          className="grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-4"
          style={{ borderColor: "var(--border)", background: "var(--border)" }}
        >
          <div className="flex items-center gap-3 p-4 md:p-5" style={{ background: "var(--bg-elev)" }}>
            <div className="portrait h-11 w-11 shrink-0">
              <Image src="/sabin.png" alt="" width={44} height={44} sizes="44px" />
            </div>
            <div>
              <dt className="sr-only">Who</dt>
              <dd className="heading text-[15px]">Sabin Pradhan</dd>
              <dd className="muted text-[13px]">AI Engineer · Full-Stack</dd>
            </div>
          </div>
          <div className="p-4 md:p-5" style={{ background: "var(--bg-elev)" }}>
            <dt className="label-mono">Builds</dt>
            <dd className="mt-1 text-[14px] text-[var(--ink)]">
              RAG pipelines, LLM apps and full-stack products
            </dd>
          </div>
          <div className="p-4 md:p-5" style={{ background: "var(--bg-elev)" }}>
            <dt className="label-mono">Delivered</dt>
            <dd className="mt-1 text-[14px] text-[var(--ink)]">
              Live sites for Postie Coffee and an NDIS provider
            </dd>
          </div>
          <div className="flex items-start justify-between gap-3 p-4 md:p-5" style={{ background: "var(--bg-elev)" }}>
            <div>
              <dt className="label-mono inline-flex items-center gap-1.5">
                <Award className="accent h-3.5 w-3.5" /> Recognised
              </dt>
              <dd className="mt-1 text-[14px] text-[var(--ink)]">
                CDU IT Code Fair 2026 · SignBridge
              </dd>
            </div>
            <div className="flex gap-1.5">
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="icon-box" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="icon-box" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </dl>
      </motion.div>
    </section>
  );
}
