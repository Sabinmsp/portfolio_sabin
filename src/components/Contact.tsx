"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Send, Mail, MapPin, Phone, CheckCircle, Loader2, AlertCircle } from "lucide-react";

const WEB3FORMS_SUBMIT_URL = "https://api.web3forms.com/submit";
const CLIENT_COOLDOWN_MS = 45_000;
const FETCH_TIMEOUT_MS = 30_000;

function web3Message(data: Record<string, unknown>): string {
  if (typeof data.message === "string") return data.message;
  const body = data.body;
  if (body && typeof body === "object" && body !== null && "message" in body) {
    const m = (body as { message?: unknown }).message;
    if (typeof m === "string") return m;
  }
  return "";
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [notice, setNotice] = useState<string | null>(null);
  const lastSubmitAt = useRef(0);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastSubmitAt.current < CLIENT_COOLDOWN_MS) {
      setNotice("Please wait a moment before sending again.");
      setTimeout(() => setNotice(null), 4000);
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
    if (!accessKey) {
      setNotice("Contact form is not configured (missing NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY).");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("sending");
    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value ?? "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value ?? "";
    const subject = (form.elements.namedItem("subject") as HTMLInputElement)?.value ?? "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value ?? "";
    const honey = (form.elements.namedItem("_honey") as HTMLInputElement)?.value ?? "";

    if (honey.trim().length > 0) {
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    if (message.trim().length < 10) {
      setNotice("Message must be at least 10 characters.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const res = await fetch(WEB3FORMS_SUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          subject,
          message,
        }),
        signal: controller.signal,
      });

      window.clearTimeout(timeoutId);

      let data: Record<string, unknown> = {};
      try {
        data = (await res.json()) as Record<string, unknown>;
      } catch {
        setNotice("Failed to send message");
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
        return;
      }

      if (res.ok && data.success === true) {
        lastSubmitAt.current = Date.now();
        setStatus("sent");
        form.reset();
      } else {
        const msg = web3Message(data);
        setNotice(msg.length > 0 && msg.length < 280 ? msg : "Failed to send message");
        setStatus("error");
      }
    } catch (err) {
      window.clearTimeout(timeoutId);
      if (err instanceof Error && err.name === "AbortError") {
        setNotice("Request timed out. Please try again.");
      } else {
        setNotice("Failed to send message");
      }
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 4000);
  }, []);

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold" style={{ color: "var(--text-heading)" }}>
            Let&apos;s Build <span className="text-accent pop-text">Something Real</span>
          </h2>
          <div className="mt-3 w-20 h-1 mx-auto rounded-full bg-accent" />
          <p className="mt-4 max-w-xl mx-auto text-sm md:text-base" style={{ color: "var(--text-muted)" }}>
            Open to AI engineering roles, collaborations, and building systems that create real impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="card rounded-2xl p-6 space-y-6">
              <h3 className="text-xl font-bold" style={{ color: "var(--text-heading)" }}>Let&apos;s Build Together</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Looking to bring on an AI engineer who ships? I design and build intelligent systems from architecture through deployment.
              </p>
              <div className="space-y-4">
                <a href="mailto:sabinmsp@gmail.com" className="flex items-center gap-3 hover:text-accent transition-colors group" style={{ color: "var(--text)" }}>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center"><Mail className="w-5 h-5 text-accent" /></div>
                  <span className="text-sm">sabinmsp@gmail.com</span>
                </a>
                <div className="flex items-center gap-3" style={{ color: "var(--text)" }}>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center"><MapPin className="w-5 h-5 text-accent" /></div>
                  <span className="text-sm">Available Worldwide</span>
                </div>
                <div className="flex items-center gap-3" style={{ color: "var(--text)" }}>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center"><Phone className="w-5 h-5 text-accent" /></div>
                  <span className="text-sm">Open to remote and on site</span>
                </div>
              </div>
            </div>
            <div className="card rounded-2xl p-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>Find me on</h4>
              <div className="flex gap-3">
                {[
                  { label: "GitHub", href: "https://github.com/Sabinmsp" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/sabin-pradhan-652b333b6/" },
                ].map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-xs rounded-full card hover:text-accent transition-all" style={{ color: "var(--text-muted)" }}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="relative card rounded-2xl p-5 md:p-8 space-y-5 md:space-y-6">
              {/* Honeypot: off-screen so it never overlaps the submit button */}
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="fixed w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
                style={{ left: "-9999px", top: 0 }}
                defaultValue=""
              />
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm mb-2" style={{ color: "var(--text-muted)" }}>Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    minLength={1}
                    maxLength={120}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-2" style={{ color: "var(--text-muted)" }}>Your Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm mb-2" style={{ color: "var(--text-muted)" }}>Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  minLength={1}
                  maxLength={200}
                  placeholder="Let's build something together"
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm mb-2" style={{ color: "var(--text-muted)" }}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={1}
                  maxLength={5000}
                  rows={5}
                  placeholder="Tell me about your project or idea (10+ characters)..."
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }}
                />
              </div>
              {notice && (
                <p className="text-sm text-center" style={{ color: "var(--text-muted)" }} role="status">
                  {notice}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium bg-accent text-white hover:bg-accent-hover transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 shadow-md hover:shadow-lg"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : status === "sent" ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : status === "error" ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    Failed to send message
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
