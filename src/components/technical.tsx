"use client";

import { motion } from "framer-motion";

type Feature = {
  tag: string;
  title: string;
  body: string;
  metric?: string;
  metricLabel?: string;
};

const FEATURES: Feature[] = [
  {
    tag: "Hand center tracking",
    title: "Smooths out tremor.",
    body: "Most tools follow one fingertip. AirPoint averages all 21 landmarks and smooths the result twice.",
    metric: "21 to 1",
    metricLabel: "landmarks averaged",
  },
  {
    tag: "Gaze aware safety",
    title: "Stops when you look away.",
    body: "A second model watches your face. Look away and every gesture pauses, including any drag mid release.",
    metric: "Face Mesh",
    metricLabel: "passive monitor",
  },
  {
    tag: "Always local",
    title: "Never leaves your device.",
    body: "Webcam, tracking, gestures, all on device. No cloud, no telemetry, no account.",
    metric: "0 bytes",
    metricLabel: "sent off device",
  },
];

export function Technical() {
  return (
    <section id="features" className="relative py-32 paper">
      <div className="relative max-w-[1240px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20"
        >
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#6b6862] mb-5">
            Under the hood
          </div>
          <h2 className="serif text-5xl sm:text-7xl text-balance">
            Not a demo. <span className="serif-italic text-[#2b3a52]">A tool.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e3ddd0] rounded-2xl overflow-hidden border border-[#e3ddd0]">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.tag}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="p-10 bg-[#fdfbf6]"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#2b3a52]">
                  {f.tag}
                </div>
                {f.metric && (
                  <div className="text-right">
                    <div className="font-mono text-xl text-[#181818]">{f.metric}</div>
                    <div className="text-[10px] uppercase tracking-wider text-[#6b6862] mt-0.5">
                      {f.metricLabel}
                    </div>
                  </div>
                )}
              </div>
              <h3 className="serif text-3xl mb-3 text-balance text-[#181818]">
                {f.title}
              </h3>
              <p className="text-[#3b3b3b] leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#6b6862] mb-6">
            Built with
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-3 text-[#3b3b3b]">
            {["MediaPipe", "OpenCV", "PyAutoGUI", "PyQt5", "Python"].map((t) => (
              <span key={t} className="font-medium tracking-wide hover:text-[#181818] transition-colors">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
