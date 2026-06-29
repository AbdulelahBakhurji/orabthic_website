"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { ProductsPlatformInstance } from "@/components/sections/ProductsPlatformInstance";
import { ProductsPortfolioExplorer } from "@/components/sections/ProductsPortfolioExplorer";
import { ProductsModuleAtlas } from "@/components/sections/ProductsModuleAtlas";
import { useLanguage } from "@/lib/useLanguage";
import { useMotionConfig } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SoftwareApplicationJsonLd } from "@/components/seo/JsonLd";

export function ProductsPageContent() {
  const t = useTranslations("products");
  const locale = useLocale();
  const { isRTL } = useLanguage();
  const { fadeUp, stagger, transition } = useMotionConfig();

  return (
    <>
      <SoftwareApplicationJsonLd />

      {/* Hero */}
      <section className="bg-black-950 pt-32 pb-20 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 grid-fine opacity-40 pointer-events-none" />
        <div className="absolute top-0 end-0 w-[480px] h-[480px] bg-coming-soon/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 start-0 w-72 h-72 bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-container px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
            <motion.div variants={fadeUp} transition={transition} className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-label text-coming-soon bg-coming-soon/10 border border-coming-soon/20 px-3 py-1 rounded-full">
                <Clock className="h-3 w-3" />
                {t("comingSoon")}
              </span>
              <p className="font-body text-xs font-semibold uppercase tracking-eyebrow text-white-300">
                {t("hero.label")}
              </p>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={transition}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-display text-white-100 mb-6 leading-[1.05] whitespace-pre-line"
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={transition}
              className="font-body text-lg text-white-300 leading-relaxed max-w-2xl mb-10"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div variants={fadeUp} transition={transition}>
              <Button asChild size="lg" variant="gold" className="rounded-full px-8 group">
                <Link href={`/${locale}/contact`}>
                  {t("hero.cta")}
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
        </div>
      </section>

      <ProductsPlatformInstance />
      <ProductsPortfolioExplorer />
      <ProductsModuleAtlas />

      {/* CTA */}
      <section className="bg-black-900/50 py-section-mobile lg:py-section border-t border-black-700 relative overflow-hidden">
        <div className="grid-fine-dense absolute inset-0 opacity-15 pointer-events-none" />
        <div className="relative mx-auto max-w-container px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={transition}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-display text-white-100 mb-4">
              {t("cta.title")}
            </h2>
            <p className="font-body text-base text-white-300 max-w-xl mx-auto mb-8">{t("cta.subtitle")}</p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href={`/${locale}/contact`}>{t("cta.button")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
