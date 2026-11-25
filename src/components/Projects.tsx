"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./Reveal";

import { projects as PROJECTS, type Project } from "@/data/systems";

function Folder({ p, i, flash }: { p: Project; i: number; flash: boolean }) {
  const Tag = p.href ? motion.a : motion.div;
  return (
    <Tag
      id={`project-${p.id}`}
      {...(p.href ? { href: p.href, target: "_blank", rel: "noopener noreferrer" } : { tabIndex: 0 })}
      className={`folder ${flash ? "folder--flash" : ""}`}
      style={{ "--folder": p.color } as React.CSSProperties}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      aria-label={`${p.name}: ${p.line}`}
    >
      <span className="folder__back" aria-hidden>
        <span className="folder__tab">{String(i + 1).padStart(2, "0")}</span>
      </span>

      <span className="folder__paper" aria-hidden>
        {p.img ? (
          <Image src={p.img} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
        ) : p.cover ? (
          <span className="folder__cover">
            <span className="folder__cover-word">{p.cover.word}</span>
            <span className="folder__cover-sub">{p.cover.sub}</span>
          </span>
        ) : null}
      </span>

      <span className="folder__front">
        <span className="folder__tag">{p.tag}</span>
        <span className="folder__name">{p.name}</span>
        <span className="folder__line">
          {p.line} {p.href ? <ArrowUpRight className="folder__arrow h-4 w-4" /> : <span className="text-xs opacity-70">Private</span>}
        </span>
      </span>
    </Tag>
  );
}

export default function Projects() {
  const [flash, setFlash] = useState<string | null>(null);

  // The guide and the command palette can point at a project.
  useEffect(() => {
    const on = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setFlash(id);
      window.setTimeout(() => {
        document.getElementById(`project-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      window.setTimeout(() => setFlash(null), 1800);
    };
    window.addEventListener("lab:open-system", on);
    return () => window.removeEventListener("lab:open-system", on);
  }, []);

  return (
    <section id="projects" className="section-y">
      <div className="page-container">
        <SectionHeader index="01" title="Projects" aside="Open a folder." />
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((p, i) => (
            <Folder key={p.id} p={p} i={i} flash={flash === p.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
