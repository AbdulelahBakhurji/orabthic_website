"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Circle,
  Cloud,
  Headphones,
  Layers,
  Plug,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { SectionShell } from "@/components/shared/SectionShell";
import { useMotionConfig } from "@/lib/motion";
import { cn } from "@/lib/utils";

const inclusionIcons = [Layers, Cloud, Rocket, BookOpen, Plug, Headphones];

type InclusionItem = {
  title: string;
  description: string;
  tags: string[];
};

function InclusionVisual({ index }: { index: number }) {
  const bars = [72, 48, 88, 56, 64, 40];
  const height = bars[index % bars.length];

  return (
    <div className="relative rounded-xl border border-black-700 bg-black-950/80 overflow-hidden aspect-[16/10]">
      <div className="absolute inset-0 grid-fine-dense opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-transparent pointer-events-none" />
      <div className="relative p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1">
            {[1, 2, 3].map((dot) => (
              <span key={dot} className="h-1.5 w-1.5 rounded-full bg-black-600 border border-black-700" />
            ))}
          </div>
          <span className="font-mono text-[8px] uppercase tracking-wider text-white-300">
            stack.layer.{String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="flex-1 flex items-end gap-2">
          {[0.55, 0.75, 1, 0.65, 0.85, 0.5].map((scale, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${Math.round(height * scale)}%` }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
              className={cn(
                "flex-1 rounded-t-md border border-black-700",
                i === 2 ? "bg-white-100/90" : "bg-black-800"
              )}
            />
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-black-700 flex items-center justify-between">
          <span className="font-body text-[10px] text-emerald-600 flex items-center gap-1.5">
            <Circle className="h-2 w-2 fill-emerald-500 text-emerald-500" />
            active
          </span>
          <span className="font-mono text-[9px] text-white-300">included · standard</span>
        </div>
      </div>
    </div>
  );
}

export function PricingEngagementInclusions() {
  const t = useTranslations("pricing");
  const { fadeUp, stagger, transition, viewport } = useMotionConfig();
  const inclusions = t.raw("inclusions") as InclusionItem[];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = inclusions[activeIndex];
  const ActiveIcon = inclusionIcons[activeIndex] ?? Layers;

  const cycle = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % inclusions.length);
  }, [inclusions.length]);

  useEffect(() => {
    const timer = setInterval(cycle, 5500);
    return () => clearInterval(timer);
  }, [cycle]);

  return (
    <SectionShell
      label={t("inclusionsLabel")}
      title={t("inclusionsTitle")}
      description={t("inclusionsSubtitle")}
      className="bg-black-900/50"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
        className="space-y-6"
      >
        {/* Console frame */}
        <motion.div
          variants={fadeUp}
          transition={transition}
          className="relative rounded-3xl border border-black-700 bg-black-950 shadow-elevated overflow-hidden"
        >
          <div className="absolute inset-0 grid-fine opacity-25 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] via-transparent to-transparent pointer-events-none" />

          {/* Title bar */}
          <div className="relative flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-black-700 bg-black-900/95">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-black-600 border border-black-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-black-600 border border-black-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-black-600 border border-black-700" />
              </div>
              <div className="hidden sm:flex items-center gap-2 ps-2 border-s border-black-700">
                <ShieldCheck className="h-3.5 w-3.5 text-white-300" strokeWidth={1.5} />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white-300">
                  {t("inclusionsStackId")}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                <Circle className="h-2 w-2 fill-emerald-500 text-emerald-500 animate-pulse" />
                {t("inclusionsStatus")}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-white-300 bg-black-800 border border-black-700 px-2.5 py-1 rounded-md">
                {inclusions.length} · {t("inclusionsCoreLayer")}
              </span>
            </div>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 lg:divide-x divide-black-700">
            {/* Rack nav */}
            <div className="lg:col-span-4 p-4 lg:p-5 border-b lg:border-b-0 border-black-700">
              <p className="font-body text-[9px] uppercase tracking-[0.2em] text-white-300 mb-4 font-semibold px-1">
                {t("inclusionsNavLabel")}
              </p>
              <ul className="space-y-1.5">
                {inclusions.map((item, i) => {
                  const Icon = inclusionIcons[i] ?? Layers;
                  const isActive = i === activeIndex;
                  return (
                    <li key={item.title}>
                      <button
                        type="button"
                        onClick={() => setActiveIndex(i)}
                        className={cn(
                          "relative w-full flex items-start gap-3 rounded-xl px-3 py-3 text-start transition-colors duration-300",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                          isActive ? "text-white-100" : "text-white-300 hover:text-white-100 hover:bg-black-900/60"
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="inclusion-active"
                            className="absolute inset-0 rounded-xl bg-black-900 border border-black-700 shadow-soft"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10 font-mono text-[10px] text-white-300 w-6 pt-0.5 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black-700 bg-black-950">
                          <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </span>
                        <span className="relative z-10 flex-1 min-w-0">
                          <span className="block font-display text-sm font-bold leading-snug">{item.title}</span>
                          <span className="block font-body text-[10px] text-white-300 mt-0.5 truncate">
                            {item.tags?.[0]}
                          </span>
                        </span>
                        {isActive && (
                          <span className="relative z-10 font-mono text-[8px] uppercase tracking-wider text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded shrink-0 mt-0.5">
                            {t("inclusionsIncluded")}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Detail panel */}
            <div className="lg:col-span-8 p-5 lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-11 w-11 rounded-xl bg-black-900 border border-black-700 flex items-center justify-center">
                        <ActiveIcon className="h-5 w-5 text-white-200" strokeWidth={1.5} />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-white-300 block mb-0.5">
                          {String(activeIndex + 1).padStart(2, "0")} · {t("inclusionsIncluded")}
                        </span>
                        <h3 className="font-display text-2xl font-bold text-white-100 leading-tight">{active.title}</h3>
                      </div>
                    </div>
                    <p className="font-body text-sm text-white-300 leading-relaxed mb-6">{active.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {active.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="font-body text-[10px] uppercase tracking-wide text-white-300 bg-black-900 border border-black-700 px-2.5 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <InclusionVisual index={activeIndex} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Core layer strip */}
          <div className="relative border-t border-black-700 px-5 py-4 bg-black-900/80">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-white-300" strokeWidth={1.5} />
                <span className="font-body text-[10px] uppercase tracking-[0.16em] text-white-300 font-semibold">
                  {t("inclusionsCoreLayer")}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {inclusions.map((item, i) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={item.title}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === activeIndex ? "w-8 bg-white-100" : "w-1.5 bg-black-600 hover:bg-black-500"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
}
