"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

/**
 * Change this to a transparent PNG (for example a 3D avatar render) and the
 * portrait becomes a free-floating head; everything else stays the same.
 */
const AVATAR = { src: "/sabin.png", cutout: false };

export default function Hero() {
  const reduce = useReducedMotion();
  const avatarRef = useRef<HTMLDivElement>(null);
  const spin = useAnimationControls();

  // Pointer position relative to the portrait, from -1 to 1 on each axis.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 16, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 120, damping: 16, mass: 0.6 });

  // The portrait turns toward the cursor; the headline drifts the other way.
  const rotateY = useTransform(sx, [-1, 1], [-24, 24]);
  const rotateX = useTransform(sy, [-1, 1], [18, -18]);
  const shiftX = useTransform(sx, [-1, 1], [-18, 18]);
  const shiftY = useTransform(sy, [-1, 1], [-12, 12]);
  const titleX = useTransform(sx, [-1, 1], [16, -16]);
  const glossX = useTransform(sx, [-1, 1], ["20%", "80%"]);
  const glossY = useTransform(sy, [-1, 1], ["15%", "85%"]);
  const gloss = useTransform(
    [glossX, glossY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgb(255 255 255 / 0.28), transparent 55%)`,
  );
  const shadowX = useTransform(sx, [-1, 1], [26, -26]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const el = avatarRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nx = (e.clientX - cx) / (window.innerWidth / 2);
      const ny = (e.clientY - cy) / (window.innerHeight / 2);
      px.set(Math.max(-1, Math.min(1, nx)));
      py.set(Math.max(-1, Math.min(1, ny)));
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, px, py]);

  const onAvatarClick = () => {
    if (reduce) return;
    spin.start({ rotateZ: [0, -8, 6, -3, 0], scale: [1, 1.06, 1], transition: { duration: 0.7 } });
  };

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-10 md:pt-32"
    >
      {/* Soft light behind the portrait */}
      <div aria-hidden className="hero-halo" />

      {/* Giant headline */}
      <motion.h1
        id="hero-title"
        className="hero-mega px-[3vw] text-center"
        style={reduce ? undefined : { x: titleX }}
      >
        <span className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
          >
            Hi, I&rsquo;m <br className="md:hidden" />
            Sabin
          </motion.span>
        </span>
      </motion.h1>

      <div className="page-container relative grid items-center gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-6">
        {/* Left: who */}
        <motion.p
          {...rise(0.7)}
          className="order-2 max-w-[19rem] text-[13px] leading-relaxed font-semibold tracking-wide text-[var(--ink)] uppercase md:order-1 md:text-sm"
        >
          AI engineer &amp; full-stack developer building grounded AI systems
          and real products for clients.
          <span className="muted mt-3 flex items-center gap-2 text-xs font-medium normal-case tracking-normal">
            <span className="status-dot" aria-hidden /> Open to roles · Darwin, NT
          </span>
        </motion.p>

        {/* Center: the portrait that looks at you */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
          className="order-1 mx-auto -mt-[1vw] md:order-2 md:-mt-[7.5vw]"
        >
          <div className={reduce ? "" : "hero-float"}>
            <motion.div
              ref={avatarRef}
              className="relative w-[min(64vw,22rem)] cursor-pointer md:w-[min(30vw,26rem)]"
              style={
                reduce
                  ? undefined
                  : { rotateX, rotateY, x: shiftX, y: shiftY, transformPerspective: 900 }
              }
              onClick={onAvatarClick}
              role="img"
              aria-label="Sabin Pradhan"
            >
              <motion.div animate={spin} className="relative">
                <div className={AVATAR.cutout ? "relative aspect-square" : "hero-portrait relative aspect-square"}>
                  <Image
                    src={AVATAR.src}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 768px) 30vw, 64vw"
                    className={AVATAR.cutout ? "object-contain" : "object-cover"}
                  />
                  {!AVATAR.cutout && !reduce ? (
                    <motion.div aria-hidden className="absolute inset-0 rounded-full" style={{ background: gloss }} />
                  ) : null}
                </div>
              </motion.div>
            </motion.div>
          </div>
          {/* Ground shadow that slides opposite the tilt */}
          <motion.div
            aria-hidden
            className="hero-shadow mx-auto"
            style={reduce ? undefined : { x: shadowX }}
          />
        </motion.div>

        {/* Right: actions */}
        <motion.div
          {...rise(0.85)}
          className="order-3 flex flex-col items-start gap-4 md:items-end"
        >
          <a href="#contact" className="pill-gradient">
            Contact me
          </a>
          <a href="#projects" className="link-quiet inline-flex items-center gap-1.5 text-sm">
            See my work <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>

      <motion.ul
        {...rise(1)}
        className="page-container muted mt-14 flex flex-wrap justify-center gap-x-8 gap-y-2 text-center text-[13px]"
      >
        <li>Live sites for Postie Coffee and an NDIS provider</li>
        <li>CDU IT Code Fair 2026 · SignBridge</li>
        <li>Master of IT (AI), Charles Darwin University</li>
      </motion.ul>
    </section>
  );
}
