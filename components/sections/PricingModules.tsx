"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { ProductIcon } from "@/components/shared/ProductIcons";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/shared/SectionShell";
import { useMotionConfig } from "@/lib/motion";
import { cn } from "@/lib/utils";

const moduleIconKeys = ["crm", "accounting", "pos", "inventory", "healthcare"] as const;

type ModuleItem = {
  name: string;
  scope: string;
  capabilities: string[];
};

export function PricingModules() {
  const t = useTranslations("pricing.modules");
  const locale = useLocale();
  const { fadeUp, stagger, transition, viewport } = useMotionConfig();
  const modules = t.raw("items") as ModuleItem[];

  return (
    <SectionShell
      label={t("label")}
      title={t("title")}
      description={t("subtitle")}
      className="bg-black-900/50"
    >
      <div className="relative rounded-3xl border border-black-700 bg-black-900 overflow-hidden shadow-card">
        <div className="absolute inset-0 bg-gradient-to-br from-coming-soon/[0.06] via-transparent to-transparent pointer-events-none" />
        <div className="grid-fine-dense absolute inset-0 opacity-25 pointer-events-none" />

        <div className="relative flex items-center justify-between px-6 md:px-8 py-4 border-b border-black-700 bg-black-800/40">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white-300">orabthic.modules</span>
          <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wide text-coming-soon bg-coming-soon/10 border border-coming-soon/20 px-2.5 py-1 rounded-full">
            <Clock className="h-3 w-3" />
            {t("comingSoon")}
          </span>
        </div>

        <motion.div
          initial={false}
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 md:p-8"
        >
          {modules.map((mod, i) => {
            const iconKey = moduleIconKeys[i] ?? "crm";
            const isHealthcare = iconKey === "healthcare";
            return (
              <motion.div
                key={mod.name}
                variants={fadeUp}
                transition={transition}
                className={cn(
                  "group relative flex flex-col rounded-2xl border border-dashed p-7 min-h-[280px]",
                  "border-coming-soon/30 bg-black-950/80 animate-gold-pulse",
                  "hover:border-coming-soon/50 hover:bg-black-900 transition-all duration-300",
                  isHealthcare && "md:col-span-2 lg:col-span-1"
                )}
              >
                <div className="flex items-start justify-between gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl border border-black-700 bg-black-800 flex items-center justify-center opacity-60 grayscale group-hover:opacity-80 group-hover:grayscale-0 transition-all">
                    <ProductIcon name={iconKey} className="h-6 w-6 text-white-100" />
                  </div>
                  <span className="font-mono text-[10px] text-white-300">{String(i + 1).padStart(2, "0")}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="font-display text-xl font-bold text-white-100">{mod.name}</h3>
                  <span className="text-[9px] font-semibold uppercase tracking-wide text-coming-soon bg-coming-soon/10 border border-coming-soon/20 px-1.5 py-0.5 rounded-full">
                    {t("comingSoon")}
                  </span>
                </div>

                <p className="font-body text-sm text-white-300 leading-relaxed mb-5">{mod.scope}</p>

                <ul className="space-y-2 mb-6 flex-1">
                  {mod.capabilities.map((cap) => (
                    <li key={cap} className="flex items-center gap-2 font-body text-xs text-white-300">
                      <span className="h-1 w-1 rounded-full bg-coming-soon shrink-0" />
                      {cap}
                    </li>
                  ))}
                </ul>

                <Button asChild variant="gold" size="sm" className="rounded-full w-full mt-auto">
                  <Link href={`/${locale}/contact`}>{t("notifyMe")}</Link>
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionShell>
  );
}
