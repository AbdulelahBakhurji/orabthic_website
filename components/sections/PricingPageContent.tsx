"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Cloud,
  Layers,
  MessageSquare,
  FileText,
  Handshake,
  Server,
  Shield,
  Users,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/shared/SectionShell";
import { PricingEngagementInclusions } from "@/components/sections/PricingEngagementInclusions";
import { PricingFAQ } from "@/components/sections/PricingFAQ";
import { PricingModules } from "@/components/sections/PricingModules";
import { useLanguage } from "@/lib/useLanguage";
import { useMotionConfig } from "@/lib/motion";
import { cn } from "@/lib/utils";

const stepIcons = [MessageSquare, FileText, Handshake];
const modelIcons = [Layers, Users, Server, Shield];
const deploymentIcons = [Cloud, Shield, Server];

export function PricingPageContent() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const { isRTL } = useLanguage();
  const { fadeUp, stagger, transition, viewport } = useMotionConfig();
  const steps = t.raw("process") as { title: string; description: string }[];
  const models = t.raw("models.items") as { title: string; description: string }[];
  const deployment = t.raw("deployment.items") as { name: string; description: string }[];

  return (
    <>
      {/* Hero */}
      <section className="bg-black-950 pt-32 pb-20 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 grid-fine opacity-40 pointer-events-none" />
        <div className="absolute top-0 end-0 w-[480px] h-[480px] bg-black/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-container px-6 lg:px-8">
          <motion.div
            initial={false}
            animate="visible"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} transition={transition} className="flex flex-wrap items-center gap-3 mb-6">
              <p className="font-body text-xs font-semibold uppercase tracking-eyebrow text-white-300">
                {t("hero.label")}
              </p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide text-accent bg-accent/10 border border-accent/20">
                {t("hero.badge")}
              </span>
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
              className="font-body text-lg text-white-300 leading-relaxed mb-4 max-w-2xl"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.p
              variants={fadeUp}
              transition={transition}
              className="font-body text-sm text-white-300/80 mb-10 max-w-xl border-s-2 border-accent ps-4"
            >
              {t("hero.contactNote")}
            </motion.p>

            <motion.div variants={fadeUp} transition={transition} className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8 group">
                <Link href={`/${locale}/contact`}>
                  {t("contactCta")}
                  <ArrowUpRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href={`/${locale}/contact`}>{t("contactCtaShort")}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Engagement scope */}
      <SectionShell
        label={t("models.label")}
        title={t("models.title")}
        description={t("models.subtitle")}
      >
        <motion.div
          initial={false}
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {models.map((item, i) => {
            const Icon = modelIcons[i] || Layers;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                transition={transition}
                className="group relative glass-panel-hover rounded-2xl p-8 flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="h-11 w-11 rounded-xl bg-black-800 border border-black-700 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-white-200" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wide text-white-300 bg-black-800 border border-black-700 px-2.5 py-1 rounded-md shrink-0">
                    {t("contactForPricing")}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white-100 mb-3">{item.title}</h3>
                <p className="font-body text-sm text-white-300 leading-relaxed flex-1">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </SectionShell>

      <PricingModules />

      {/* Deployment options */}
      <SectionShell label={t("deployment.label")} title={t("deployment.title")}>
        <motion.div
          initial={false}
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {deployment.map((item, i) => {
            const Icon = deploymentIcons[i] || Cloud;
            return (
              <motion.div
                key={item.name}
                variants={fadeUp}
                transition={transition}
                className="relative rounded-2xl border border-black-700 bg-black-900 p-8 shadow-soft flex flex-col"
              >
                <Icon className="h-5 w-5 text-white-300 mb-5" strokeWidth={1.5} />
                <h3 className="font-display text-lg font-bold text-white-100 mb-2">{item.name}</h3>
                <p className="font-body text-sm text-white-300 leading-relaxed mb-6 flex-1">{item.description}</p>
                <Link
                  href={`/${locale}/contact`}
                  className="font-body text-sm font-semibold text-white-100 hover:underline"
                >
                  {t("contactForPricing")} →
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </SectionShell>

      <PricingEngagementInclusions />

      {/* Process */}
      <SectionShell label={t("processLabel")} title={t("processTitle")}>
        <motion.div
          initial={false}
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, i) => {
            const Icon = stepIcons[i] || MessageSquare;
            return (
              <motion.div key={step.title} variants={fadeUp} transition={transition} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-black-700 -translate-x-1/2 z-0" />
                )}
                <div className="relative z-10 bg-black-900 border border-black-700 rounded-2xl p-8 shadow-soft h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-10 w-10 rounded-full bg-black-800 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-white-200" strokeWidth={1.5} />
                    </div>
                    <span className="font-mono text-xs text-white-300">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white-100 mb-3">{step.title}</h3>
                  <p className="font-body text-sm text-white-300 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </SectionShell>

      {/* CTA */}
      <section className="bg-black-950 py-section-mobile lg:py-section">
        <div className="mx-auto max-w-container px-6 lg:px-8">
          <div className="relative rounded-3xl border border-black-700 bg-black-900 p-12 md:p-16 text-center shadow-card overflow-hidden">
            <div className="absolute inset-0 grid-fine opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-xl mx-auto">
              <p className="font-body text-xs font-semibold uppercase tracking-eyebrow text-white-300 mb-4">
                {t("hero.badge")}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-display text-white-100 mb-4">
                {t("cta.title")}
              </h2>
              <p className="font-body text-base text-white-300 mb-8 leading-relaxed">{t("cta.subtitle")}</p>
              <Button asChild size="lg" className="rounded-full px-10 group">
                <Link href={`/${locale}/contact`}>
                  {t("contactCta")}
                  <ArrowUpRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PricingFAQ />
    </>
  );
}
