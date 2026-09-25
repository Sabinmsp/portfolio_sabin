"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Resume", href: "/Sabin_Pradhan_Resume.pdf", primary: true },
  { label: "GitHub", href: "https://github.com/Sabinmsp" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sabin-pradhan-652b333b6/",
  },
  { label: "Email", href: "mailto:sabinmsp@gmail.com" },
];

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
      className="hero-stage flex min-h-[100svh] items-center justify-center"
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
      <div className="page-container flex w-full flex-col items-center pt-28 pb-24 text-center md:pt-32">
        <motion.img
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          src="/sabin.png"
          alt="Sabin Pradhan"
          width={144}
          height={144}
          className="hero-portrait h-28 w-28 rounded-full object-cover object-top md:h-36 md:w-36"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mt-9 flex flex-col items-center"
        >
          <p
            className="label-mono tracking-[0.2em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            AI Engineer
          </p>

          <h1 className="heading mt-4 text-5xl sm:text-6xl md:text-8xl">
            Sabin Pradhan
          </h1>

          <p
            className="mt-6 max-w-xl text-base leading-relaxed text-balance md:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            I build RAG systems and LLM applications with Python and FastAPI.
          </p>

          <p className="label-mono mt-5 inline-flex items-center gap-2">
            <span className="status-available-dot shrink-0" aria-hidden />
            Open to roles · Darwin, NT
          </p>
        </motion.div>

        <motion.nav
          aria-label="Profile links"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-10 flex flex-wrap justify-center gap-2.5"
        >
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.href.startsWith("mailto:")
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
              className={`hero-pill ${link.primary ? "hero-pill--primary" : ""}`}
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ))}
        </motion.nav>
      </div>

      <motion.a
        href="#skills"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 transition-colors hover:text-accent"
        style={{ color: "var(--text-faint)" }}
        aria-label="Scroll to skills"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
