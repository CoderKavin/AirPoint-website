"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Hand as PhHand,
  HandFist as PhHandFist,
  HandPeace as PhHandPeace,
  HandPointing as PhHandPointing,
} from "@phosphor-icons/react";

export type GestureKind = "open" | "pinch" | "fist" | "scroll";

function HandSvg({
  gesture,
  size,
  color,
}: {
  gesture: GestureKind;
  size: number;
  color: string;
}) {
  const props = { size, color, weight: "duotone" as const };
  switch (gesture) {
    case "open":
      return <PhHand {...props} />;
    case "pinch":
      return <PhHandPointing {...props} />;
    case "fist":
      return <PhHandFist {...props} />;
    case "scroll":
      return <PhHandPeace {...props} />;
  }
}

/** Big hand used in the demo (dark camera background, pale icon). */
export function Hand({ gesture, sizePx = 240 }: { gesture: GestureKind; sizePx?: number }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="absolute"
        style={{
          width: sizePx * 0.95,
          height: sizePx * 1.05,
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(154,212,227,0.32) 0%, rgba(154,212,227,0.10) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={gesture}
          initial={{ opacity: 0, scale: 0.82, rotate: -6, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.94, rotate: 5, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative select-none drop-shadow-[0_12px_28px_rgba(154,212,227,0.4)]"
        >
          <HandSvg gesture={gesture} size={sizePx} color="#dfeef5" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function HandIcon({ gesture, sizePx = 44 }: { gesture: GestureKind; sizePx?: number }) {
  return (
    <span className="inline-block">
      <HandSvg gesture={gesture} size={sizePx} color="#1c2a3f" />
    </span>
  );
}
