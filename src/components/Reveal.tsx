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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
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
    <Reveal className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="display text-5xl sm:text-6xl md:text-7xl">{title}</h2>
        {children}
      </div>
      {aside ? (
        <div className="muted text-base leading-snug md:max-w-[16rem] md:text-right md:text-lg">
          {aside}
        </div>
      ) : null}
    </Reveal>
  );
}
