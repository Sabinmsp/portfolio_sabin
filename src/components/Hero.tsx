"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";

const STACK = ["Python", "FastAPI", "Next.js", "TypeScript", "RAG", "Ollama"];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sabin-pradhan-652b333b6/",
    Icon: Linkedin,
  },
  { label: "GitHub", href: "https://github.com/Sabinmsp", Icon: Github },
  { label: "Email", href: "mailto:sabinmsp@gmail.com", Icon: Mail },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  /**
   * `animate` is always present. useReducedMotion resolves to null on the
   * first render, so dropping the whole prop set would leave framer's
   * initial opacity: 0 applied with nothing to animate it back.
   */
  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 0.55, delay, ease: [0.2, 0.7, 0.3, 1] as const },
  });

  return (
    <section id="home" className="relative">
      <div
        className="page-container"
        style={{ paddingTop: "calc(var(--nav-h) + 1.5rem)" }}
      >
        {/* Masthead: the index header of the page */}
        <motion.div
          {...rise(0)}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pb-5"
          style={{ borderBottom: "var(--rule-hair) solid var(--border)" }}
        >
          <p className="meta">Index 00 / Sabin Pradhan</p>
          <p className="meta flex items-center gap-2.5">
            <span className="status-dot shrink-0" aria-hidden />
            <span>Available for work</span>
          </p>
        </motion.div>

        <div className="grid gap-10 pt-10 md:pt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div>
            <motion.h1 {...rise(0.06)} className="t-h1 max-w-[16ch]">
              I build small AI systems that ship.
            </motion.h1>

            <motion.div
              {...rise(0.14)}
              className="rule-in mt-7 h-[3px] w-full max-w-[9rem]"
              style={{ background: "var(--accent)" }}
              aria-hidden
            />

            <motion.p
              {...rise(0.18)}
              className="t-lead mt-7 max-w-[46ch]"
              style={{ color: "var(--text)" }}
            >
              Retrieval pipelines, local LLM agents, and the interfaces that make
              them usable.
            </motion.p>

            <motion.p
              {...rise(0.24)}
              className="t-body mt-5 max-w-[52ch]"
              style={{ color: "var(--text-muted)" }}
            >
              Master of IT (Artificial Intelligence) student at Charles Darwin
              University. Three projects below, all running, all on GitHub.
            </motion.p>

            <motion.ul
              {...rise(0.3)}
              className="mt-9 flex flex-wrap gap-x-3 gap-y-3"
              aria-label="Core stack"
            >
              {STACK.map((item) => (
                <li key={item} className="tag">
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div
              {...rise(0.36)}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <a
                href="/AI Engineer Resume_Sabin_Pradhan.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <Download className="h-[18px] w-[18px]" aria-hidden />
                Resume
              </a>

              <ul className="flex items-center gap-6">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(href.startsWith("mailto:")
                        ? {}
                        : { target: "_blank", rel: "noopener noreferrer" })}
                      className="meta-plain inline-flex items-center gap-2 transition-colors hover:text-[var(--accent)]"
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden />
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Portrait as a plate, squared, not a chip */}
          <motion.figure
            {...rise(0.12)}
            className="order-first w-32 shrink-0 sm:w-40 lg:order-none lg:w-52"
          >
            <img
              src="/sabin.png"
              alt="Sabin Pradhan"
              width={208}
              height={216}
              className="w-full object-cover"
              style={{
                border: "var(--rule-hair) solid var(--border-strong)",
                borderRadius: "var(--radius)",
                background: "var(--bg-inset)",
              }}
            />
            <figcaption className="meta-plain mt-3">AI Engineer</figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
