"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const WORDS = ["RAG systems", "LLM apps", "Full-stack", "Client work", "Grounded AI"];

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** A giant band of words that drifts, and speeds up / reverses with your scroll. */
export default function Marquee() {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(-1);
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * 2 * (delta / 1000);
    const b = boost.get();
    if (b < 0) dir.current = 1;
    else if (b > 0) dir.current = -1;
    move += dir.current * move * Math.abs(b);
    base.set(base.get() + move);
  });

  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {WORDS.map((w, i) => (
        <span key={w} className="flex items-center">
          <span className={`marquee-word ${i % 2 ? "marquee-word--outline" : ""}`}>{w}</span>
          <span className="marquee-star" aria-hidden>
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee-band" aria-label={WORDS.join(", ")}>
      <motion.div className="flex w-max" style={reduce ? undefined : { x }}>
        {row(false)}
        {row(true)}
      </motion.div>
    </div>
  );
}
