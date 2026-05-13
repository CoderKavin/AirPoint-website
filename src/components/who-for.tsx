"use client";

import { motion } from "framer-motion";

const AUDIENCES = [
  {
    title: "Cerebral palsy",
    body: "AirPoint adapts to whatever range of motion you have. Calibration learns your steadiness and your reachable area, so the cursor moves where you intend, not where a stock controller thinks you do.",
  },
  {
    title: "Tremor and limited grip",
    body: "Tracking the center of your whole hand smooths out finger tremor automatically. A two stage filter removes jitter without adding lag, so a shaky hand still lands a click.",
  },
  {
    title: "RSI and post surgery",
    body: "Some days you can&apos;t grip a mouse. AirPoint is a way to keep working when your wrist or fingers need a break, without learning new software or buying special hardware.",
  },
  {
    title: "Anyone else",
    body: "It also works great if you just want to control your computer with your hand. Same software, no different mode.",
  },
];

export function WhoFor() {
  return (
    <section className="relative py-32 paper">
      <div className="max-w-[1240px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20"
        >
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#6b6862] mb-5">
            Who it is for
          </div>
          <h2 className="serif text-5xl sm:text-7xl text-balance">
            For hands that don&apos;t move
            <br />
            the way a mouse <span className="serif-italic text-[#2b3a52]">expects.</span>
          </h2>
          <p className="mt-7 text-[#3b3b3b] text-lg sm:text-xl text-balance leading-relaxed max-w-2xl">
            A mouse needs a steady grip, a precise click, and a smooth slide
            across a surface. Plenty of people can&apos;t do all three. AirPoint
            asks for one thing only, that you can hold your hand in front of a
            webcam.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e3ddd0] rounded-2xl overflow-hidden border border-[#e3ddd0]">
          {AUDIENCES.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="p-10 bg-[#fdfbf6]"
            >
              <div className="text-2xl font-medium tracking-tight mb-3 text-[#181818]">
                {a.title}
              </div>
              <p
                className="text-[#3b3b3b] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: a.body }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
