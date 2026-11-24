"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import NodeField from "./NodeField";
import { LINKS } from "@/data/systems";

const EASE = [0.22, 1, 0.36, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[92svh] flex-col justify-center overflow-hidden"
    >
      {/* A quiet network, fading toward the text */}
      <div className="absolute inset-0 -z-10 opacity-60" aria-hidden>
        <NodeField className="hero-canvas" />
        <div className="hero-fade" />
      </div>

      <div className="page-container pt-32 pb-20 md:pt-40">
        <motion.div {...rise(0.05)} className="flex items-center gap-3">
          <div className="portrait h-10 w-10">
            <Image src="/sabin.png" alt="Sabin Pradhan" width={40} height={40} sizes="40px" priority />
          </div>
          <div className="text-sm leading-tight">
            <p className="text-[var(--ink)]">Sabin Pradhan</p>
            <p className="muted inline-flex items-center gap-1.5">
              <span className="status-dot" aria-hidden /> Open to AI engineering roles · Darwin, NT
            </p>
          </div>
        </motion.div>

        <motion.h1
          id="hero-title"
          {...rise(0.15)}
          className="hero-title mt-10 max-w-[16ch]"
        >
          I turn complex ideas into intelligent systems.
        </motion.h1>

        <motion.p {...rise(0.3)} className="muted mt-6 max-w-lg text-lg leading-relaxed">
          AI Engineer &amp; Full-Stack Developer building real-world software,
          automation and AI experiences.
        </motion.p>

        <motion.div {...rise(0.45)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a href="#projects" className="btn-ink">
            View projects <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet inline-flex items-center gap-1"
          >
            Resume <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a href="#contact" className="link-quiet">
            Contact
          </a>
        </motion.div>

        <motion.ul
          {...rise(0.6)}
          className="muted mt-20 flex flex-wrap gap-x-8 gap-y-2 border-t pt-6 text-sm"
          style={{ borderColor: "var(--border)" }}
        >
          <li>Delivered live sites for Postie Coffee and an NDIS provider</li>
          <li>CDU IT Code Fair 2026 · SignBridge</li>
          <li>Master of IT (AI), Charles Darwin University</li>
        </motion.ul>
      </div>
    </section>
  );
}
