"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

/**
 * Subtle dot cursor that follows the real mouse, with a slight spring lag.
 * Hints at AirPoint's tracking. Hidden on touch devices.
 */
export function PageCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 25, stiffness: 200, mass: 0.5 });
  const sy = useSpring(y, { damping: 25, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[60] pointer-events-none hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <div className="-ml-1.5 -mt-1.5 w-3 h-3 rounded-full bg-[#2b3a52]/60 mix-blend-multiply" />
    </motion.div>
  );
}
