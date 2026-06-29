"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { PlatformConsole } from "@/components/shared/PlatformConsole";
import { useLanguage } from "@/lib/useLanguage";
import { useMotionConfig } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const { isRTL } = useLanguage();
  const { fadeUp, stagger, transition } = useMotionConfig();
  const pillars = t.raw("pillars") as string[];

  return (
    <section className="relative min-h-screen flex items-center bg-black-950 pt-24 pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-fine opacity-60 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-container px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p
              variants={fadeUp}
              transition={transition}
              className="font-body text-xs font-semibold uppercase tracking-eyebrow text-white-300 mb-8"
            >
              {t("eyebrow")}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={transition}
              className="font-display text-[42px] sm:text-[56px] lg:text-[72px] font-black tracking-display text-white-100 mb-8 whitespace-pre-line leading-[1.02]"
            >
              {t("headline")}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={transition}
              className="font-body text-lg text-white-300 max-w-lg mb-10 leading-relaxed"
            >
              {t("subheadline")}
            </motion.p>

            <motion.div variants={fadeUp} transition={transition} className="flex flex-wrap gap-4 mb-12">
              <Button asChild size="lg" className="group rounded-full px-8">
                <Link href={`/${locale}/products`}>
                  {t("ctaExplore")}
                  <ArrowUpRight className={cn("h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5", isRTL && "rotate-180")} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href={`/${locale}/about`}>
                  {t("ctaLearn")}
                  <ArrowRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
                </Link>
              </Button>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              transition={transition}
              className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-black-700 rounded-xl overflow-hidden border border-black-700 shadow-soft"
            >
              {pillars.map((pillar) => (
                <li key={pillar} className="bg-black-900 px-5 py-4">
                  <p className="font-body text-xs text-white-300 leading-relaxed">{pillar}</p>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <PlatformConsole />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
