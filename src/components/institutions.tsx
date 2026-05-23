"use client";

import { motion } from "framer-motion";
import { WorldMap, type Pin } from "./world-map";

type Institution = {
  monogram: string;
  name: string;
  city: string;
  country: string;
  est: string;
  description: string;
  status?: "first" | "partner" | "pilot";
  coords: [number, number];
};

const INSTITUTIONS: Institution[] = [
  {
    monogram: "VS",
    name: "Vidya Sagar",
    city: "Chennai",
    country: "India",
    est: "1985",
    description:
      "A pioneering school for children and adults with cerebral palsy and other disabilities. For four decades, one of India's most influential voices in disability rights and inclusive education.",
    status: "first",
    coords: [80.27, 13.08],
  },
  {
    monogram: "NISH",
    name: "NISH",
    city: "Trivandrum",
    country: "India",
    est: "1997",
    description:
      "The National Institute of Speech & Hearing — a premier autonomous institute under the Government of Kerala, offering higher education, rehabilitation, and research for people with hearing impairment and communication disorders.",
    status: "partner",
    coords: [76.94, 8.55],
  },
];

const STATUS_LABELS: Record<NonNullable<Institution["status"]>, string> = {
  first: "First partner",
  partner: "Partner",
  pilot: "Pilot",
};

const ACCENT = "#e8b87e";

export function Institutions() {
  const count = INSTITUTIONS.length;
  const countries = new Set(INSTITUTIONS.map((i) => i.country)).size;
  const pins: Pin[] = INSTITUTIONS.map((i) => ({ name: i.city, coords: i.coords }));

  return (
    <section className="relative py-32 paper">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="text-xs font-mono uppercase tracking-[0.22em] text-[#5a6580] mb-5">
            In use at
          </div>
          <h2 className="serif text-5xl sm:text-7xl text-balance">
            Institutions <span className="serif-italic text-[#2c5cb8]">deploying</span> AirPoint.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: editorial list */}
          <div className="lg:col-span-5">
            {INSTITUTIONS.map((inst, i) => (
              <motion.article
                key={inst.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-[auto_1fr] gap-5 py-8 border-t border-[#d8e0ec] first:border-t-0 first:pt-0"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="text-[10px] font-mono text-[#7a8499] tracking-wider">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    className="relative w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT}24, ${ACCENT}08)`,
                      border: `1px solid ${ACCENT}44`,
                    }}
                  >
                    <div
                      className="absolute -top-4 -right-4 w-12 h-12 rounded-full"
                      style={{ background: `radial-gradient(circle, ${ACCENT}55, transparent 70%)` }}
                    />
                    <span
                      className="relative serif-italic text-2xl tracking-tight"
                      style={{ color: "#8d5e2a" }}
                    >
                      {inst.monogram}
                    </span>
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {inst.status && (
                      <span
                        className="text-[10px] font-mono uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                        style={{ background: `${ACCENT}22`, color: "#6b4319", border: `1px solid ${ACCENT}55` }}
                      >
                        {STATUS_LABELS[inst.status]}
                      </span>
                    )}
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#7a8499]">
                      est. {inst.est}
                    </span>
                  </div>

                  <h3 className="serif text-3xl sm:text-4xl text-[#0c1b3a] tracking-tight leading-none mb-2">
                    {inst.name}
                  </h3>
                  <div className="text-xs font-mono text-[#5a6580] tracking-wide mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                    {inst.city}, {inst.country}
                  </div>
                  <p className="text-sm text-[#3a4566] leading-relaxed text-balance">
                    {inst.description}
                  </p>
                </div>
              </motion.article>
            ))}

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mt-4 overflow-hidden rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, #0c1b3a 0%, #1a2e5a 50%, #2c5cb8 100%)",
              }}
            >
              {/* Subtle inner sheen */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              {/* Atmospheric glow */}
              <div
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(154,212,227,0.30) 0%, transparent 65%)",
                  filter: "blur(12px)",
                }}
              />

              <div className="relative p-8 sm:p-10">
                <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#9ad4e3] mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9ad4e3] pulse-ring" />
                  Open for partners
                </div>

                <h3 className="serif text-3xl sm:text-4xl text-white mb-3 leading-tight">
                  Bring AirPoint to{" "}
                  <span className="serif-italic text-[#9ad4e3]">your students.</span>
                </h3>

                <p className="text-[#c8d2e8] leading-relaxed mb-7 text-balance">
                  Free, supported, and ready to deploy on any computer with a
                  webcam. We&apos;ll help with setup, training material, and
                  remote walkthroughs for your team.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <a
                    href="mailto:kavinvenkatesanofficial@gmail.com?subject=Deploying%20AirPoint%20at%20our%20institution"
                    className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-[#0c1b3a] text-sm font-medium hover:bg-[#9ad4e3] transition-colors"
                  >
                    Get in touch
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </a>
                  <a
                    href="mailto:kavinvenkatesanofficial@gmail.com"
                    className="text-sm font-mono text-[#9ad4e3]/85 tracking-wide hover:text-white transition-colors"
                  >
                    kavinvenkatesanofficial@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: dark map card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative rounded-[1.5rem] overflow-hidden border border-[#1f1f1f] bg-[#0a0a0c] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
          >
            {/* Atmosphere glow */}
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-[120%] h-56 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center top, ${ACCENT}22 0%, transparent 60%)`,
              }}
            />
            {/* Starfield */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, #ffffff04 1px, transparent 1.5px), radial-gradient(circle at 65% 70%, #ffffff05 1px, transparent 1.5px), radial-gradient(circle at 80% 20%, #ffffff04 1px, transparent 1.5px), radial-gradient(circle at 30% 80%, #ffffff03 1px, transparent 1.5px)",
                backgroundSize: "300px 300px, 400px 400px, 350px 350px, 250px 250px",
              }}
            />

            <div className="relative px-5 sm:px-7 pt-6 pb-3">
              <div className="flex items-center justify-between mb-3 text-[10px] font-mono uppercase tracking-[0.22em] text-[#8a857c]">
                <span>Live deployment map</span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-ring" />
                  {count} active
                </span>
              </div>
              <WorldMap pins={pins} accent={ACCENT} />
            </div>

            <div className="relative border-t border-[#1f1f1f] grid grid-cols-3 divide-x divide-[#1f1f1f]">
              <DarkStat value={count.toString()} label={count === 1 ? "Institution" : "Institutions"} />
              <DarkStat value={countries.toString()} label={countries === 1 ? "Country" : "Countries"} />
              <DarkStat value="Free" label="Forever" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DarkStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-4 py-4 text-center">
      <div className="serif text-2xl text-[#f4f0e8]">{value}</div>
      <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#8a857c] mt-1">
        {label}
      </div>
    </div>
  );
}
