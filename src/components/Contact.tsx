"use client";

import { useRef, useState, useCallback } from "react";
import {
  ArrowUpRight,
  Check,
  CheckCircle,
  Copy,
  Github,
  Linkedin,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Reveal from "./Reveal";
import { Magnetic } from "./Interactive";

const EMAIL = "sabinmsp@gmail.com";

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
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [notice, setNotice] = useState<string | null>(null);
  const [showMailFallback, setShowMailFallback] = useState(false);
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
        setNotice("The contact form isn't available right now.");
        setShowMailFallback(true);
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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="section-y">
      <div className="page-container grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="label-mono mb-4">(04)</p>
          <h2 className="mega-title">
            Let&rsquo;s
            <br />
            talk
          </h2>
          <p className="muted mt-7 max-w-md text-lg leading-relaxed">
            Open to AI and full-stack roles.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="font-display inline-flex items-center gap-2 text-xl font-semibold underline-offset-4 hover:underline md:text-2xl"
              style={{ color: "var(--ink)" }}
            >
              {EMAIL}
              <ArrowUpRight className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="grid h-11 w-11 place-items-center rounded-lg border transition-colors hover:border-[var(--ink)]"
              style={{ borderColor: "var(--border)", color: "var(--ink)" }}
              aria-label={copied ? "Email copied" : "Copy email address"}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-6">
            <a
              href="https://www.linkedin.com/in/sabin-pradhan-652b333b6/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display inline-flex items-center gap-2 font-medium hover:underline"
              style={{ color: "var(--ink)" }}
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com/Sabinmsp"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display inline-flex items-center gap-2 font-medium hover:underline"
              style={{ color: "var(--ink)" }}
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="relative space-y-8">
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

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="label-mono block">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={120}
                  placeholder="What should I call you?"
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="email" className="label-mono block">
                  Email address
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
              <label htmlFor="subject" className="label-mono block">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                maxLength={200}
                placeholder="Role, project or question"
                className="field"
              />
            </div>

            <div>
              <label htmlFor="message" className="label-mono block">
                What do you have in mind?
              </label>
              <textarea
                id="message"
                name="message"
                required
                maxLength={5000}
                rows={4}
                placeholder="A little about the role or project (10+ characters)"
                className="field resize-none"
              />
            </div>

            {notice ? (
              <p className="muted text-sm" role="status">
                {notice}
                {showMailFallback ? (
                  <>
                    {" "}Please email me at{" "}
                    <a
                      href={`mailto:${EMAIL}`}
                      className="underline"
                      style={{ color: "var(--ink)" }}
                    >
                      {EMAIL}
                    </a>
                    .
                  </>
                ) : null}
              </p>
            ) : null}

            <Magnetic strength={0.2}>
            <button
              type="submit"
              disabled={status === "sending"}
              className="pill-gradient gap-2 disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  Sending
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : status === "sent" ? (
                <>
                  Sent, thank you
                  <CheckCircle className="h-4 w-4" />
                </>
              ) : status === "error" ? (
                <>
                  Not sent. Try again
                  <AlertCircle className="h-4 w-4" />
                </>
              ) : (
                <>
                  Send message
                  <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </button>
            </Magnetic>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
