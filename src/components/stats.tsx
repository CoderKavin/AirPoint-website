"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  sub: string;
};

const STATS: Stat[] = [
  { value: 21, label: "Hand landmarks", sub: "tracked every frame in real time" },
  { value: 30, suffix: "fps", label: "Tracking rate", sub: "smooth enough to feel native" },
  { value: 0, label: "Bytes uploaded", sub: "everything runs on your device" },
  { value: 100, suffix: "%", label: "Open source", sub: "Apache 2.0, every line public" },
];

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => Math.round(v).toString());
  const [shown, setShown] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = display.on("change", setShown);
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, value, mv, display]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
      {suffix && <span className="text-3xl ml-1 text-[#6b6862]">{suffix}</span>}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative py-28 paper">
      <div className="max-w-[1180px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center text-xs font-mono uppercase tracking-[0.22em] text-[#6b6862] mb-16"
        >
          By the numbers
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#e3ddd0] rounded-2xl overflow-hidden border border-[#e3ddd0]">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 bg-[#fdfbf6] text-center"
            >
              <div className="serif text-6xl sm:text-7xl text-[#181818] mb-3">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm font-medium text-[#181818] mb-1">{s.label}</div>
              <div className="text-xs text-[#6b6862] leading-relaxed text-balance">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
