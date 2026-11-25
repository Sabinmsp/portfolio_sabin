"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Text that rises in letter by letter from behind a mask, and lets each
 * letter hop when the pointer passes over it. Screen readers get the plain
 * text once.
 */
export default function SplitText({
  text,
  delay = 0,
  stagger = 0.035,
  onView = true,
  hover = true,
  className,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  /** Animate when scrolled into view (true) or straight away (false). */
  onView?: boolean;
  hover?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  let n = 0;

  const trigger = onView
    ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-60px" } }
    : { initial: "hidden", animate: "show" };

  return (
    <motion.span className={className} aria-label={text} role="text" {...(reduce ? {} : trigger)}>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden>
          {Array.from(w).map((ch, ci) => {
            const i = n++;
            return (
              <span key={ci} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: "110%", rotate: 8 },
                    show: {
                      y: "0%",
                      rotate: 0,
                      transition: { duration: 0.9, delay: delay + i * stagger, ease: EASE },
                    },
                  }}
                  whileHover={
                    hover && !reduce
                      ? { y: "-12%", transition: { type: "spring", stiffness: 500, damping: 12 } }
                      : undefined
                  }
                >
                  {ch}
                </motion.span>
              </span>
            );
          })}
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>
  );
}
