"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; hub: boolean };
type Pulse = { a: number; b: number; t: number };

const LINK = 128;
const POINTER = 170;

/**
 * A slowly drifting network of nodes. Nearby nodes link up, the pointer
 * gently gathers nodes and lights links, and small signals travel along
 * links. It pauses off screen and in background tabs, and draws one still
 * frame when the visitor prefers reduced motion.
 */
export default function NodeField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let pts: P[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let visible = true;
    let lastPulse = 0;
    const pointer = { x: -9999, y: -9999, on: false };
    const colors = { node: "", line: "", accent: "" };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors.node = cs.getPropertyValue("--text-muted").trim() || "#8a909b";
      colors.line = cs.getPropertyValue("--border-strong").trim() || "#3b4049";
      colors.accent = cs.getPropertyValue("--accent").trim() || "#c8f560";
    };

    const seed = () => {
      const n = Math.round(Math.min(120, Math.max(36, (w * h) / 13000)));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.2 + 0.8,
        hub: Math.random() < 0.07,
      }));
      pulses = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduce) draw(0);
    };

    const alpha = (hex: string, a: number) => {
      // Accepts #rgb/#rrggbb; falls back to the raw colour.
      const m = hex.replace("#", "");
      if (m.length !== 6 && m.length !== 3) return hex;
      const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
      const n = parseInt(full, 16);
      return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
    };

    const step = () => {
      for (const p of pts) {
        if (pointer.on) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d < POINTER && d > 1) {
            const f = (1 - d / POINTER) * 0.012;
            p.vx += dx * f * 0.05;
            p.vy += dy * f * 0.05;
          }
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        // keep a gentle minimum drift
        if (Math.abs(p.vx) < 0.04) p.vx += (Math.random() - 0.5) * 0.02;
        if (Math.abs(p.vy) < 0.04) p.vy += (Math.random() - 0.5) * 0.02;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const links: [number, number][] = [];
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            links.push([i, j]);
            const near =
              pointer.on &&
              Math.hypot((a.x + b.x) / 2 - pointer.x, (a.y + b.y) / 2 - pointer.y) <
                POINTER;
            ctx.strokeStyle = near
              ? alpha(colors.accent, (1 - d / LINK) * 0.55)
              : alpha(colors.line, (1 - d / LINK) * 0.7);
            ctx.lineWidth = near ? 1 : 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (pointer.on) {
        for (const p of pts) {
          const d = Math.hypot(p.x - pointer.x, p.y - pointer.y);
          if (d < POINTER * 0.8) {
            ctx.strokeStyle = alpha(colors.accent, (1 - d / (POINTER * 0.8)) * 0.35);
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      for (const p of pts) {
        ctx.fillStyle = p.hub ? colors.accent : alpha(colors.node, 0.9);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.hub ? p.r + 1.2 : p.r, 0, Math.PI * 2);
        ctx.fill();
        if (p.hub) {
          ctx.strokeStyle = alpha(colors.accent, 0.25);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + 6 + Math.sin(t / 600 + p.x) * 1.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      if (reduce) return;

      // Signals travelling along links.
      if (t - lastPulse > 320 && links.length) {
        lastPulse = t;
        const [a, b] = links[Math.floor(Math.random() * links.length)];
        pulses.push({ a, b, t: 0 });
        if (pulses.length > 14) pulses.shift();
      }
      pulses = pulses.filter((s) => s.t <= 1);
      for (const s of pulses) {
        s.t += 0.018;
        const a = pts[s.a];
        const b = pts[s.b];
        if (!a || !b || Math.hypot(a.x - b.x, a.y - b.y) > LINK) {
          s.t = 2;
          continue;
        }
        const x = a.x + (b.x - a.x) * s.t;
        const y = a.y + (b.y - a.y) * s.t;
        ctx.fillStyle = colors.accent;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      step();
      draw(t);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.on =
        pointer.x >= 0 && pointer.y >= 0 && pointer.x <= w && pointer.y <= h;
    };
    const onLeave = () => {
      pointer.on = false;
    };

    readColors();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);
    const mo = new MutationObserver(() => {
      readColors();
      if (reduce) draw(0);
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
