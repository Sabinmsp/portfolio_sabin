"use client";

import { motion, useReducedMotion } from "framer-motion";
import { capabilities, buildPrinciples } from "@/data/capabilities";
import SectionHead from "./SectionHead";

/**
 * How I build. Sits directly after the projects so the pattern a reviewer
 * just read about in three rows is named explicitly, then grounded in the
 * tools that produced it.
 */
export default function Capabilities() {
  const reduceMotion = useReducedMotion();

  const rise = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" } as const,
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 0.5, delay, ease: [0.2, 0.7, 0.3, 1] as const },
  });

  return (
    <section id="approach" className="section-y rule-top">
      <div className="page-container">
        <SectionHead
          index="02"
          kicker="Approach"
          title="How I build."
          lead="The same three rules run through every project above."
        />

        <div className="grid gap-x-10 gap-y-8 md:grid-cols-3">
          {buildPrinciples.map((principle, i) => (
            <motion.div
              key={principle.title}
              {...rise(i * 0.06)}
              className="pt-5"
              style={{
                borderTop: "var(--rule-heavy) solid var(--accent)",
              }}
            >
              <h3 className="t-h3" style={{ fontSize: "var(--t-lead)" }}>
                {principle.title}
              </h3>
              <p
                className="t-label mt-3"
                style={{ color: "var(--text-muted)" }}
              >
                {principle.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div {...rise(0.1)} className="mt-14 md:mt-20">
          <p className="meta">Tools these projects actually use</p>
          <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((group) => (
              <div
                key={group.key}
                className="pt-4"
                style={{ borderTop: "var(--rule-hair) solid var(--border)" }}
              >
                <p className="meta-plain flex items-baseline gap-2">
                  <span aria-hidden style={{ color: "var(--text-dim)" }}>
                    {group.key}
                  </span>
                  <span style={{ color: "var(--text-heading)" }}>
                    {group.title}
                  </span>
                </p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="t-label"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
