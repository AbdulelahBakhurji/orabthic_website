"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProductIcon } from "@/components/shared/ProductIcons";
import { Button } from "@/components/ui/button";
import { useMotionConfig } from "@/lib/motion";

export function OrabthicNextFeatured() {
  const t = useTranslations("home.comingSoon.orabthicNext");
  const capabilities = t.raw("capabilities") as string[];
  const { fadeUp, transition, viewport } = useMotionConfig();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
      transition={transition}
      className="relative mb-14 lg:mb-16"
    >
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-coming-soon/30 via-black/5 to-transparent pointer-events-none" />

      <div className="relative overflow-hidden rounded-3xl border border-black-700 bg-black-900 shadow-elevated">
        <div className="grid-fine-dense absolute inset-0 opacity-40 pointer-events-none" />
        <div className="absolute top-0 end-0 w-72 h-72 bg-coming-soon/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 p-8 md:p-10 lg:p-12">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold uppercase tracking-[0.15em] text-coming-soon bg-coming-soon/10 border border-coming-soon/20">
                <Clock className="h-3 w-3" />
                {t("badge")}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white-300">
                orabthic.health
              </span>
            </div>

            <div className="flex items-start gap-5 mb-6">
              <div className="shrink-0 p-4 rounded-2xl border border-black-700 bg-black-800 text-white-100">
                <ProductIcon name="healthcare" className="h-10 w-10" />
              </div>
              <div>
                <h3 className="font-display text-3xl md:text-4xl font-bold tracking-display text-white-100 mb-2">
                  {t("name")}
                </h3>
                <p className="font-body text-sm font-semibold uppercase tracking-[0.12em] text-coming-soon">
                  {t("tagline")}
                </p>
              </div>
            </div>

            <p className="font-body text-base md:text-lg text-white-300 leading-relaxed max-w-2xl mb-8">
              {t("description")}
            </p>

            <Button variant="gold" size="lg" className="rounded-full gap-2">
              {t("notifyMe")}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-white-300 mb-5">
              {t("capabilitiesLabel")}
            </p>
            <ul className="space-y-3">
              {capabilities.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-black-700 bg-black-800/60 font-body text-sm text-white-200"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-coming-soon shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
