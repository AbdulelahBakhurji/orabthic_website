"use client";

import { motion } from "framer-motion";

const locations = [
  { cx: 520, cy: 210, label: "Saudi Arabia" },
  { cx: 530, cy: 215, label: "UAE" },
  { cx: 490, cy: 220, label: "Egypt" },
  { cx: 420, cy: 175, label: "UK" },
  { cx: 450, cy: 180, label: "Germany" },
  { cx: 200, cy: 200, label: "USA" },
  { cx: 720, cy: 250, label: "Singapore" },
  { cx: 480, cy: 340, label: "South Africa" },
];

export function WorldMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 450"
      fill="none"
      className={className}
      aria-label="Global presence map"
    >
      <ellipse cx="450" cy="225" rx="420" ry="200" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <path
        d="M50 225 Q225 100 450 120 Q675 140 850 225 Q675 310 450 330 Q225 350 50 225"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M450 25 Q550 150 450 225 Q350 300 450 425"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="1"
        fill="none"
      />

      {Array.from({ length: 20 }).map((_, i) =>
        Array.from({ length: 40 }).map((_, j) => (
          <circle
            key={`${i}-${j}`}
            cx={20 + j * 22}
            cy={20 + i * 22}
            r="0.5"
            fill="rgba(255,255,255,0.04)"
          />
        ))
      )}

      {locations.map((loc, i) => (
        <g key={loc.label}>
          <motion.circle
            cx={loc.cx}
            cy={loc.cy}
            r="4"
            fill="white"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
          <circle cx={loc.cx} cy={loc.cy} r="8" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
        </g>
      ))}
    </svg>
  );
}
