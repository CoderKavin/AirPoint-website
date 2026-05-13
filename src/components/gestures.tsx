"use client";

import { motion } from "framer-motion";
import { HandIcon, type GestureKind } from "./hand-svg";

type Card = {
  gesture: GestureKind;
  title: string;
  action: string;
  detail: string;
};

const CARDS: Card[] = [
  {
    gesture: "open",
    title: "Open hand",
    action: "Move the cursor",
    detail: "Follows your palm center, not a fingertip. Shaky hands still draw a calm cursor.",
  },
  {
    gesture: "pinch",
    title: "Pinch",
    action: "Click",
    detail: "Thumb and index meet. That&apos;s a click. Hold to drag.",
  },
  {
    gesture: "fist",
    title: "Fist",
    action: "Right click",
    detail: "Close to a loose curl. Brief curls never fire accidentally.",
  },
  {
    gesture: "scroll",
    title: "Two fingers",
    action: "Scroll",
    detail: "Two fingers up, others down. The thumb is ignored on purpose.",
  },
];

export function Gestures() {
  return (
    <section id="how-it-works" className="relative py-32 bg-[#e4ecf8]">
      <div className="max-w-[1240px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#5a6580] mb-5">
            Four gestures
          </div>
          <h2 className="serif text-5xl sm:text-7xl text-balance">
            The whole mouse, <span className="serif-italic text-[#2c5cb8]">with one hand.</span>
          </h2>
          <p className="mt-7 text-[#3a4566] text-lg sm:text-xl text-balance leading-relaxed">
            Forgiving on purpose. Calibration tunes each one to the shape your
            hand can actually make.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-2xl border border-[#d8e0ec] bg-[#ffffff]"
            >
              <div className="mb-5 h-12 flex items-end">
                <HandIcon gesture={c.gesture} sizePx={44} />
              </div>
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#5a6580] mb-2">
                {c.title}
              </div>
              <div className="text-xl font-medium mb-2 text-[#0c1b3a]">{c.action}</div>
              <p
                className="text-sm text-[#3a4566] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: c.detail }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
