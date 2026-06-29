"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  Factory,
  HeartPulse,
  Layers,
  ShoppingBag,
  Truck,
  Users,
  Briefcase,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { ProductIcon } from "@/components/shared/ProductIcons";
import { SectionShell } from "@/components/shared/SectionShell";
import { useMotionConfig } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TabId = "platforms" | "modules" | "verticals";

type PlatformItem = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  featured?: boolean;
};

type ModuleRef = { id: string; code: string };

type VerticalItem = {
  name: string;
  description: string;
  platform: string;
  modules: string[];
};

const moduleIconMap: Record<string, Parameters<typeof ProductIcon>[0]["name"]> = {
  orabthicNext: "healthcare",
  crm: "crm",
  inventory: "inventory",
  payroll: "payroll",
  employeeManagement: "hr",
  project: "project",
  manufacturing: "manufacturing",
  bi: "bi",
  ecommerce: "ecommerce",
};

const verticalIcons = [HeartPulse, ShoppingBag, Factory, Users, Briefcase, Truck];

const tabs: TabId[] = ["platforms", "modules", "verticals"];

export function ProductsPortfolioExplorer() {
  const t = useTranslations("products.portfolio");
  const tProducts = useTranslations("products");
  const locale = useLocale();
  const { fadeUp, stagger, transition, viewport } = useMotionConfig();
  const [activeTab, setActiveTab] = useState<TabId>("platforms");

  const platforms = t.raw("platforms") as PlatformItem[];
  const modules = t.raw("modules") as ModuleRef[];
  const verticals = t.raw("verticals") as VerticalItem[];

  return (
    <SectionShell
      label={t("label")}
      title={t("title")}
      description={t("subtitle")}
      className="bg-black-900/40"
    >
      <div className="relative rounded-3xl border border-black-700 bg-black-900 overflow-hidden shadow-card">
        <div className="absolute inset-0 bg-gradient-to-br from-coming-soon/[0.05] via-transparent to-accent/[0.03] pointer-events-none" />
        <div className="grid-fine-dense absolute inset-0 opacity-20 pointer-events-none" />

        {/* Console header */}
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 md:px-8 py-4 border-b border-black-700 bg-black-800/50">
          <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wide text-coming-soon bg-coming-soon/10 border border-coming-soon/20 px-2.5 py-1 rounded-full w-fit">
            <Clock className="h-3 w-3" />
            {tProducts("comingSoon")}
          </span>

          <div className="flex p-1 rounded-xl border border-black-700 bg-black-950/80 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative px-4 py-2 rounded-lg font-body text-xs font-semibold uppercase tracking-wide transition-colors",
                  activeTab === tab ? "text-white-100" : "text-white-300 hover:text-white-200"
                )}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="portfolio-tab"
                    className="absolute inset-0 bg-black-800 border border-black-600 rounded-lg shadow-soft"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t(`tabs.${tab}`)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative p-6 md:p-8 min-h-[520px]">
          <AnimatePresence mode="wait">
            {activeTab === "platforms" && (
              <motion.div
                key="platforms"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4"
              >
                {platforms.map((platform, i) => {
                  const isFeatured = platform.featured;
                  const anchor = platform.id === "enterprise" ? "crm" : platform.id;
                  return (
                    <motion.div
                      key={platform.id}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewport}
                      variants={fadeUp}
                      transition={{ ...transition, delay: i * 0.08 }}
                      className={cn(
                        "group relative flex flex-col rounded-2xl border overflow-hidden",
                        isFeatured
                          ? "lg:col-span-7 border-coming-soon/30 bg-black-950/90"
                          : "lg:col-span-5 border-black-700 bg-black-950/70"
                      )}
                    >
                      {isFeatured && (
                        <div className="absolute inset-0 bg-gradient-to-br from-coming-soon/[0.08] via-transparent to-transparent pointer-events-none" />
                      )}
                      <div className="relative p-7 md:p-8 flex flex-col h-full">
                        <div className="flex items-start justify-between gap-4 mb-6">
                          <div
                            className={cn(
                              "h-14 w-14 rounded-2xl border flex items-center justify-center",
                              isFeatured
                                ? "border-coming-soon/30 bg-coming-soon/10"
                                : "border-black-700 bg-black-800"
                            )}
                          >
                            {platform.id === "orabthicNext" ? (
                              <ProductIcon name="healthcare" className="h-7 w-7 text-white-100" />
                            ) : (
                              <Layers className="h-7 w-7 text-white-300" strokeWidth={1.5} />
                            )}
                          </div>
                        </div>

                        <p className="font-body text-[10px] uppercase tracking-[0.15em] text-coming-soon mb-2">
                          {platform.tagline}
                        </p>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-white-100 mb-3">
                          {platform.name}
                        </h3>
                        <p className="font-body text-sm text-white-300 leading-relaxed mb-6 flex-1">
                          {platform.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {platform.stack.map((item) => (
                            <span
                              key={item}
                              className="font-mono text-[9px] text-white-200 bg-black-800 border border-black-700 px-2.5 py-1 rounded-md"
                            >
                              {item}
                            </span>
                          ))}
                        </div>

                        <Link
                          href={`#${anchor}`}
                          className="inline-flex items-center gap-2 font-body text-xs font-semibold text-white-100 group-hover:text-coming-soon transition-colors"
                        >
                          {t("viewSpec")}
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {activeTab === "modules" && (
              <motion.div
                key="modules"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  variants={stagger}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                >
                  {modules.map((mod, i) => {
                    const icon = moduleIconMap[mod.id] ?? "crm";
                    const isHealth = mod.id === "orabthicNext";
                    return (
                      <motion.div key={mod.id} variants={fadeUp} transition={transition}>
                        <Link
                          href={`#${mod.id}`}
                          className={cn(
                            "group block relative rounded-2xl border p-5 h-full transition-all duration-300",
                            "border-black-700 bg-black-950/80 hover:border-coming-soon/40 hover:bg-black-900",
                            isHealth && "sm:col-span-2 lg:col-span-1 border-coming-soon/25 animate-gold-pulse"
                          )}
                        >
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div className="h-11 w-11 rounded-xl border border-black-700 bg-black-800 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                              <ProductIcon name={icon} className="h-5 w-5 text-white-100" />
                            </div>
                            <span className="font-mono text-[9px] text-coming-soon bg-coming-soon/10 border border-coming-soon/20 px-1.5 py-0.5 rounded">
                              {mod.code}
                            </span>
                          </div>
                          <h4 className="font-display text-lg font-bold text-white-100 mb-1 group-hover:text-white-100">
                            {tProducts(`${mod.id}.name`)}
                          </h4>
                          <p className="font-mono text-[10px] text-white-300 mb-3">
                            {String(i + 1).padStart(2, "0")} · {tProducts(`${mod.id}.number`)}
                          </p>
                          <p className="font-body text-xs text-white-300 line-clamp-2 leading-relaxed">
                            {tProducts(`${mod.id}.description`)}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-1 font-body text-[10px] font-semibold uppercase tracking-wide text-white-300 group-hover:text-coming-soon transition-colors">
                            {t("viewSpec")}
                            <ArrowUpRight className="h-3 w-3" />
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}

            {activeTab === "verticals" && (
              <motion.div
                key="verticals"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  variants={stagger}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                >
                  {verticals.map((vertical, i) => {
                    const Icon = verticalIcons[i % verticalIcons.length];
                    return (
                      <motion.div
                        key={vertical.name}
                        variants={fadeUp}
                        transition={transition}
                        className="group relative rounded-2xl border border-black-700 bg-black-950/80 p-6 hover:border-black-600 hover:bg-black-900 transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute top-0 end-0 w-24 h-24 bg-accent/[0.03] rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl border border-black-700 bg-black-800 flex items-center justify-center">
                              <Icon className="h-4 w-4 text-white-300" strokeWidth={1.5} />
                            </div>
                            <div>
                              <h4 className="font-display text-lg font-bold text-white-100">{vertical.name}</h4>
                              <p className="font-mono text-[9px] text-white-300 uppercase tracking-wide">
                                {t("platformLabel")}: {vertical.platform}
                              </p>
                            </div>
                          </div>
                          <p className="font-body text-sm text-white-300 leading-relaxed mb-5">
                            {vertical.description}
                          </p>
                          <p className="font-body text-[9px] uppercase tracking-wider text-white-300 mb-2">
                            {t("modulesLabel")}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {vertical.modules.map((m) => (
                              <span
                                key={m}
                                className="font-body text-[10px] text-white-200 bg-black-800 border border-black-700 px-2 py-0.5 rounded-full"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer strip */}
        <div className="relative flex justify-end px-6 md:px-8 py-3 border-t border-black-700 bg-black-800/40">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-1.5 font-body text-[10px] font-semibold uppercase tracking-wide text-white-100 hover:text-coming-soon transition-colors"
          >
            {tProducts("notifyMe")}
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
