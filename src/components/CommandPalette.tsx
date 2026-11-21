"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Coffee,
  Copy,
  FileText,
  Github,
  LayoutGrid,
  Linkedin,
  Mail,
  MessageCircle,
  Moon,
  Search,
} from "lucide-react";
import { askAssistant, LINKS, openSystem, systems } from "@/data/systems";
import { useTheme } from "./ThemeProvider";

type Item = {
  id: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
  run: () => void;
  keywords?: string;
  hidden?: boolean;
};

const scrollTo = (sel: string) =>
  document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" });

const BREW = ["New", "Accepted", "Preparing", "Ready"];

/** Ctrl/⌘ + K: jump anywhere, open any system, or ask the guide. */
export default function CommandPalette() {
  const reduce = useReducedMotion();
  const { toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [brew, setBrew] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const items: Item[] = useMemo(
    () => [
      ...systems.map((s) => ({
        id: `sys-${s.id}`,
        label: `Open ${s.name}`,
        hint: "System",
        icon: <Boxes className="h-4 w-4" />,
        keywords: `${s.name} ${s.tagline} project diagram`,
        run: () => {
          openSystem(s.id);
          scrollTo("#projects");
        },
      })),
      { id: "go-top", label: "Go to the top", hint: "Section", icon: <ArrowRight className="h-4 w-4" />, keywords: "home hero start", run: () => scrollTo("#top") },
      { id: "go-lab", label: "Inside the lab", hint: "Section", icon: <LayoutGrid className="h-4 w-4" />, keywords: "dashboard bento focus award stack education", run: () => scrollTo("#lab") },
      { id: "go-ask", label: "Ask the guide", hint: "Section", icon: <MessageCircle className="h-4 w-4" />, keywords: "assistant chat questions", run: () => scrollTo("#ask") },
      { id: "go-contact", label: "Contact Sabin", hint: "Section", icon: <Mail className="h-4 w-4" />, keywords: "email hire message form", run: () => scrollTo("#contact") },
      { id: "resume", label: "Open résumé (PDF)", hint: "Link", icon: <FileText className="h-4 w-4" />, keywords: "resume cv pdf", run: () => window.open(LINKS.resume, "_blank", "noopener") },
      { id: "github", label: "GitHub profile", hint: "Link", icon: <Github className="h-4 w-4" />, keywords: "code repos", run: () => window.open(LINKS.github, "_blank", "noopener") },
      { id: "linkedin", label: "LinkedIn profile", hint: "Link", icon: <Linkedin className="h-4 w-4" />, run: () => window.open(LINKS.linkedin, "_blank", "noopener") },
      {
        id: "copy",
        label: "Copy email address",
        hint: "Action",
        icon: <Copy className="h-4 w-4" />,
        keywords: "email clipboard",
        run: () => {
          navigator.clipboard?.writeText(LINKS.email).then(
            () => setToast(`Copied ${LINKS.email}`),
            () => setToast(LINKS.email),
          );
        },
      },
      { id: "theme", label: "Switch light / dark", hint: "Action", icon: <Moon className="h-4 w-4" />, keywords: "theme mode", run: toggle },
      {
        id: "coffee",
        label: "Brew a flat white",
        hint: "Secret",
        icon: <Coffee className="h-4 w-4" />,
        keywords: "coffee flat white latte postie brew",
        hidden: true,
        run: () => setBrew(0),
      },
    ],
    [toggle],
  );

  const term = q.trim().toLowerCase();
  const shown = items
    .filter((it) => {
      if (it.hidden) return term.length >= 3 && (it.keywords ?? "").includes(term);
      if (!term) return true;
      return `${it.label} ${it.keywords ?? ""}`.toLowerCase().includes(term);
    })
    // A discovered secret goes to the top of the list.
    .sort((a, b) => Number(!!b.hidden) - Number(!!a.hidden));
  const askRow = term.length > 2;
  const count = shown.length + (askRow ? 1 : 0);

  const close = () => {
    setOpen(false);
    setQ("");
    setSel(0);
    returnFocus.current?.focus?.();
  };

  const runAt = (i: number) => {
    if (i < shown.length) shown[i].run();
    else if (askRow) {
      askAssistant(q.trim());
      scrollTo("#ask");
    }
    close();
  };

  // Global shortcut, plus a custom event so buttons can open it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        returnFocus.current = document.activeElement as HTMLElement;
        setOpen((o) => !o);
      }
    };
    const onOpen = () => {
      returnFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("lab:palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("lab:palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  useEffect(() => {
    setSel(0);
  }, [q]);

  // The flat white moves through Postie's real order states.
  useEffect(() => {
    if (brew < 0) return;
    if (brew >= BREW.length) {
      const id = window.setTimeout(() => setBrew(-1), 2600);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => setBrew((b) => b + 1), reduce ? 200 : 700);
    return () => window.clearTimeout(id);
  }, [brew, reduce]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(id);
  }, [toast]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => (count ? (s + 1) % count : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => (count ? (s - 1 + count) % count : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (count) runAt(sel);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              className="palette-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="palette"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onKeyDown={onKeyDown}
            >
              <div className="flex items-center gap-3 border-b px-4" style={{ borderColor: "var(--border)" }}>
                <Search className="muted h-4 w-4" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search systems, sections, or ask a question…"
                  className="flex-1 bg-transparent py-4 text-[15px] outline-none"
                  style={{ color: "var(--ink)" }}
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="palette-list"
                  aria-activedescendant={count ? `pal-${sel}` : undefined}
                />
                <span className="kbd">esc</span>
              </div>
              <div id="palette-list" role="listbox" className="max-h-[22rem] overflow-y-auto p-2" data-lenis-prevent>
                {shown.map((it, i) => (
                  <button
                    key={it.id}
                    id={`pal-${i}`}
                    role="option"
                    aria-selected={i === sel}
                    type="button"
                    onMouseMove={() => setSel(i)}
                    onClick={() => runAt(i)}
                    className="palette__item"
                  >
                    <span className={it.hidden ? "accent" : "muted"}>{it.icon}</span>
                    <span className="flex-1">{it.label}</span>
                    <span className="muted text-xs">{it.hint}</span>
                  </button>
                ))}
                {askRow ? (
                  <button
                    id={`pal-${shown.length}`}
                    role="option"
                    aria-selected={sel === shown.length}
                    type="button"
                    onMouseMove={() => setSel(shown.length)}
                    onClick={() => runAt(shown.length)}
                    className="palette__item"
                  >
                    <MessageCircle className="accent h-4 w-4" />
                    <span className="flex-1">
                      Ask the guide: <span className="text-[var(--ink)]">&ldquo;{q.trim()}&rdquo;</span>
                    </span>
                    <span className="muted text-xs">Assistant</span>
                  </button>
                ) : null}
                {!count ? <p className="muted px-3 py-6 text-center text-sm">Nothing found.</p> : null}
              </div>
              <div className="muted flex items-center gap-4 border-t px-4 py-2.5 text-xs" style={{ borderColor: "var(--border)" }}>
                <span className="inline-flex items-center gap-1"><span className="kbd">↑</span><span className="kbd">↓</span> move</span>
                <span className="inline-flex items-center gap-1"><span className="kbd">↵</span> open</span>
                <span className="ml-auto">Type a question to ask the guide</span>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {toast ? (
          <motion.div
            className="toast text-sm"
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {toast}
          </motion.div>
        ) : null}
        {brew >= 0 ? (
          <motion.div
            className="toast"
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <p className="heading inline-flex items-center gap-2 text-[15px]">
              <Coffee className="accent h-4 w-4" />
              {brew >= BREW.length ? "Flat white ready. Enjoy." : "Brewing your flat white…"}
            </p>
            <ol className="mt-3 grid grid-cols-4 gap-1.5">
              {BREW.map((s, i) => (
                <li
                  key={s}
                  className="rounded-lg border px-2 py-1.5 text-center text-xs transition-colors"
                  style={{
                    borderColor: i <= brew ? "var(--accent)" : "var(--border)",
                    background: i <= brew ? "var(--accent-soft)" : "transparent",
                    color: i <= brew ? "var(--ink)" : "var(--text-muted)",
                  }}
                >
                  {s}
                </li>
              ))}
            </ol>
            <p className="muted mt-2 text-xs">
              These are the real order states from the Postie Coffee system.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
