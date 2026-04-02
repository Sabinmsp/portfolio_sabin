"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import ProfileCard from "./ProfileCard";

function TypedName({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const typeChar = (i: number) => {
      if (i > text.length) {
        setTimeout(() => setShowCursor(false), 800);
        return;
      }
      setDisplayed(text.slice(0, i));
      const base = 180 + Math.random() * 120;
      const pause = i === 1 ? 100 : 0;
      setTimeout(() => typeChar(i + 1), base + pause);
    };

    const delay = setTimeout(() => typeChar(1), 2600);
    return () => clearTimeout(delay);
  }, [text]);

  return (
    <>
      {displayed}
      {showCursor && <span className="animate-pulse">|</span>}
    </>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-0"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] pointer-events-none" style={{ background: "var(--border)" }} />

      <div className="relative max-w-7xl mx-auto px-5 md:px-6 pt-24 md:pt-32 pb-16 md:pb-20 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2.5 mb-6"
            aria-label="Availability status"
          >
            <span className="status-available-dot shrink-0" aria-hidden />
            <span className="available-glow-text text-sm font-semibold tracking-tight" style={{ color: "var(--text-heading)" }}>
              Available for work
            </span>
          </motion.div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
            style={{ color: "var(--text-heading)" }}
          >
            Hi, I&apos;m{" "}
            <span className="text-accent pop-text"><TypedName text="Sabin" /></span>
          </h1>

          <p className="mt-4 text-lg md:text-xl max-w-lg leading-relaxed" style={{ color: "var(--text)" }}>
            I build simple, reliable AI systems that run in production.
          </p>

          <p className="mt-3 text-base max-w-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Engineering across{" "}
            <span className="text-accent">RAG pipelines</span>,{" "}
            <span className="text-accent">AI agents</span>, and{" "}
            <span className="text-accent">full stack systems</span>
            . I architect, build, and ship from vector databases through deployment.
          </p>

          <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
            4+ AI systems shipped. RAG, LangChain, FastAPI, Next.js
          </p>

          <div className="flex items-center gap-4 md:gap-5 mt-6 md:mt-8">
            <a
              href="/AI Engineer Resume_Sabin_Pradhan.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 md:px-7 py-2.5 md:py-3 rounded-full text-sm md:text-base font-semibold border transition-all hover:scale-105"
              style={{ color: "var(--text)", borderColor: "var(--border)" }}
            >
              Resume
              <Download className="w-4 h-4 md:w-5 md:h-5" />
            </a>

            <div className="flex items-center gap-3 md:gap-4">
              <a
                href="https://www.linkedin.com/in/sabin-pradhan-652b333b6/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-110 hover:text-accent"
                style={{ color: "var(--text-muted)" }}
              >
                <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a
                href="https://github.com/Sabinmsp"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-110 hover:text-accent"
                style={{ color: "var(--text-muted)" }}
              >
                <Github className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a
                href="mailto:sabinmsp@gmail.com"
                className="transition-all hover:scale-110 hover:text-accent"
                style={{ color: "var(--text-muted)" }}
              >
                <Mail className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, x: 80, y: 100, scale: 0.92, rotate: 4 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center w-full"
        >
          <ProfileCard />
        </motion.div>
      </div>

      <motion.a
        href="#experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-colors"
        style={{ color: "var(--text-muted)" }}
      >
        <ArrowDown className="w-6 h-6 animate-bounce" />
      </motion.a>
    </section>
  );
}
