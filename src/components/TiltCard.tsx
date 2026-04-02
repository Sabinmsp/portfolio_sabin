"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 12,
  scale = 1.02,
  perspective = 700,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setTilt({
        rotateX: (0.5 - y) * maxTilt,
        rotateY: (x - 0.5) * maxTilt,
      });
    },
    [maxTilt, isTouch]
  );

  const handleEnter = useCallback(() => { if (!isTouch) setIsHovered(true); }, [isTouch]);
  const handleLeave = useCallback(() => {
    if (isTouch) return;
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, [isTouch]);

  if (isTouch) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <div style={{ perspective }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: isHovered ? scale : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        className={`relative ${className}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
