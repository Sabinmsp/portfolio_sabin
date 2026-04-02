"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";

const RESUME_HREF = "/AI Engineer Resume_Sabin_Pradhan.pdf";
const GITHUB_HREF = "https://github.com/Sabinmsp";
const LINKEDIN_HREF = "https://www.linkedin.com/in/sabin-pradhan-652b333b6/";

function useProfileTilt(maxTilt: number, disabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0 });

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setStyle({
        rotateX: (0.5 - y) * maxTilt,
        rotateY: (x - 0.5) * maxTilt,
      });
    },
    [maxTilt, disabled]
  );

  const handleLeave = useCallback(() => {
    setStyle({ rotateX: 0, rotateY: 0 });
  }, []);

  return { ref, style, handleMove, handleLeave };
}

export default function ProfileCard() {
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const tilt = useProfileTilt(14, isTouch);

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.handleMove}
      onMouseLeave={tilt.handleLeave}
      animate={tilt.style}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="relative w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] mx-auto"
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      <div
        className="group/profile relative cursor-pointer rounded-2xl md:rounded-[20px] overflow-hidden w-full
          border transition-all duration-300 ease-out
          hover:-translate-y-2 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.28),0_0_0_1px_rgba(29,185,84,0.14)]
          max-md:hover:translate-y-0 max-md:hover:shadow-lg"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border)",
          boxShadow:
            "0 4px 6px -1px rgba(0,0,0,0.06), 0 10px 24px -8px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
        }}
      >
        {/* Photo */}
        <div
          className="relative w-full aspect-[3/4] overflow-hidden bg-[var(--border)]"
          style={{ transform: isTouch ? undefined : "translateZ(32px)" }}
        >
          <img
            src="/sabin.png"
            alt="Sabin Pradhan"
            className="w-full h-full object-cover object-[center_15%] transition-transform duration-300 ease-out group-hover/profile:scale-[1.06] max-md:group-hover/profile:scale-100"
            sizes="(max-width: 768px) 100vw, 380px"
          />

          {/* Bottom gradient for hover actions */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.5) 100%)",
            }}
          />

          {/* Hover overlay: quick links */}
          <div
            className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-end gap-3 pb-6 px-5
              opacity-0 translate-y-2 transition-all duration-300 ease-out
              group-hover/profile:opacity-100 group-hover/profile:translate-y-0
              max-md:opacity-0 max-md:translate-y-0 max-md:pointer-events-none"
          >
            <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2">
              <a
                href={RESUME_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-2 text-xs font-semibold text-neutral-900 shadow-md backdrop-blur-sm transition-transform hover:scale-105 hover:bg-white"
              >
                <Download className="h-3.5 w-3.5" />
                Resume
              </a>
              <a
                href={GITHUB_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-2 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-md transition-transform hover:scale-105 hover:bg-white/25"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
              <a
                href={LINKEDIN_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-2 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-md transition-transform hover:scale-105 hover:bg-white/25"
              >
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between gap-3 px-5 py-4 md:px-6 md:py-5"
          style={{
            borderTop: "1px solid var(--border)",
            transform: isTouch ? undefined : "translateZ(16px)",
          }}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#1DB954] animate-pulse shadow-[0_0_10px_rgba(29,185,84,0.5)]"
              aria-hidden
            />
            <div className="min-w-0">
              <p
                className="truncate text-sm font-semibold leading-tight"
                style={{ color: "var(--text-heading)" }}
              >
                Sabin Pradhan
              </p>
              <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                AI engineer
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200
              bg-[rgba(29,185,84,0.08)] text-[#1DB954] ring-1 ring-[rgba(29,185,84,0.2)]
              hover:bg-[rgba(29,185,84,0.14)] hover:ring-[rgba(29,185,84,0.35)]"
          >
            <Mail className="h-3.5 w-3.5 opacity-80" />
            Contact
          </a>
        </div>
      </div>
    </motion.div>
  );
}
