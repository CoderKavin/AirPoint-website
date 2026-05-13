"use client";

import { motion } from "framer-motion";

export function FounderNote() {
  return (
    <section className="relative py-32 bg-[#181818] text-[#f4f0e8] overflow-hidden">
      {/* Subtle warm light from corner */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(218, 175, 122, 0.18) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-[920px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="text-xs font-mono uppercase tracking-[0.22em] text-[#8a857c] mb-10"
        >
          From the maker
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="serif text-3xl sm:text-5xl leading-[1.18] tracking-tight text-balance"
        >
          <span className="serif-italic text-[#daaf7a]">&ldquo;</span>
          I started AirPoint because the people I love most could not use a
          mouse the way the software industry assumed they could.{" "}
          <span className="text-[#bcb6a8]">
            Accessibility is not a feature you tack on, it is the default a
            product should ship with.
          </span>{" "}
          AirPoint is free, open source, and local first because no one should
          have to pay a subscription to use their own computer.
          <span className="serif-italic text-[#daaf7a]">&rdquo;</span>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-10 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#daaf7a] to-[#8d5e2a] flex items-center justify-center text-[#181818] font-medium text-sm">
            KV
          </div>
          <div>
            <div className="text-sm font-medium text-[#f4f0e8]">Kavin Venkat</div>
            <div className="text-xs text-[#8a857c] font-mono tracking-wide">Maker of AirPoint</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
