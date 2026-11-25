"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import SplitText from "./SplitText";

export default function Reveal({
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
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  title,
  aside,
  children,
  index,
}: {
  title: React.ReactNode;
  aside?: React.ReactNode;
  children?: React.ReactNode;
  /** Small section number shown above the title, e.g. "01". */
  index?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // The giant title drifts sideways as the section scrolls past.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-6%"]);

  return (
    <div ref={ref} className="mb-12 md:mb-16">
      {index ? <p className="label-mono mb-4">({index})</p> : null}
      <motion.h2
        className="mega-title"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        style={reduce ? undefined : { x }}
      >
        {typeof title === "string" ? (
          <SplitText text={title} />
        ) : (
          <motion.span
            className="block"
            variants={{
              hidden: { y: "105%" },
              show: { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {title}
          </motion.span>
        )}
      </motion.h2>
      {aside ? (
        <Reveal delay={0.15}>
          <p className="mt-5 max-w-xl text-sm font-semibold tracking-wide text-[var(--ink)] uppercase md:text-[15px]">
            {aside}
          </p>
        </Reveal>
      ) : null}
      {children}
    </div>
  );
}
