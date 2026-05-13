"use client";

import { motion } from "framer-motion";
import { ProductWindow } from "./product-window";

const word = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const TOP = ["A", "mouse,", "for", "hands"];
const BOTTOM = ["that", "move"];

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 paper overflow-hidden">
      <div className="relative max-w-[1180px] mx-auto px-6">
        {/* Small label */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-xs font-mono uppercase tracking-[0.22em] text-[#5a6580] mb-8"
        >
          AirPoint
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.06, delayChildren: 0.2 }}
          className="serif text-center text-balance text-[#0c1b3a]"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" }}
        >
          <div className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-1">
            {TOP.map((w, i) => (
              <motion.span key={i} variants={word} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                {w}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-1 mt-1">
            {BOTTOM.map((w, i) => (
              <motion.span key={i} variants={word} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                {w}
              </motion.span>
            ))}
            <motion.span
              variants={word}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="serif-italic text-[#2c5cb8]"
            >
              differently.
            </motion.span>
          </div>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-8 max-w-2xl mx-auto text-center text-base sm:text-lg text-[#3a4566] text-balance leading-relaxed"
        >
          AirPoint is a free, open source way to use your computer with a
          webcam and your hand. It was built with cerebral palsy in mind, and
          calibration adapts to your range of motion, your tremor, your grip.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#download"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0c1b3a] text-[#eef3fa] text-sm font-medium hover:bg-[#2c5cb8] transition-colors"
          >
            Download free
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-1.5 px-2 text-sm font-medium text-[#0c1b3a] hover:opacity-70 transition-opacity"
          >
            See how it works
            <span>→</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.25 }}
          className="mt-5 text-center text-[11px] text-[#5a6580] font-mono tracking-wide"
        >
          macOS &amp; Windows · No account · Nothing leaves your device
        </motion.div>

        {/* Product window, the star */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          className="mt-20"
        >
          <ProductWindow />
        </motion.div>
      </div>
    </section>
  );
}
