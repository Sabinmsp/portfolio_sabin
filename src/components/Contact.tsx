"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";

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
  const reduceMotion = useReducedMotion();
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

  const rise = {
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 0.5, ease: [0.2, 0.7, 0.3, 1] as const },
  };

  return (
    <section id="contact" className="section-y rule-top">
      <div className="page-container">
        <motion.header {...rise} className="mb-12 md:mb-16">
          <p className="meta">03 / Contact</p>
          <h2 className="t-h2 mt-4">Get in touch.</h2>
          <p
            className="t-lead mt-5 max-w-[42ch]"
            style={{ color: "var(--text-muted)" }}
          >
            Open to AI engineering roles and collaborations. I reply within a
            few days.
          </p>
        </motion.header>

        <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <motion.div {...rise}>
            <p className="meta">Direct</p>
            <a
              href="mailto:sabinmsp@gmail.com"
              className="link-rule mt-4 inline-block font-mono"
              style={{ fontSize: "var(--t-lead)" }}
            >
              sabinmsp@gmail.com
            </a>

            <p className="meta mt-10">Elsewhere</p>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                { label: "GitHub", href: "https://github.com/Sabinmsp" },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/sabin-pradhan-652b333b6/",
                },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-rule meta-plain"
                  >
                    {link.label}
                    <span className="sr-only">, opens in a new tab</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.form
            {...rise}
            onSubmit={handleSubmit}
            className="flex flex-col gap-7"
            style={{
              borderTop: "var(--rule-heavy) solid var(--border-ink)",
              paddingTop: "2rem",
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

            <div className="grid gap-7 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="meta mb-2 block">
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
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="email" className="meta mb-2 block">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  placeholder="you@company.com"
                  className="field"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="meta mb-2 block">
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
                className="field"
              />
            </div>

            <div>
              <label htmlFor="message" className="meta mb-2 block">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={1}
                maxLength={5000}
                rows={5}
                placeholder="What are you building?"
                className="field resize-none"
              />
            </div>

            {notice ? (
              <p
                className="t-label"
                style={{ color: "var(--text)" }}
                role="status"
              >
                {notice}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn btn-primary w-full justify-center disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-[18px] w-[18px] animate-spin" aria-hidden />
                  Sending
                </>
              ) : status === "sent" ? (
                <>
                  <CheckCircle className="h-[18px] w-[18px]" aria-hidden />
                  Sent
                </>
              ) : status === "error" ? (
                <>
                  <AlertCircle className="h-[18px] w-[18px]" aria-hidden />
                  Failed. Try again
                </>
              ) : (
                <>
                  <Send className="h-[18px] w-[18px]" aria-hidden />
                  Send message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
