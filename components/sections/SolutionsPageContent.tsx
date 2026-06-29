"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Factory, GraduationCap, Home, Landmark, ShoppingBag, Stethoscope, Briefcase } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SectionDivider } from "@/components/shared/SectionDivider";
import { useLanguage } from "@/lib/useLanguage";
import { useMotionConfig } from "@/lib/motion";
import { cn } from "@/lib/utils";

const industries = [
  { id: "retail", icon: ShoppingBag },
  { id: "healthcare", icon: Stethoscope },
  { id: "manufacturing", icon: Factory },
  { id: "realEstate", icon: Home },
  { id: "hospitality", icon: Building2 },
  { id: "education", icon: GraduationCap },
  { id: "government", icon: Landmark },
  { id: "professional", icon: Briefcase },
] as const;

export function SolutionsPageContent() {
  const t = useTranslations("solutions");
  const locale = useLocale();
  const { isRTL } = useLanguage();
  const { fadeUp, stagger, transition, viewport } = useMotionConfig();

  return (
    <>
      <section className="bg-black-950 pt-32 pb-section-mobile lg:pb-section">
        <div className="mx-auto max-w-container px-6 lg:px-8 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={transition}
            className="font-display text-4xl md:text-5xl font-bold tracking-display text-white-100"
          >
            {t("hero.title")}
          </motion.h1>
        </div>
      </section>

      <SectionDivider />

      <section className="bg-black-950 py-section-mobile lg:py-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mx-auto max-w-container px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {industries.map(({ id, icon: Icon }) => (
            <motion.div
              key={id}
              variants={fadeUp}
              transition={transition}
              whileHover={{ scale: 1.01 }}
              className="rounded-card border border-black-700 bg-black-800 p-8 hover:border-black-500 transition-all duration-300"
            >
              <Icon className="h-8 w-8 text-white mb-6" strokeWidth={1.5} />
              <h3 className="font-display text-xl font-bold text-white-100 mb-4">
                {t(`industries.${id}.name`)}
              </h3>
              <p className="font-body text-xs text-white-300/60 uppercase tracking-label mb-2">
                {t(`industries.${id}.products`)}
              </p>
              <p className="font-body text-sm text-white-200/70 mb-6 leading-relaxed">
                {t(`industries.${id}.useCase`)}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-white-100 hover:text-white transition-colors"
              >
                {t(`industries.${id}.cta`)}
                <ArrowRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
