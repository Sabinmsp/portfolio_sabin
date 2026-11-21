"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import IntroCode from "./IntroCode";

const PROOF = [
  { value: "2", label: "client projects shipped" },
  { value: "3,215", label: "Auslan signs extracted" },
  { value: "14B", label: "model fine-tuned on one GPU" },
];

const TYPED = ["RAG SYSTEMS", "LLM APPS", "FULL-STACK BUILDS", "CLIENT WORK"];

const EASE = [0.22, 1, 0.36, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Types a phrase, holds, deletes it, then moves to the next one. */
function TypeLoop({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const word = words[i];

  useEffect(() => {
    if (reduce) return;
    let ms = deleting ? 40 : 85;
    if (!deleting && n === word.length) ms = 1800;
    if (deleting && n === 0) ms = 300;
    const id = window.setTimeout(() => {
      if (!deleting && n === word.length) setDeleting(true);
      else if (deleting && n === 0) {
        setDeleting(false);
        setI((x) => (x + 1) % words.length);
      } else setN((x) => x + (deleting ? -1 : 1));
    }, ms);
    return () => window.clearTimeout(id);
  }, [n, deleting, word.length, words.length, reduce]);

  return (
    <span aria-label={words.join(", ")}>
      <span aria-hidden>{reduce ? word : word.slice(0, n)}</span>
      <span className="type-caret" aria-hidden />
    </span>
  );
}

/** A line of the big intro title that slides up from behind a mask. */
function MaskLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

type Geo = {
  size: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
  travel: number;
};

export default function Hero() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const geo = useRef<Geo | null>(null);
  const [fly, setFly] = useState(false);
  const [size, setSize] = useState(0);

  // The flying portrait only runs on wide screens with motion allowed.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setFly(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  // Measure where the portrait starts (intro) and lands (hero slot).
  useIsoLayoutEffect(() => {
    if (!fly) return;
    const measure = () => {
      const wrap = wrapRef.current;
      const intro = introRef.current;
      const slot = slotRef.current;
      if (!wrap || !intro || !slot) return;
      const w = wrap.getBoundingClientRect();
      const s = slot.getBoundingClientRect();
      const introH = intro.offsetHeight;
      const sz = s.width;
      geo.current = {
        size: sz,
        from: { x: w.width / 2 - sz / 2, y: introH - sz * 0.78 },
        to: { x: s.left - w.left, y: s.top - w.top },
        travel: Math.max(1, s.top - w.top - (introH - sz * 0.78)),
      };
      setSize(sz);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [fly]);

  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (v) => {
    const g = geo.current;
    if (!g) return 0;
    return Math.min(1, Math.max(0, v / g.travel));
  });
  const x = useTransform(progress, (p) => {
    const g = geo.current;
    return g ? g.from.x + (g.to.x - g.from.x) * p : 0;
  });
  const y = useTransform(progress, (p) => {
    const g = geo.current;
    return g ? g.from.y + (g.to.y - g.from.y) * p : 0;
  });
  const rotateY = useTransform(progress, [0, 0.5, 1], [0, -55, 0]);
  const rotateX = useTransform(progress, [0, 0.5, 1], [0, 12, 0]);
  const rotateZ = useTransform(progress, [0, 0.5, 1], [0, 9, 0]);
  const introFade = useTransform(scrollY, [0, 500], [1, 0]);
  const introLift = useTransform(scrollY, [0, 500], [0, -120]);

  const year = new Date().getFullYear();

  return (
    <div id="top" ref={wrapRef} className="relative" style={{ perspective: 1400 }}>
      {/* ——— Intro screen ——— */}
      <section
        ref={introRef}
        aria-label="Introduction"
        className="relative flex h-[100svh] min-h-[600px] flex-col justify-between overflow-hidden pt-28 pb-8 md:pt-32 md:pb-10"
      >
        <IntroCode />
        <motion.div
          style={reduce ? undefined : { opacity: introFade, y: introLift }}
          className="page-container max-lg:flex max-lg:flex-1 max-lg:items-center max-lg:justify-center"
        >
          <h1 className="intro-title text-center">
            <MaskLine delay={0.15}>
              <span className="intro-bracket">&lt;</span> GROUNDED
            </MaskLine>
            <MaskLine delay={0.3}>
              AI ENGINEER <span className="intro-bracket">/&gt;</span>
            </MaskLine>
            <span className="sr-only">Sabin Pradhan</span>
          </h1>
        </motion.div>

        <div className="page-container flex items-end justify-between gap-4">
          <motion.p
            {...rise(0.7)}
            className="display text-4xl md:text-6xl"
          >
            &copy;{year}
          </motion.p>
          <motion.p
            {...rise(0.85)}
            className="font-display text-right text-lg font-semibold tracking-tight md:text-2xl"
            style={{ color: "var(--ink)" }}
          >
            {"{{ /"}
            <TypeLoop words={TYPED} />
            {" }}"}
          </motion.p>
        </div>
      </section>

      {/* ——— Hero ——— */}
      <section id="about" className="relative">
        <div className="page-container grid min-h-[100svh] items-center gap-10 pt-24 pb-16 md:pt-32 lg:grid-cols-[1fr_minmax(0,380px)_1fr] lg:gap-12 lg:pb-24">
          <Reveal className="order-2 lg:order-1">
            <motion.h2
              className="display text-6xl sm:text-7xl xl:text-[6.5rem]"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <RevealLine>Hi, I&rsquo;m</RevealLine>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <RevealLine delay={0.1}>Sabin.</RevealLine>
              </span>
            </motion.h2>
            <p className="heading mt-6 text-2xl md:text-3xl">
              AI Engineer
              <br />& Full-Stack Developer.
            </p>

            <div
              className="mt-8 max-w-sm border-t pt-5"
              style={{ borderColor: "var(--border)" }}
            >
              <p className="label-mono">Currently</p>
              <p className="heading mt-2 text-base">
                Master of IT (Artificial Intelligence)
              </p>
              <p className="text-[15px]">Charles Darwin University</p>
              <p className="muted inline-flex items-center gap-2 text-[15px]">
                <span className="status-dot" aria-hidden />
                Darwin, NT · open to roles
              </p>
            </div>
          </Reveal>

          {/* Portrait slot: the flying portrait lands here on desktop */}
          <div
            ref={slotRef}
            className="order-1 mx-auto aspect-square w-[min(72vw,320px)] lg:order-2 lg:mb-6 lg:w-full"
          >
            {fly ? null : (
              <Reveal>
                <div className="portrait aspect-square">
                  <img
                    src="/sabin.png"
                    alt="Sabin Pradhan"
                    width={566}
                    height={588}
                  />
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.12} className="order-3">
            <p className="font-display text-2xl leading-snug md:text-[1.75rem]">
              I build <strong className="font-semibold">RAG systems</strong>{" "}
              and <strong className="font-semibold">LLM apps</strong> that
              check their facts, and ship{" "}
              <strong className="font-semibold">
                real products for clients
              </strong>
              .
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#projects" className="btn-ink">
                Explore projects
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/Sabin_Pradhan-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line"
              >
                Resume
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <dl className="mt-9 grid grid-cols-3 gap-4">
              {PROOF.map((p) => (
                <div key={p.label}>
                  <dt className="sr-only">{p.label}</dt>
                  <dd>
                    <span className="display block text-3xl md:text-4xl">
                      {p.value}
                    </span>
                    <span className="muted mt-1.5 block text-xs leading-snug md:text-[13px]">
                      {p.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ——— Flying portrait (desktop) ——— */}
      {fly && size > 0 ? (
        <motion.div
          className="pointer-events-none absolute top-0 left-0 z-10"
          style={{
            width: size,
            height: size,
            x,
            y,
            rotateX,
            rotateY,
            rotateZ,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.45, ease: EASE }}
            className="portrait pointer-events-auto h-full w-full"
          >
            <img src="/sabin.png" alt="Sabin Pradhan" width={566} height={588} />
          </motion.div>
        </motion.div>
      ) : null}
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RevealLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  // Driven by the parent's whileInView, because a span hidden behind a
  // mask never counts as "in view" itself.
  return (
    <motion.span
      className="block"
      variants={{
        hidden: { y: "110%" },
        show: { y: "0%", transition: { duration: 0.9, delay, ease: EASE } },
      }}
    >
      {children}
    </motion.span>
  );
}
