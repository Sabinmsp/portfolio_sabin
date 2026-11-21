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
      initial={{ opacity: 0, y: 28 }}
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
    <Reveal className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div>
        <motion.h2
          className="display overflow-hidden pb-[0.08em] text-5xl sm:text-6xl md:text-7xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.span
            className="block"
            variants={{
              hidden: { y: "105%" },
              show: {
                y: "0%",
                transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {title}
          </motion.span>
        </motion.h2>
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
