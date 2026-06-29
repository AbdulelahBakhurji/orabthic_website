"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  ArrowUpRight,
  Target,
  TrendingUp,
  Shield,
  Lightbulb,
  Code2,
  Layers,
  Lock,
  Headphones,
  HeartPulse,
  Plug,
  Globe2,
  Building2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/shared/SectionShell";
import { useMotionConfig } from "@/lib/motion";
import { useLanguage } from "@/lib/useLanguage";
import { cn } from "@/lib/utils";

const valueIcons = [Target, TrendingUp, Shield, Lightbulb];
const expertiseIcons = [Code2, Layers, Lock, Headphones, HeartPulse, Plug];
const presenceIcons = [Building2, Globe2, HeartPulse];

export function AboutPageContent() {
  const t = useTranslations("about");
  const locale = useLocale();
  const { isRTL } = useLanguage();
  const { fadeUp, stagger, transition, viewport } = useMotionConfig();

  const principles = t.raw("principles.items") as Array<{ title: string; description: string }>;
  const expertise = t.raw("expertise.areas") as Array<{ title: string; description: string }>;
  const phases = t.raw("evolution.phases") as Array<{ title: string; description: string }>;
  const values = t.raw("values.items") as Array<{ name: string; description: string }>;
  const pillars = t.raw("presence.pillars") as Array<{ title: string; description: string }>;

  return (
    <>
      {/* Hero */}
      <section className="bg-black-950 pt-32 pb-20 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 grid-fine opacity-40 pointer-events-none" />
        <div className="absolute top-0 end-0 w-[520px] h-[520px] bg-black/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 start-0 w-80 h-80 bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-container px-6 lg:px-8">
          <motion.div initial={false} animate="visible" variants={stagger} className="max-w-4xl">
            <motion.div variants={fadeUp} transition={transition} className="flex flex-wrap items-center gap-3 mb-6">
              <p className="font-body text-xs font-semibold uppercase tracking-eyebrow text-white-300">
                {t("hero.label")}
              </p>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white-300 bg-black-800 border border-black-700 px-2.5 py-1 rounded-md">
                orabthic.about
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
              className="font-body text-lg text-white-300 leading-relaxed max-w-2xl mb-10"
            >
              {t("hero.subtitle")}
            </motion.p>
            <motion.div variants={fadeUp} transition={transition}>
              <Button asChild size="lg" className="rounded-full px-8 group">
                <Link href={`/${locale}/contact`}>
                  {t("cta.button")}
                  <ArrowUpRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-black-900/50 py-section-mobile lg:py-section relative overflow-hidden border-y border-black-700">
        <div className="grid-fine-dense absolute inset-0 opacity-20 pointer-events-none" />
        <div className="relative mx-auto max-w-container px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-4">
              <p className="font-body text-xs font-semibold uppercase tracking-eyebrow text-white-300 mb-4">
                {t("mission.label")}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-display text-white-100">
                {t("mission.title")}
              </h2>
            </div>
            <blockquote className="lg:col-span-8 relative">
              <div className="absolute -start-4 top-0 bottom-0 w-1 bg-accent rounded-full hidden lg:block" />
              <p className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white-100 leading-[1.2] lg:ps-8">
                &ldquo;{t("mission.statement")}&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Principles */}
      <SectionShell
        label={t("principles.label")}
        title={t("principles.title")}
        description={t("principles.subtitle")}
      >
        <motion.div
          initial={false}
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {principles.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              transition={transition}
              className="group glass-panel-hover rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 end-0 w-32 h-32 bg-black/[0.03] rounded-full blur-2xl group-hover:bg-accent/[0.04] transition-colors pointer-events-none" />
              <span className="font-mono text-xs text-white-300 mb-4 block">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-xl font-bold text-white-100 mb-3">{item.title}</h3>
              <p className="font-body text-sm text-white-300 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </SectionShell>

      {/* Expertise */}
      <SectionShell
        label={t("expertise.label")}
        title={t("expertise.title")}
        description={t("expertise.subtitle")}
        className="bg-black-900/50"
      >
        <motion.div
          initial={false}
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {expertise.map((area, i) => {
            const Icon = expertiseIcons[i] || Code2;
            return (
              <motion.div
                key={area.title}
                variants={fadeUp}
                transition={transition}
                className="group rounded-2xl border border-black-700 bg-black-900 p-8 shadow-soft hover:border-black-600 hover:shadow-elevated transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-xl bg-black-800 border border-black-700 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:border-accent transition-colors">
                  <Icon className="h-4 w-4 text-white-200 group-hover:text-accent-fg transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-bold text-white-100 mb-3">{area.title}</h3>
                <p className="font-body text-sm text-white-300 leading-relaxed">{area.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </SectionShell>

      {/* Evolution */}
      <SectionShell
        label={t("evolution.label")}
        title={t("evolution.title")}
        description={t("evolution.subtitle")}
      >
        <div className="relative rounded-3xl border border-black-700 bg-black-900 p-8 md:p-10 overflow-hidden">
          <div className="grid-fine-dense absolute inset-0 opacity-25 pointer-events-none" />
          <div className="hidden lg:block absolute top-[3.25rem] left-10 right-10 h-px bg-black-700" />
          <motion.div
            initial={false}
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {phases.map((phase, i) => (
              <motion.div key={phase.title} variants={fadeUp} transition={transition} className="relative">
                <div className="hidden lg:flex h-4 w-4 rounded-full bg-accent border-4 border-black-900 absolute top-0 left-8 z-10" />
                <div className="rounded-2xl border border-black-700 bg-black-800/60 p-7 h-full lg:mt-8 hover:bg-black-800 transition-colors">
                  <span className="font-mono text-xs text-white-300 mb-4 block">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-lg font-bold text-white-100 mb-3">{phase.title}</h3>
                  <p className="font-body text-sm text-white-300 leading-relaxed">{phase.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionShell>

      {/* Presence — no cities */}
      <SectionShell
        label={t("presence.label")}
        title={t("presence.title")}
        description={t("presence.subtitle")}
        className="bg-black-900/50"
      >
        <div className="relative rounded-3xl border border-black-700 bg-black-900 overflow-hidden shadow-card">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-transparent pointer-events-none" />
          <div className="grid-fine absolute inset-0 opacity-30 pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-4 p-8 md:p-10 border-b lg:border-b-0 lg:border-e border-black-700 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-4 w-4 text-white-300" strokeWidth={1.5} />
                <span className="font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-white-300">
                  {t("presence.headquartersLabel")}
                </span>
              </div>
              <p className="font-display text-3xl md:text-4xl font-bold text-white-100 mb-4">
                {t("presence.headquarters")}
              </p>
              <p className="font-body text-sm text-white-300 leading-relaxed">
                {t("presence.subtitle")}
              </p>
            </div>

            <div className="lg:col-span-8 p-8 md:p-10 space-y-4">
              {pillars.map((pillar, i) => {
                const Icon = presenceIcons[i] || Globe2;
                return (
                  <div
                    key={pillar.title}
                    className="flex gap-5 p-5 rounded-xl border border-black-700 bg-black-800/50 hover:bg-black-800 hover:border-black-600 transition-colors"
                  >
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-black-900 border border-black-700 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-white-200" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-white-100 mb-1.5">{pillar.title}</h3>
                      <p className="font-body text-sm text-white-300 leading-relaxed">{pillar.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SectionShell>

      {/* Values */}
      <SectionShell label={t("values.label")} title={t("values.title")}>
        <motion.div
          initial={false}
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {values.map((item, i) => {
            const Icon = valueIcons[i] || Target;
            return (
              <motion.div
                key={item.name}
                variants={fadeUp}
                transition={transition}
                className="group text-center p-8 rounded-2xl border border-black-700 bg-black-900 shadow-soft hover:border-black-600 hover:shadow-elevated transition-all"
              >
                <div className="h-11 w-11 rounded-full bg-black-800 border border-black-700 flex items-center justify-center mx-auto mb-5 group-hover:bg-accent group-hover:border-accent transition-colors">
                  <Icon className="h-4 w-4 text-white-200 group-hover:text-accent-fg transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-bold text-white-100 mb-3">{item.name}</h3>
                <p className="font-body text-sm text-white-300 leading-relaxed">{item.description}</p>
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
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-display text-white-100 mb-4">
                {t("cta.title")}
              </h2>
              <p className="font-body text-base text-white-300 mb-8 leading-relaxed">{t("cta.subtitle")}</p>
              <Button asChild size="lg" className="rounded-full px-10 group">
                <Link href={`/${locale}/contact`}>
                  {t("cta.button")}
                  <ArrowUpRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
