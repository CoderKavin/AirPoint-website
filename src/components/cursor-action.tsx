"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { GestureKind } from "./hand-svg";

/**
 * The cursor and its action overlay, per gesture.
 * Open hand: cursor drifts gently with a soft trail.
 * Pinch: click ripple expanding from the cursor.
 * Fist: a tiny context menu pops up next to the cursor.
 * Two fingers: vertical scroll chevrons next to the cursor.
 */

function CursorIcon() {
  return (
    <svg viewBox="0 0 16 16" className="w-4 h-4 drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]">
      <path
        d="M2 1 L2 12.5 L5.5 9 L8 14 L10.2 12.9 L7.6 8 L13 8 Z"
        fill="white"
        stroke="#0a0a0c"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CursorAction({ gesture }: { gesture: GestureKind }) {
  return (
    <div className="relative">
      <CursorIcon />

      <AnimatePresence>
        {gesture === "pinch" && (
          <motion.div
            key="pinch-ripple"
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeOut", repeat: Infinity, repeatDelay: 0.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-[#9ad4e3]"
          />
        )}

        {gesture === "fist" && (
          <motion.div
            key="fist-menu"
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute left-4 top-3 w-32 rounded-md bg-[#1a1a1c] border border-[#2a2a2c] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            <div className="px-3 py-1.5 text-[10px] text-white/85 font-medium hover:bg-[#252528]">
              Open
            </div>
            <div className="px-3 py-1.5 text-[10px] text-white/85 hover:bg-[#252528]">
              Copy
            </div>
            <div className="px-3 py-1.5 text-[10px] text-white/85 hover:bg-[#252528]">
              Paste
            </div>
            <div className="h-px bg-[#2a2a2c]" />
            <div className="px-3 py-1.5 text-[10px] text-white/85 hover:bg-[#252528]">
              Inspect
            </div>
          </motion.div>
        )}

        {gesture === "scroll" && (
          <motion.div
            key="scroll-chevrons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [-4, 0, -4], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#9ad4e3]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 9 L7 5 L11 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <motion.div
              animate={{ y: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#9ad4e3]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 5 L7 9 L11 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        )}

        {gesture === "open" && (
          <motion.div
            key="open-trail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(154,212,227,0.35), transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Action label below cursor */}
      <AnimatePresence mode="wait">
        <motion.div
          key={gesture}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.35 }}
          className="absolute left-5 top-5 whitespace-nowrap text-[10px] font-mono text-white/85 bg-black/65 px-2 py-0.5 rounded backdrop-blur"
        >
          {gesture === "open" && "moving"}
          {gesture === "pinch" && "click"}
          {gesture === "fist" && "right click"}
          {gesture === "scroll" && "scroll"}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
