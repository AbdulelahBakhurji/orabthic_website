"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, Cpu } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { ProductIcon } from "@/components/shared/ProductIcons";
import { SectionShell } from "@/components/shared/SectionShell";
import { useLanguage } from "@/lib/useLanguage";
import { useMotionConfig } from "@/lib/motion";
import { cn } from "@/lib/utils";

const productIds = [
  "orabthicNext",
  "crm",
  "inventory",
  "payroll",
  "employeeManagement",
  "project",
  "manufacturing",
  "bi",
  "ecommerce",
] as const;

type ProductId = (typeof productIds)[number];

const productIconMap: Record<ProductId, Parameters<typeof ProductIcon>[0]["name"]> = {
  crm: "crm",
  inventory: "inventory",
  payroll: "payroll",
  employeeManagement: "hr",
  orabthicNext: "healthcare",
  project: "project",
  manufacturing: "manufacturing",
  bi: "bi",
  ecommerce: "ecommerce",
};

function ModuleMockup({
  id,
  featured,
  syncStatus,
  dataLayer,
}: {
  id: string;
  featured?: boolean;
  syncStatus: string;
  dataLayer: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border overflow-hidden aspect-[4/3]",
        featured ? "border-coming-soon/25 bg-black-900" : "border-black-700 bg-black-900/80"
      )}
    >
      <div className="absolute inset-0 grid-fine-dense opacity-30 pointer-events-none" />
      {featured && (
        <div className="absolute inset-0 bg-gradient-to-br from-coming-soon/[0.06] via-transparent to-transparent pointer-events-none" />
      )}
      <div className="relative p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            {[1, 2, 3].map((d) => (
              <span key={d} className="h-1.5 w-1.5 rounded-full bg-black-600" />
            ))}
          </div>
          <span className="ms-auto font-mono text-[8px] uppercase tracking-wider text-white-300">{id}</span>
        </div>
        <div className="flex-1 grid grid-cols-4 gap-2">
          <div className="col-span-1 space-y-1.5">
            {[1, 2, 3, 4, 5].map((r) => (
              <div key={r} className="h-4 rounded bg-black-800 border border-white/5" />
            ))}
          </div>
          <div className="col-span-3 space-y-2">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((c) => (
                <div key={c} className="h-12 rounded-lg bg-black-800 border border-white/5" />
              ))}
            </div>
            <div className="h-20 rounded-lg bg-black-800 border border-white/5" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-8 rounded bg-black-800 border border-black-700" />
              <div className="h-8 rounded bg-black-800/50 border border-dashed border-black-600" />
            </div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-black-700 flex items-center justify-between">
          <span className="font-body text-[10px] text-emerald-600">{syncStatus}</span>
          <span className="font-body text-[10px] text-white-300">{dataLayer}</span>
        </div>
      </div>
    </div>
  );
}

export function ProductsModuleAtlas() {
  const t = useTranslations("products");
  const locale = useLocale();
  const { isRTL } = useLanguage();
  const { fadeUp, stagger, transition, viewport } = useMotionConfig();
  const architectureTags = t.raw("atlas.architectureTags") as string[];

  return (
    <SectionShell label={t("atlas.label")} title={t("atlas.title")} description={t("atlas.subtitle")}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Sticky nav */}
        <nav className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-28 rounded-2xl border border-black-700 bg-black-900/80 p-5 shadow-soft">
            <p className="font-body text-[9px] uppercase tracking-[0.2em] text-white-300 mb-4 font-semibold">
              {t("atlas.navLabel")}
            </p>
            <ul className="space-y-1">
              {productIds.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-black-800 transition-colors"
                  >
                    <span className="font-mono text-[10px] text-white-300 w-6">{t(`${id}.number`)}</span>
                    <span className="font-body text-xs text-white-300 group-hover:text-white-100 truncate">
                      {t(`${id}.name`)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-5 border-t border-black-700 flex items-center gap-2">
              <Cpu className="h-3.5 w-3.5 text-white-300" />
              <span className="font-body text-[10px] text-white-300">{t("atlas.dataLayer")}</span>
            </div>
          </div>
        </nav>

        {/* Module panels */}
        <div className="lg:col-span-9 space-y-8">
          {productIds.map((id, index) => {
            const features = t.raw(`${id}.features`) as string[];
            const iconName = productIconMap[id];
            const isFeatured = id === "orabthicNext";

            return (
              <motion.article
                key={id}
                id={id}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={stagger}
                className={cn(
                  "scroll-mt-28 relative rounded-3xl border overflow-hidden",
                  isFeatured
                    ? "border-coming-soon/30 bg-black-900 shadow-elevated"
                    : "border-black-700 bg-black-900/60"
                )}
              >
                {isFeatured && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-coming-soon/[0.07] via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-0 end-0 w-64 h-64 bg-coming-soon/5 rounded-full blur-3xl pointer-events-none" />
                  </>
                )}

                <div className="relative grid grid-cols-1 xl:grid-cols-2 gap-0">
                  <motion.div variants={fadeUp} transition={transition} className="p-8 md:p-10 xl:p-12">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="font-mono text-5xl md:text-6xl font-bold text-black-800 leading-none select-none">
                        {t(`${id}.number`)}
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "h-11 w-11 rounded-xl border flex items-center justify-center",
                            isFeatured ? "border-coming-soon/30 bg-coming-soon/10" : "border-black-700 bg-black-800"
                          )}
                        >
                          <ProductIcon name={iconName} className="h-5 w-5 text-white-100" />
                        </div>
                        <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-coming-soon bg-coming-soon/10 border border-coming-soon/20 px-2 py-0.5 rounded-full">
                          <Clock className="h-3 w-3" />
                          {t("comingSoon")}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white-100 mb-2">
                      {t(`${id}.name`)}
                    </h3>
                    {isFeatured && (
                      <p className="font-body text-xs text-coming-soon uppercase tracking-[0.12em] mb-4">
                        {t(`${id}.tagline`)}
                      </p>
                    )}
                    <p className="font-body text-base text-white-300 leading-relaxed mb-8">{t(`${id}.description`)}</p>

                    <p className="font-body text-[9px] uppercase tracking-[0.15em] text-white-300 mb-4">
                      {t("atlas.capabilitiesLabel")}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-2 px-3 py-2.5 rounded-xl border border-black-700 bg-black-950/50"
                        >
                          <Check className="h-3.5 w-3.5 text-coming-soon/80 mt-0.5 shrink-0" />
                          <span className="font-body text-xs text-white-200 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button asChild variant={isFeatured ? "gold" : "default"} className="rounded-full">
                      <Link href={`/${locale}/contact`}>
                        {t("notifyMe")}
                        <ArrowRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
                      </Link>
                    </Button>
                  </motion.div>

                  <motion.div
                    variants={fadeUp}
                    transition={transition}
                    className={cn(
                      "p-8 md:p-10 xl:p-12 flex flex-col justify-center",
                      index % 2 === 0 ? "xl:border-s border-black-700" : "xl:border-s border-black-700 bg-black-950/30"
                    )}
                  >
                    <p className="font-body text-[9px] uppercase tracking-[0.15em] text-white-300 mb-4">
                      {t("atlas.architectureLabel")}
                    </p>
                    <ModuleMockup
                      id={id}
                      featured={isFeatured}
                      syncStatus={t("atlas.syncStatus")}
                      dataLayer={t("atlas.dataLayer")}
                    />
                    <div className="mt-4 flex flex-wrap gap-2">
                      {architectureTags.map((tag) => (
                        <span
                          key={tag}
                          className="font-body text-[10px] text-white-300 bg-black-800 border border-black-700 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
