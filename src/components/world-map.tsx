"use client";

import { motion } from "framer-motion";
// react-simple-maps doesn't ship with TypeScript definitions for v3.
// We're importing as any to keep this minimal.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error -- no types
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const WORLD_TOPO =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export type Pin = {
  name: string;
  coords: [number, number]; // [lon, lat]
};

export function WorldMap({ pins, accent = "#daaf7a" }: { pins: Pin[]; accent?: string }) {
  return (
    <div className="relative w-full">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 165, center: [12, 10] }}
        width={900}
        height={440}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={WORLD_TOPO}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#27304a"
                stroke="#4a5878"
                strokeWidth={0.7}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "#2e3858" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {pins.map((p) => (
          <Marker key={p.name} coordinates={p.coords}>
            {/* Outer pulse */}
            <motion.circle
              r={3}
              fill={accent}
              fillOpacity={0.35}
              animate={{ r: [3, 18], opacity: [0.6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
            {/* Mid ring */}
            <motion.circle
              r={3}
              fill="none"
              stroke={accent}
              strokeWidth={1}
              strokeOpacity={0.6}
              animate={{ r: [3, 12], opacity: [0.7, 0] }}
              transition={{ duration: 2.4, delay: 0.6, repeat: Infinity, ease: "easeOut" }}
            />
            {/* Solid dot */}
            <circle r={3.5} fill={accent} stroke="#fdfbf6" strokeWidth={1} />
            {/* Label */}
            <text
              y={-14}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                fontWeight: 500,
                fill: "#f0ece4",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                paintOrder: "stroke",
                stroke: "#0a0a0c",
                strokeWidth: 4,
                strokeLinejoin: "round",
              }}
            >
              {p.name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}
