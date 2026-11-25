"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./Reveal";

type Project = {
  id: string;
  name: string;
  /** One short line. Keep it short. */
  line: string;
  tag: string;
  href: string;
  /** A real screenshot, or a typographic cover when there is none. */
  img?: string;
  cover?: { word: string; sub: string };
  color: string;
};

const PROJECTS: Project[] = [
  { id: "signbridge", name: "SignBridge", line: "English to Auslan signs", tag: "Code Fair 2026", href: "https://github.com/Sabinmsp/coding_project_auslan", img: "/projects/signbridge.jpg", color: "#c8f560" },
  { id: "postie", name: "Postie Coffee", line: "Café website + ordering", tag: "Client · live", href: "https://www.postiecoffee.com.au/", img: "/projects/postie.jpg", color: "#f5c542" },
  { id: "ndis", name: "NDIS Provider", line: "Client website", tag: "Client · live", href: "https://sweet-care-virid.vercel.app/", img: "/projects/ndis.jpg", color: "#7ad9c5" },
  { id: "careeros", name: "CareerOS", line: "AI job-fit analysis", tag: "MVP", href: "https://github.com/Sabinmsp/careeros", img: "/projects/careeros.jpg", color: "#8fa8ff" },
  { id: "gym", name: "Gym Coach AI", line: "RAG fitness coach", tag: "Build", href: "https://github.com/Sabinmsp/gym-ai-coach", img: "/projects/gym.jpg", color: "#ff8a65" },
  { id: "triage", name: "Housing Triage", line: "AI repair ranking", tag: "Team", href: "https://github.com/Sabinmsp/try-house", img: "/projects/triage.jpg", color: "#ff6b9a" },
  { id: "qlora", name: "Qwen3-14B", line: "QLoRA on one GPU", tag: "Experiment", href: "https://github.com/Sabinmsp", img: "/projects/qlora.jpg", color: "#b98cff" },
  { id: "support", name: "Support Agent", line: "RAG agent with tools", tag: "Team", href: "https://github.com/sidskarkii/Capstone-Final", img: "/projects/support.jpg", color: "#5cc8ff" },
];

function Folder({ p, i, flash }: { p: Project; i: number; flash: boolean }) {
  return (
    <motion.a
      id={`project-${p.id}`}
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
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
          {p.line} <ArrowUpRight className="folder__arrow h-4 w-4" />
        </span>
      </span>
    </motion.a>
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
