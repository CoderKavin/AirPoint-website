"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Hand, type GestureKind } from "./hand-svg";
import { CursorAction } from "./cursor-action";

const GESTURES: { id: GestureKind; label: string; sub: string; action: string }[] = [
  { id: "open", label: "Open hand", sub: "Cursor follows your palm", action: "moving" },
  { id: "pinch", label: "Pinch", sub: "Click anything", action: "click" },
  { id: "fist", label: "Fist", sub: "Right click menu", action: "right click" },
  { id: "scroll", label: "Two fingers", sub: "Scroll the page", action: "scroll" },
];

// Where the hand sits in the camera view, per gesture.
const HAND_POS: Record<GestureKind, { x: string; y: string }> = {
  open:   { x: "26%", y: "50%" },
  pinch:  { x: "55%", y: "42%" },
  fist:   { x: "42%", y: "58%" },
  scroll: { x: "60%", y: "50%" },
};

// Where the cursor sits, slightly offset from the hand to show the relationship.
const CURSOR_POS: Record<GestureKind, { x: string; y: string }> = {
  open:   { x: "60%", y: "44%" },
  pinch:  { x: "80%", y: "38%" },
  fist:   { x: "70%", y: "62%" },
  scroll: { x: "85%", y: "48%" },
};

export function ProductWindow() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % GESTURES.length), 3200);
    return () => clearInterval(t);
  }, [reduce]);

  const gesture = GESTURES[idx];
  const handPos = HAND_POS[gesture.id];
  const cursorPos = CURSOR_POS[gesture.id];

  return (
    <div className="relative w-full">
      {/* Bloom */}
      <div className="absolute inset-0 -m-12 pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-[3rem]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(43,58,82,0.28) 0%, rgba(43,58,82,0.10) 35%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="relative rounded-[1.25rem] overflow-hidden border border-[#1a1a1a] bg-[#0c0c0e] shadow-[0_30px_80px_-10px_rgba(0,0,0,0.45),0_8px_24px_-8px_rgba(0,0,0,0.35)]"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#1f1f1f] bg-[#0e0e10]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 text-center text-[11px] text-[#9a958a] font-mono tracking-wide">
            AirPoint
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#9a958a]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#28c840] pulse-ring" />
            Live
          </div>
        </div>

        <div className="grid grid-cols-5 bg-[#0a0a0c]">
          {/* Camera pane (the "what AirPoint sees") */}
          <div className="col-span-3 relative aspect-[16/11] overflow-hidden border-r border-[#1f1f1f]">
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 45% 50%, #1c2434 0%, #0e1320 55%, #06080e 100%)" }}
            />
            {/* faint scanline */}
            <div
              className="absolute inset-0 opacity-[0.05] mix-blend-screen"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.5) 50%)",
                backgroundSize: "100% 3px",
              }}
            />

            {/* "Camera view" label */}
            <div className="absolute top-4 left-4 text-[9px] font-mono text-white/40 uppercase tracking-[0.22em]">
              Camera view
            </div>
            <div className="absolute top-4 right-4 px-2 py-1 rounded-md bg-black/55 backdrop-blur border border-white/10 text-[10px] font-mono text-white/70 tracking-wider">
              30 fps · 1280×720
            </div>

            {/* Animated hand */}
            <motion.div
              className="absolute w-[36%] aspect-[5/6]"
              animate={{ left: handPos.x, top: handPos.y }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{ transform: "translate(-50%, -50%)" }}
            >
              {/* soft palm halo behind */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at 50% 60%, rgba(154,212,227,0.25) 0%, transparent 60%)",
                  filter: "blur(12px)",
                }}
              />
              <Hand gesture={gesture.id} />

              {/* Hand center tracking dot */}
              <motion.div
                className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white ring-2 ring-[#9ad4e3] shadow-[0_0_10px_rgba(154,212,227,0.8)]" />
              </motion.div>
            </motion.div>

            {/* Tracking line from hand to cursor */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <motion.line
                animate={{ x1: handPos.x, y1: handPos.y, x2: cursorPos.x, y2: cursorPos.y }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                stroke="#9ad4e3"
                strokeOpacity="0.28"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Cursor with action overlay */}
            <motion.div
              className="absolute pointer-events-none z-10"
              animate={{ left: cursorPos.x, top: cursorPos.y }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{ transform: "translate(-2px, -2px)" }}
            >
              <CursorAction gesture={gesture.id} />
            </motion.div>

            {/* Gaze indicator */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/55 backdrop-blur border border-white/10 text-[10px] font-mono text-white/70 tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
              gaze lock
            </div>
            <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-md bg-black/55 backdrop-blur border border-white/10 text-[10px] font-mono text-[#9ad4e3]/85 tracking-wider">
              hand · ({handPos.x.replace("%", "")}, {handPos.y.replace("%", "")})
            </div>
          </div>

          {/* Status panel */}
          <div className="col-span-2 p-7 flex flex-col gap-5 bg-[#0e0e10] min-h-full">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#666] font-mono">
              What it&apos;s doing
            </div>

            <div className="min-h-[4rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={gesture.id}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-1"
                >
                  <div className="text-3xl font-medium tracking-tight text-[#f0ece4]">
                    {gesture.label}
                  </div>
                  <div className="text-sm text-[#9a958a]">{gesture.sub}</div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-1.5 text-xs">
              {GESTURES.map((g, i) => (
                <div
                  key={g.id}
                  className={`flex items-center justify-between px-3 py-2 rounded-md border transition-colors ${
                    i === idx
                      ? "border-[#9ad4e3]/40 bg-[#172230] text-[#e8f4f8]"
                      : "border-[#1a1a1a] bg-transparent text-[#555]"
                  }`}
                >
                  <span className="font-mono lowercase">{g.label}</span>
                  <span className="text-[10px] text-[#666] font-mono uppercase tracking-wider">
                    {g.action}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-[#1f1f1f]">
              <div className="text-[9px] text-[#555] font-mono uppercase tracking-[0.2em] mb-2">
                Profile · Kavin
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#9a958a]">
                <div className="flex-1 h-1 rounded-full bg-[#1a1a1a] overflow-hidden">
                  <div className="h-full w-[78%] bg-gradient-to-r from-[#9ad4e3]/40 to-[#9ad4e3]" />
                </div>
                <span className="font-mono">calibrated</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
