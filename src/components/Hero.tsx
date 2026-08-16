"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/site";

const STACK = ["Python", "FastAPI", "Next.js", "TypeScript", "RAG", "Ollama"];

const SOCIALS = [
  { label: "GitHub", href: site.github, Icon: Github },
  { label: "LinkedIn", href: site.linkedin, Icon: Linkedin },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  /**
   * `animate` is always present. useReducedMotion resolves to null on the
   * first render, so dropping the whole prop set would leave framer's
   * initial opacity: 0 applied with nothing to animate it back.
   */
  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 0.5, delay, ease: [0.2, 0.7, 0.3, 1] as const },
  });

  return (
    <section id="home" className="relative">
      <div
        className="page-container"
        style={{ paddingTop: "calc(var(--nav-h) + 1rem)" }}
      >
        {/* Identity first: status, name, role. */}
        <motion.div
          {...rise(0)}
          className="flex items-center gap-x-5 gap-y-3 pb-4"
          style={{ borderBottom: "var(--rule-hair) solid var(--border)" }}
        >
          <img
            src="/sabin.png"
            alt={site.name}
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 object-cover sm:h-16 sm:w-16"
            style={{
              border: "var(--rule-hair) solid var(--border-strong)",
              borderRadius: "var(--radius)",
              background: "var(--bg-inset)",
            }}
          />
          <div className="min-w-0">
            <p className="meta flex items-center gap-2">
              <span className="status-dot shrink-0" aria-hidden />
              <span>Available for work</span>
            </p>
            <p
              className="font-display mt-1.5 text-[1.25rem] font-semibold tracking-tight sm:text-[1.4375rem]"
              style={{ color: "var(--text-heading)" }}
            >
              {site.name}
            </p>
            <p className="meta-plain">{site.role}</p>
          </div>
        </motion.div>

        <div className="pt-6 md:pt-12">
          <motion.h1 {...rise(0.06)} className="t-h1 max-w-[18ch]">
            I build AI systems that hold up when the model does not.
          </motion.h1>

          <motion.div
            {...rise(0.12)}
            className="rule-in mt-5 h-[3px] w-full max-w-[9rem]"
            style={{ background: "var(--accent)" }}
            aria-hidden
          />

          <motion.p
            {...rise(0.16)}
            className="t-lead mt-5 max-w-[52ch]"
            style={{ color: "var(--text)" }}
          >
            RAG pipelines, LLM applications and local agent loops, each one
            validated at the boundary with a deterministic fallback behind it.
          </motion.p>

          <motion.p
            {...rise(0.2)}
            className="t-body mt-3 max-w-[54ch]"
            style={{ color: "var(--text-muted)" }}
          >
            Master of IT (Artificial Intelligence) student. Three systems
            below, source public for all three.
          </motion.p>

          <motion.ul
            {...rise(0.24)}
            className="mt-6 flex flex-wrap gap-x-3 gap-y-3"
            aria-label="Core stack"
          >
            {STACK.map((item) => (
              <li key={item} className="tag">
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div
            {...rise(0.28)}
            className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6"
          >
            <a
              href={site.resume}
              download
              className="btn btn-primary justify-center sm:justify-start"
            >
              <Download className="h-[18px] w-[18px]" aria-hidden />
              Download resume
            </a>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith("mailto:")
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="tap meta-plain gap-2 transition-colors hover:text-[var(--accent)]"
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
