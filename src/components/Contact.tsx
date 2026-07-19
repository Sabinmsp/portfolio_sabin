"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Send, Mail, CheckCircle, Loader2, AlertCircle } from "lucide-react";

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
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [notice, setNotice] = useState<string | null>(null);
  const lastSubmitAt = useRef(0);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastSubmitAt.current < CLIENT_COOLDOWN_MS) {
        setNotice("Please wait a moment before sending again.");
        setTimeout(() => setNotice(null), 4000);
        return;
      }

      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
      if (!accessKey) {
        setNotice(
          "Contact form is not configured (missing NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY)."
        );
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
        return;
      }

      setStatus("sending");
      const form = e.currentTarget;

      const name =
        (form.elements.namedItem("name") as HTMLInputElement)?.value ?? "";
      const email =
        (form.elements.namedItem("email") as HTMLInputElement)?.value ?? "";
      const subject =
        (form.elements.namedItem("subject") as HTMLInputElement)?.value ?? "";
      const message =
        (form.elements.namedItem("message") as HTMLTextAreaElement)?.value ??
        "";
      const honey =
        (form.elements.namedItem("_honey") as HTMLInputElement)?.value ?? "";

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
      const timeoutId = window.setTimeout(
        () => controller.abort(),
        FETCH_TIMEOUT_MS
      );

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
          setNotice(
            msg.length > 0 && msg.length < 280 ? msg : "Failed to send message"
          );
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
    },
    []
  );

  const fieldClass =
    "w-full px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent/40 transition-colors";
  const fieldStyle = {
    background: "var(--bg)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    borderRadius: 4,
  } as const;

  return (
    <section
      id="contact"
      className="section-y relative min-h-[min(100vh,720px)] flex items-center"
    >
      <div className="page-container w-full" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12 lg:items-start"
        >
          <div>
            <h2 className="heading text-2xl md:text-3xl">Get in touch</h2>
            <p
              className="mt-2 text-sm leading-relaxed md:text-[15px]"
              style={{ color: "var(--text-muted)" }}
            >
              Open to AI engineering roles and collaborations. Prefer email or
              the form — I respond within a few days.
            </p>

            <a
              href="mailto:sabinmsp@gmail.com"
              className="mt-5 inline-flex items-center gap-2 text-sm transition-colors hover:text-accent"
              style={{ color: "var(--text-heading)" }}
            >
              <Mail className="h-4 w-4 text-accent" />
              <span className="font-mono text-[13px]">sabinmsp@gmail.com</span>
            </a>

            <div className="mt-4 flex gap-3">
              {[
                { label: "GitHub", href: "https://github.com/Sabinmsp" },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/sabin-pradhan-652b333b6/",
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono border px-2.5 py-1.5 transition-colors hover:border-[var(--border-hover)] hover:text-accent"
                  style={{
                    color: "var(--text-muted)",
                    borderColor: "var(--border)",
                    borderRadius: 3,
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative space-y-4 border p-5 md:p-6"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
              borderRadius: 4,
            }}
          >
            <input
              type="text"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="fixed -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0"
              style={{ left: "-9999px", top: 0 }}
              defaultValue=""
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="label-mono mb-1.5 block"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={1}
                  maxLength={120}
                  placeholder="Your name"
                  className={fieldClass}
                  style={fieldStyle}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="label-mono mb-1.5 block"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  placeholder="you@company.com"
                  className={fieldClass}
                  style={fieldStyle}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="label-mono mb-1.5 block"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                minLength={1}
                maxLength={200}
                placeholder="Role, project, or question"
                className={fieldClass}
                style={fieldStyle}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="label-mono mb-1.5 block"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={1}
                maxLength={5000}
                rows={4}
                placeholder="What are you building? (10+ characters)"
                className={`${fieldClass} resize-none`}
                style={fieldStyle}
              />
            </div>

            {notice ? (
              <p
                className="text-center text-sm"
                style={{ color: "var(--text-muted)" }}
                role="status"
              >
                {notice}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-70"
              style={{ borderRadius: 4 }}
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : status === "sent" ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Sent
                </>
              ) : status === "error" ? (
                <>
                  <AlertCircle className="h-4 w-4" />
                  Failed — try again
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
