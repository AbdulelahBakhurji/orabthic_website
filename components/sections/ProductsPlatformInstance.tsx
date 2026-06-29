"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Layers, Plus } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { ProductIcon } from "@/components/shared/ProductIcons";
import { useLanguage } from "@/lib/useLanguage";
import { useMotionConfig } from "@/lib/motion";
import { cn } from "@/lib/utils";

const moduleVisuals = [
  { id: "orabthicNext", icon: "healthcare" as const, selected: true },
  { id: "crm", icon: "crm" as const, selected: true },
  { id: "inventory", icon: "inventory" as const, selected: true },
  { id: "payroll", icon: "payroll" as const, selected: false },
  { id: "employeeManagement", icon: "hr" as const, selected: false },
  { id: "project", icon: "project" as const, selected: false },
  { id: "bi", icon: "bi" as const, selected: true },
  { id: "ecommerce", icon: "ecommerce" as const, selected: false },
] as const;

export function ProductsPlatformInstance() {
  const t = useTranslations("products.instance");
  const tProducts = useTranslations("products");
  const locale = useLocale();
  const { isRTL } = useLanguage();
  const { fadeUp, stagger, transition, viewport } = useMotionConfig();
  const points = t.raw("points") as string[];

  const selected = moduleVisuals.filter((m) => m.selected);
  const available = moduleVisuals.filter((m) => !m.selected);

  return (
    <section className="relative bg-black-900/50 py-section-mobile lg:py-section border-y border-black-700 overflow-hidden">
      <div className="absolute inset-0 grid-fine-dense opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-container px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              transition={transition}
              className="font-body text-xs font-semibold uppercase tracking-eyebrow text-white-300 mb-4"
            >
              {t("label")}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              transition={transition}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-display text-white-100 mb-6 leading-[1.08] whitespace-pre-line"
            >
              {t("title")}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={transition}
              className="font-body text-lg text-white-300 leading-relaxed mb-8"
            >
              {t("subtitle")}
            </motion.p>
            <motion.ul variants={fadeUp} transition={transition} className="space-y-3 mb-10">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-coming-soon/30 bg-coming-soon/10">
                    <Check className="h-3 w-3 text-coming-soon" />
                  </span>
                  <span className="font-body text-sm text-white-200 leading-relaxed">{point}</span>
                </li>
              ))}
            </motion.ul>
            <motion.div variants={fadeUp} transition={transition}>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 group">
                <Link href={`/${locale}/contact`}>
                  {t("cta")}
                  <ArrowUpRight
                    className={cn(
                      "h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                      isRTL && "rotate-180"
                    )}
                  />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            transition={transition}
            className="relative"
          >
            <div className="relative rounded-3xl border border-black-700 bg-black-900 shadow-card overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-coming-soon/[0.05] via-transparent to-accent/[0.03] pointer-events-none" />
              <div className="relative p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <p className="font-body text-[10px] uppercase tracking-[0.15em] text-white-300 font-semibold">
                    {t("composerLabel")}
                  </p>
                  <span className="font-body text-[10px] text-coming-soon bg-coming-soon/10 border border-coming-soon/20 px-2.5 py-1 rounded-full">
                    {t("selectedCount", { count: selected.length })}
                  </span>
                </div>

                {/* Hub */}
                <div className="relative flex flex-col items-center mb-8">
                  <div className="relative z-10 flex flex-col items-center justify-center h-28 w-28 rounded-2xl border-2 border-accent bg-black-950 shadow-elevated">
                    <Layers className="h-8 w-8 text-white-100 mb-1" strokeWidth={1.5} />
                    <span className="font-display text-xs font-bold text-white-100 text-center px-2">
                      {t("hubLabel")}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="h-40 w-40 rounded-full border border-dashed border-black-600" />
                    <div className="absolute h-52 w-52 rounded-full border border-black-700/50" />
                  </div>
                </div>

                {/* Selected modules */}
                <div className="mb-6">
                  <p className="font-body text-[9px] uppercase tracking-wider text-white-300 mb-3">
                    {t("inYourInstance")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selected.map((mod, i) => (
                      <motion.div
                        key={mod.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={viewport}
                        transition={{ delay: i * 0.06, duration: 0.3 }}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-accent/40 bg-accent/10"
                      >
                        <ProductIcon name={mod.icon} className="h-4 w-4 text-white-100" />
                        <span className="font-body text-xs font-semibold text-white-100">
                          {tProducts(`${mod.id}.name`)}
                        </span>
                        <Check className="h-3 w-3 text-accent" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Available to add */}
                <div>
                  <p className="font-body text-[9px] uppercase tracking-wider text-white-300 mb-3">
                    {t("addModules")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {available.map((mod) => (
                      <div
                        key={mod.id}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-black-600 bg-black-950/80 opacity-70"
                      >
                        <ProductIcon name={mod.icon} className="h-4 w-4 text-white-300" />
                        <span className="font-body text-xs text-white-300">
                          {tProducts(`${mod.id}.name`)}
                        </span>
                        <Plus className="h-3 w-3 text-white-300" />
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-8 pt-6 border-t border-black-700 font-body text-sm text-white-300 leading-relaxed">
                  {t("footnote")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
