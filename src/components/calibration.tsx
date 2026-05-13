"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Your range of motion",
    body: "Wave your hand around the area you can comfortably reach. AirPoint maps that exact area to your whole screen. If you can only move your hand in a six inch box, six inches now covers every pixel.",
  },
  {
    n: "02",
    title: "Your steadiness",
    body: "Hold your hand still for a few seconds. AirPoint measures your involuntary motion and uses that number to size the dead zone. The cursor only moves when you mean to move it.",
  },
  {
    n: "03",
    title: "Your pinch",
    body: "Show your version of a pinch. Thumb and index touching, almost touching, whatever you can do. AirPoint records that shape, not a textbook shape, as the click trigger.",
  },
  {
    n: "04",
    title: "Your fist",
    body: "Same idea for right click. A loose curl is fine. The detector matches the shape you can actually make, not a perfect closed fist.",
  },
];

export function Calibration() {
  return (
    <section className="relative py-32">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#5a6580] mb-5">
              Calibration
            </div>
            <h2 className="serif text-5xl sm:text-7xl text-balance">
              The software adapts <span className="serif-italic text-[#2c5cb8]">to you.</span>
            </h2>
            <p className="mt-7 text-[#3a4566] text-lg sm:text-xl text-balance leading-relaxed">
              The first time you open AirPoint, a thirty second wizard learns
              how your hand moves. Your reachable area becomes your full
              screen. Your normal tremor becomes the cursor dead zone. Your
              version of a pinch becomes the click. It saves to a per user
              profile, so the next person who needs it gets their own.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-[#5a6580]">
              <span className="inline-block w-8 h-px bg-[#2c5cb8]/40" />
              <span>One time setup, about thirty seconds.</span>
            </div>
          </motion.div>

          <div className="lg:col-span-7 space-y-3">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group flex gap-6 p-8 rounded-2xl border border-[#d8e0ec] bg-[#ffffff] hover:border-[#2c5cb8]/40 transition-colors"
              >
                <div className="shrink-0 font-mono text-[#2c5cb8] text-sm tracking-wider pt-1">
                  {s.n}
                </div>
                <div>
                  <div className="text-xl font-medium mb-2 tracking-tight text-[#0c1b3a]">
                    {s.title}
                  </div>
                  <p className="text-[#3a4566] leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
