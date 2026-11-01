"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Resume", href: "/Sabin_Pradhan_Resume.pdf" },
  { label: "GitHub", href: "https://github.com/Sabinmsp" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sabin-pradhan-652b333b6/",
  },
];

const PROOF = [
  { value: "2", label: "client projects shipped" },
  { value: "3,215", label: "Auslan signs extracted" },
  { value: "14B", label: "model fine-tuned on one GPU" },
];

// Every answer here comes from content elsewhere on this site.
const QA = [
  {
    q: "What does Sabin build?",
    a: "RAG systems and LLM applications, mostly Python and FastAPI on the back end and Next.js on the front.",
    source: "Skills, Projects",
  },
  {
    q: "Has he shipped for real clients?",
    a: "Yes. Online ordering and Square checkout for a Darwin caf\u00e9, with prices recalculated on the server and orders confirmed by signed webhooks. Plus a website for a Darwin NDIS provider, live on Vercel.",
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
    source: "Education",
  },
];

const TYPE_MS = 18;
const HOLD_MS = 4200;

function AskCard({ reduceMotion }: { reduceMotion: boolean }) {
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
    <div className="ask-card" aria-label="Ask about Sabin">
      <div className="ask-card__bar">
        <span className="ask-card__dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="label-mono">ask-sabin</span>
        <span className="label-mono ml-auto" style={{ color: "var(--accent)" }}>
          grounded
        </span>
      </div>

      <div className="flex flex-wrap gap-2 px-4 pt-4 md:px-5">
        {QA.map((item, i) => (
          <button
            key={item.q}
            type="button"
            onClick={() => pick(i)}
            aria-pressed={i === active}
            className={`ask-chip ${i === active ? "ask-chip--active" : ""}`}
          >
            {item.q}
          </button>
        ))}
      </div>

      <div className="px-4 pt-5 pb-5 md:px-5" aria-live="polite">
        <p className="font-mono text-[13px]" style={{ color: "var(--text-faint)" }}>
          <span style={{ color: "var(--accent)" }}>&gt;</span> {QA[active].q}
        </p>
        <p
          className="mt-3 min-h-[6.5rem] text-[15px] leading-relaxed md:text-base"
          style={{ color: "var(--text-heading)" }}
        >
          {reduceMotion ? answer : answer.slice(0, typed)}
          {done ? null : <span className="ask-caret" aria-hidden />}
        </p>
        <p
          className="label-mono mt-3 transition-opacity duration-300"
          style={{ opacity: done ? 1 : 0 }}
        >
          source: {QA[active].source}
        </p>
      </div>

      <p className="ask-card__foot">
        Answers come only from this site. Nothing made up, which is how I
        build AI too.
      </p>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Scroll: the glow blooms as the visitor starts scrolling, then fades out
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const glowScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.7]);
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.75],
    [0.4, 1, 0],
  );

  // Touch / pointer: a smaller glow follows the finger or cursor
  const spotX = useSpring(useMotionValue(0), { stiffness: 220, damping: 28 });
  const spotY = useSpring(useMotionValue(0), { stiffness: 220, damping: 28 });
  const spotOpacity = useSpring(0, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;

    const moveTo = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      spotX.set(clientX - rect.left);
      spotY.set(clientY - rect.top);
      spotOpacity.set(1);
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) moveTo(t.clientX, t.clientY);
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === "mouse") moveTo(e.clientX, e.clientY);
    };
    const hide = () => spotOpacity.set(0);

    el.addEventListener("touchstart", onTouch, { passive: true });
    el.addEventListener("touchmove", onTouch, { passive: true });
    el.addEventListener("touchend", hide);
    el.addEventListener("touchcancel", hide);
    el.addEventListener("pointermove", onPointer);
    el.addEventListener("pointerleave", hide);
    return () => {
      el.removeEventListener("touchstart", onTouch);
      el.removeEventListener("touchmove", onTouch);
      el.removeEventListener("touchend", hide);
      el.removeEventListener("touchcancel", hide);
      el.removeEventListener("pointermove", onPointer);
      el.removeEventListener("pointerleave", hide);
    };
  }, [reduceMotion, spotX, spotY, spotOpacity]);

  return (
    <section
      ref={ref}
      id="about"
      className="hero-stage flex min-h-[100svh] items-center"
    >
      <motion.div
        aria-hidden
        className="hero-glow"
        style={
          reduceMotion ? undefined : { scale: glowScale, opacity: glowOpacity }
        }
      />
      {reduceMotion ? null : (
        <motion.div
          aria-hidden
          className="hero-spotlight"
          style={{ x: spotX, y: spotY, opacity: spotOpacity }}
        />
      )}
      <div className="page-container grid w-full items-center gap-12 pt-28 pb-24 md:pt-32 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4">
            <img
              src="/sabin.png"
              alt="Sabin Pradhan"
              width={64}
              height={64}
              className="hero-portrait h-14 w-14 rounded-full object-cover object-top md:h-16 md:w-16"
            />
            <div>
              <p className="heading text-lg md:text-xl">Sabin Pradhan</p>
              <p className="label-mono mt-1 inline-flex items-center gap-2">
                <span className="status-available-dot shrink-0" aria-hidden />
                AI Engineer · Open to roles · Darwin, NT
              </p>
            </div>
          </div>

          <h1 className="heading mt-8 text-[2.5rem] leading-[1.05] text-balance sm:text-5xl xl:text-[4rem]">
            I build AI that{" "}
            <span className="text-accent">checks its facts</span>, then ship
            it.
          </h1>

          <p
            className="mt-5 max-w-xl text-base leading-relaxed text-pretty md:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            RAG systems and LLM apps in Python, FastAPI and Next.js. I&apos;ve
            built ordering and payments for a Darwin caf&eacute; and a website
            for a local NDIS provider, so I know what it takes to put software
            in front of real customers.
          </p>

          <nav
            aria-label="Profile links"
            className="mt-8 flex flex-wrap gap-2.5"
          >
            <a href="#projects" className="hero-pill hero-pill--primary">
              See my work
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-pill"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </nav>

          <dl className="mt-9 grid max-w-xl grid-cols-3 gap-4 border-t pt-6" style={{ borderColor: "var(--border)" }}>
            {PROOF.map((p) => (
              <div key={p.label}>
                <dt className="sr-only">{p.label}</dt>
                <dd>
                  <span className="heading block text-2xl md:text-3xl">{p.value}</span>
                  <span className="mt-1 block text-xs leading-snug md:text-[13px]" style={{ color: "var(--text-muted)" }}>
                    {p.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
        >
          <AskCard reduceMotion={!!reduceMotion} />
        </motion.div>
      </div>

      <motion.a
        href="#skills"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 transition-colors hover:text-accent md:block"
        style={{ color: "var(--text-faint)" }}
        aria-label="Scroll to skills"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
