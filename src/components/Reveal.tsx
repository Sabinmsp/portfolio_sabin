"use client";

import { motion } from "framer-motion";

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
}: {
  title: React.ReactNode;
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <h2 className="heading text-3xl md:text-5xl">{title}</h2>
      {aside ? <p className="muted mt-3 max-w-xl text-base md:text-lg">{aside}</p> : null}
      {children}
    </Reveal>
  );
}
