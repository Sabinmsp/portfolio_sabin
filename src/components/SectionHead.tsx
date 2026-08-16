"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Shared section header: numbered kicker, heading, one line of context. */
export default function SectionHead({
  index,
  kicker,
  title,
  lead,
}: {
  index: string;
  kicker: string;
  title: string;
  lead: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.5, ease: [0.2, 0.7, 0.3, 1] as const }
      }
      className="mb-12 md:mb-16"
    >
      <p className="meta">
        {index} / {kicker}
      </p>
      <h2 className="t-h2 mt-4">{title}</h2>
      <p
        className="t-lead mt-5 max-w-[50ch]"
        style={{ color: "var(--text-muted)" }}
      >
        {lead}
      </p>
    </motion.header>
  );
}
