"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";

const STACK = [
  "Python",
  "FastAPI",
  "Next.js",
  "TypeScript",
  "RAG",
  "Ollama",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[88vh] items-center overflow-hidden"
    >
      <div className="page-container w-full pt-28 pb-14 md:pt-32 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div
            className="mb-6 inline-flex items-center gap-2.5"
            aria-label="Availability status"
          >
            <span className="status-available-dot shrink-0" aria-hidden />
            <span className="label-mono" style={{ color: "var(--text-muted)" }}>
              Available for work
            </span>
          </div>

          <div className="mb-5 flex items-center gap-3.5">
            <img
              src="/sabin.png"
              alt="Sabin Pradhan"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover object-center"
              style={{ border: "1px solid var(--border)" }}
            />
            <div>
              <p
                className="font-display text-sm font-medium"
                style={{ color: "var(--text-heading)" }}
              >
                Sabin Pradhan
              </p>
              <p className="label-mono">AI Engineer</p>
            </div>
          </div>

          <h1 className="heading text-3xl md:text-5xl lg:text-[3.25rem]">
            I build applied AI apps — career matching, gym coaching, and robot
            control.
          </h1>

          <p
            className="mt-5 max-w-2xl text-[15px] leading-relaxed md:text-base"
            style={{ color: "var(--text-muted)" }}
          >
            Master of IT (AI) student. I ship small, working systems: CareerOS,
            Gym AI Coach, and an AI RC car simulator.
          </p>

          <p
            className="metric-mono mt-5 text-xs md:text-[13px]"
            style={{ color: "var(--text-faint)" }}
          >
            {STACK.join("  ·  ")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/AI Engineer Resume_Sabin_Pradhan.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--border-hover)]"
              style={{
                color: "var(--text-heading)",
                borderColor: "var(--border)",
                borderRadius: 4,
              }}
            >
              Resume
              <Download className="h-3.5 w-3.5" />
            </a>

            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/sabin-pradhan-652b333b6/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
                style={{ color: "var(--text-muted)" }}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://github.com/Sabinmsp"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
                style={{ color: "var(--text-muted)" }}
                aria-label="GitHub"
              >
                <Github className="h-[18px] w-[18px]" />
              </a>
              <a
                href="mailto:sabinmsp@gmail.com"
                className="transition-colors hover:text-accent"
                style={{ color: "var(--text-muted)" }}
                aria-label="Email"
              >
                <Mail className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 transition-colors hover:text-accent"
        style={{ color: "var(--text-faint)" }}
        aria-label="Scroll to projects"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
