"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const PROOF = [
  { value: "2", label: "client projects shipped" },
  { value: "3,215", label: "Auslan signs extracted" },
  { value: "14B", label: "model fine-tuned on one GPU" },
];

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function Hero() {
  return (
    <section id="about" className="relative">
      <div className="page-container grid min-h-[100svh] items-center gap-10 pt-32 pb-16 md:pt-40 lg:grid-cols-[1fr_minmax(0,380px)_1fr] lg:gap-12 lg:pb-24">
        {/* Left: name and current status */}
        <motion.div {...rise(0.05)} className="order-2 lg:order-1">
          <h1 className="display text-6xl sm:text-7xl xl:text-[6.5rem]">
            Hi, I&rsquo;m
            <br />
            Sabin.
          </h1>
          <p className="heading mt-6 text-2xl md:text-3xl">
            AI Engineer
            <br />& Full-Stack Developer.
          </p>

          <div
            className="mt-8 max-w-sm border-t pt-5"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="label-mono">Currently</p>
            <p className="heading mt-2 text-base">
              Master of IT (Artificial Intelligence)
            </p>
            <p className="text-[15px]">Charles Darwin University</p>
            <p className="muted inline-flex items-center gap-2 text-[15px]">
              <span className="status-dot" aria-hidden />
              Darwin, NT · open to roles
            </p>
          </div>
        </motion.div>

        {/* Center: portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="order-1 mx-auto w-[min(72vw,320px)] lg:order-2 lg:mb-6 lg:w-full"
        >
          <div className="portrait aspect-square">
            <img src="/sabin.png" alt="Sabin Pradhan" width={566} height={588} />
          </div>
        </motion.div>

        {/* Right: pitch, actions, proof */}
        <motion.div {...rise(0.18)} className="order-3">
          <p className="font-display text-2xl leading-snug md:text-[1.75rem]">
            I build <strong className="font-semibold">RAG systems</strong> and{" "}
            <strong className="font-semibold">LLM apps</strong> that check
            their facts, and ship{" "}
            <strong className="font-semibold">real products for clients</strong>
            .
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#projects" className="btn-ink">
              Explore projects
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/Sabin_Pradhan-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-line"
            >
              Resume
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <dl className="mt-9 grid grid-cols-3 gap-4">
            {PROOF.map((p) => (
              <div key={p.label}>
                <dt className="sr-only">{p.label}</dt>
                <dd>
                  <span className="display block text-3xl md:text-4xl">
                    {p.value}
                  </span>
                  <span className="muted mt-1.5 block text-xs leading-snug md:text-[13px]">
                    {p.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
