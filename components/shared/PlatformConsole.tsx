"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, Circle, Cpu, Globe2, Layers, Radio } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const domainConfig = [
  { id: "health", angle: -90, radius: 38, throughput: 94 },
  { id: "enterprise", angle: 0, radius: 38, throughput: 88 },
  { id: "cloud", angle: 90, radius: 38, throughput: 99 },
  { id: "api", angle: 180, radius: 38, throughput: 91 },
] as const;

const logPool = [
  { time: "14:32:01", msg: "health.records → billing.claims", status: "ok" as const },
  { time: "14:32:04", msg: "api.webhook → enterprise.crm", status: "ok" as const },
  { time: "14:32:07", msg: "cloud.deploy → region.me-central", status: "ok" as const },
  { time: "14:32:10", msg: "enterprise.pos → inventory.sync", status: "ok" as const },
  { time: "14:32:13", msg: "payroll.run → accounting.ledger", status: "ok" as const },
  { time: "14:32:16", msg: "health.pharmacy → supply.chain", status: "ok" as const },
  { time: "14:32:19", msg: "api.auth → rbac.policy", status: "ok" as const },
  { time: "14:32:22", msg: "cloud.replica → eu-west-1", status: "sync" as const },
];

const regions = ["me-central", "eu-west", "us-east"] as const;

function polarToXY(angleDeg: number, radius: number, cx = 50, cy = 50) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}

function curvedPath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx = mx - dy * 0.12;
  const cy = my + dx * 0.12;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

export function PlatformConsole() {
  const t = useTranslations("home.console");
  const [activeIndex, setActiveIndex] = useState(0);
  const [logCursor, setLogCursor] = useState(0);
  const [regionIndex, setRegionIndex] = useState(0);
  const [eventRate, setEventRate] = useState(2400);
  const [syncMs, setSyncMs] = useState(12);

  const domains = useMemo(
    () =>
      domainConfig.map((d) => ({
        ...d,
        label: t(`domainList.${d.id}.label`),
        capabilities: t.raw(`domainList.${d.id}.capabilities`) as string[],
      })),
    [t]
  );

  const active = domains[activeIndex];

  const nodePositions = useMemo(
    () => domains.map((d) => ({ ...d, ...polarToXY(d.angle, d.radius) })),
    []
  );

  const visibleLogs = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 3; i++) {
      const idx = (logCursor - i + logPool.length) % logPool.length;
      lines.unshift(logPool[idx]);
    }
    return lines;
  }, [logCursor]);

  const cycleDomain = useCallback(() => {
    setActiveIndex((p) => (p + 1) % domainConfig.length);
  }, []);

  useEffect(() => {
    const mod = setInterval(cycleDomain, 4000);
    const log = setInterval(() => setLogCursor((p) => (p + 1) % logPool.length), 2200);
    const region = setInterval(() => setRegionIndex((p) => (p + 1) % regions.length), 6000);
    const metrics = setInterval(() => {
      setEventRate((p) => 2200 + Math.floor(Math.random() * 400));
      setSyncMs((p) => 8 + Math.floor(Math.random() * 8));
    }, 1800);
    return () => {
      clearInterval(mod);
      clearInterval(log);
      clearInterval(region);
      clearInterval(metrics);
    };
  }, [cycleDomain]);

  return (
    <div className="relative w-full max-w-xl mx-auto lg:mx-0">
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-accent/[0.06] via-transparent to-coming-soon/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none" />

      <div className="relative glass-panel rounded-2xl overflow-hidden shadow-elevated border-black-700">
        {/* Title bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-black-700 bg-black-900/95">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-black-600 border border-black-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-black-600 border border-black-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-black-600 border border-black-700" />
            </div>
            <div className="flex items-center gap-1.5 ps-2 border-s border-black-700">
              <Circle className="h-2 w-2 fill-emerald-500 text-emerald-500 animate-pulse" />
              <span className="font-body text-[9px] uppercase tracking-[0.15em] text-emerald-600 font-semibold">
                {t("building")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-wider text-white-300 bg-black-800 border border-black-700 px-2 py-0.5 rounded">
              <Globe2 className="h-2.5 w-2.5" />
              {regions[regionIndex]}
            </span>
            <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white-300 font-medium">
              {t("brand")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 min-h-[420px]">
          {/* Sidebar */}
          <div className="col-span-4 border-e border-black-700 p-4 bg-black-800/50 flex flex-col">
            <p className="font-body text-[9px] uppercase tracking-[0.2em] text-white-300 mb-3 font-semibold">
              {t("domains")}
            </p>
            <ul className="space-y-1 flex-1">
              {domains.map((mod, i) => (
                <li key={mod.id}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border font-body text-xs transition-all text-start",
                      i === activeIndex
                        ? "bg-black-900 border-black-600 shadow-soft"
                        : "bg-transparent border-transparent hover:bg-black-900/40"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full shrink-0 transition-colors",
                        i === activeIndex ? "bg-accent animate-pulse" : "bg-black-600"
                      )}
                    />
                    <span className={i === activeIndex ? "text-white-100 font-semibold" : "text-white-300"}>
                      {mod.label}
                    </span>
                    {i === activeIndex && (
                      <span className="ms-auto font-mono text-[8px] text-emerald-600 tabular-nums">
                        {mod.throughput}%
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-3 pt-3 border-t border-black-700 space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="font-body text-[9px] uppercase tracking-label text-white-300">{t("metrics.sync")}</span>
                <motion.span
                  key={syncMs}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-[10px] text-white-100 font-medium tabular-nums"
                >
                  {syncMs}ms
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-[9px] uppercase tracking-label text-white-300">{t("metrics.events")}</span>
                <motion.span
                  key={eventRate}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-[10px] text-white-100 font-medium tabular-nums"
                >
                  {(eventRate / 1000).toFixed(1)}k/s
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-[9px] uppercase tracking-label text-white-300">{t("metrics.uptime")}</span>
                <span className="font-mono text-[10px] text-emerald-600 font-medium tabular-nums">99.99%</span>
              </div>
            </div>
          </div>

          {/* Main panel */}
          <div className="col-span-8 flex flex-col bg-black-900">
            <div className="p-4 flex-1 relative overflow-hidden">
              <div className="grid-fine-dense absolute inset-0 opacity-25 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="h-3.5 w-3.5 text-white-300" strokeWidth={1.5} />
                    <p className="font-body text-[10px] uppercase tracking-[0.15em] text-white-300 font-semibold">
                      {t("graph")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[8px] text-white-300 tabular-nums bg-black-800 px-2 py-0.5 rounded border border-black-700">
                      v4.2.0
                    </span>
                    <span className="font-body text-[8px] text-emerald-600 tabular-nums bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {t("live")}
                    </span>
                  </div>
                </div>

                {/* Graph */}
                <div className="relative h-40 mb-3 rounded-xl border border-black-700 bg-black-800/60 overflow-hidden">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden="true">
                    <defs>
                      <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(12,12,12,0.08)" />
                        <stop offset="100%" stopColor="rgba(12,12,12,0)" />
                      </radialGradient>
                    </defs>
                    <circle cx="50" cy="50" r="28" fill="url(#hub-glow)" />

                    {nodePositions.map((node, i) => {
                      const isActive = i === activeIndex;
                      const path = curvedPath(50, 50, node.x, node.y);
                      return (
                        <g key={node.id}>
                          <motion.path
                            d={path}
                            fill="none"
                            stroke={isActive ? "rgba(12,12,12,0.35)" : "rgba(0,0,0,0.1)"}
                            strokeWidth={isActive ? 0.6 : 0.4}
                            strokeDasharray={isActive ? "2 1.5" : "none"}
                            animate={isActive ? { strokeDashoffset: [0, -6] } : {}}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                          />
                          {isActive && (
                            <motion.circle
                              r="0.8"
                              fill="#0c0c0c"
                              initial={{ offsetDistance: "0%" }}
                              animate={{ offsetDistance: "100%" }}
                              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                              style={{ offsetPath: `path('${path}')` }}
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Hub */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full border border-black-700 bg-black-900 shadow-soft">
                      <Cpu className="h-4 w-4 text-white-300" strokeWidth={1.5} />
                    </div>
                    <p className="font-body text-[10px] text-white-300 text-center mt-1">
                      {t("core")}
                    </p>
                  </div>

                  {nodePositions.map((node, i) => (
                    <motion.div
                      key={node.id}
                      animate={{
                        opacity: i === activeIndex ? 1 : 0.5,
                        scale: i === activeIndex ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.35 }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                      <div
                        className={cn(
                          "px-2.5 py-1 rounded-md border font-body text-[9px] whitespace-nowrap shadow-soft",
                          i === activeIndex
                            ? "border-accent bg-accent text-accent-fg font-semibold"
                            : "border-black-700 bg-black-900 text-white-300"
                        )}
                      >
                        {node.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Active domain detail */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="mb-3 flex flex-wrap items-center gap-2"
                  >
                    <span className="font-body text-[8px] uppercase tracking-wider text-white-300 flex items-center gap-1">
                      <Layers className="h-3 w-3" />
                      {t("stackLabel", { domain: active.label })}
                    </span>
                    {active.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="font-mono text-[8px] text-white-200 bg-black-800 border border-black-700 px-2 py-0.5 rounded"
                      >
                        {cap}
                      </span>
                    ))}
                    <div className="ms-auto flex items-center gap-1.5 min-w-[80px]">
                      <div className="flex-1 h-1 rounded-full bg-black-700 overflow-hidden">
                        <motion.div
                          className="h-full bg-accent rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${active.throughput}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                      <span className="font-mono text-[8px] text-white-300 tabular-nums">{active.throughput}%</span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Event stream */}
                <div className="rounded-xl border border-black-700 bg-black-950 overflow-hidden flex-1 min-h-0 flex flex-col">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-black-700 bg-black-800">
                    <span className="font-body text-[8px] uppercase tracking-label text-white-300 flex items-center gap-1.5">
                      <Radio className="h-3 w-3" />
                      {t("eventStream")}
                    </span>
                    <span className="font-body text-[10px] text-white-300 tabular-nums">{t("eventsTail")}</span>
                  </div>
                  <div className="p-2 space-y-1 flex-1 overflow-hidden">
                    <AnimatePresence initial={false}>
                      {visibleLogs.map((line, i) => (
                        <motion.div
                          key={`${line.time}-${line.msg}-${logCursor}-${i}`}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: i === 2 ? 1 : 0.55, x: 0 }}
                          exit={{ opacity: 0, x: 8 }}
                          transition={{ duration: 0.2 }}
                          className={cn(
                            "font-mono text-[9px] flex items-start gap-2 px-2 py-1 rounded",
                            i === 2 && "bg-black-800/80"
                          )}
                        >
                          <span className="text-white-300 shrink-0 tabular-nums">{line.time}</span>
                          <span
                            className={cn(
                              "shrink-0 font-semibold uppercase text-[8px] tracking-wide",
                              line.status === "ok" ? "text-emerald-600" : "text-amber-600"
                            )}
                          >
                            {line.status}
                          </span>
                          <span className="text-white-200 truncate">{line.msg}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Status bar */}
            <div className="px-4 py-2 border-t border-black-700 bg-black-800/60 flex items-center justify-between gap-2">
              <span className="font-body text-[9px] text-white-300 truncate">
                {t("active")}: <span className="text-white-100 font-medium">{active.label}</span>
                <span className="text-white-300 mx-1.5">·</span>
                <span className="text-white-300">{regions[regionIndex]}</span>
              </span>
              <span className="font-body text-[10px] text-white-300 tabular-nums shrink-0 hidden sm:inline">
                {t("footer")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
