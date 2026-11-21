"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;

/** A short opening reveal: the name appears, then the panel lifts away. */
export default function Curtain() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (reduce) {
      setShow(false);
      return;
    }
    const id = window.setTimeout(() => setShow(false), 650);
    return () => window.clearTimeout(id);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && !reduce ? (
        <motion.div
          key="curtain"
          className="curtain"
          aria-hidden
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="overflow-hidden">
            <motion.p
              className="font-display text-3xl font-bold tracking-tight md:text-5xl"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-110%", opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              Sabin Pradhan
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
