"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { SectionDivider } from "@/components/shared/SectionDivider";
import { useMotionConfig } from "@/lib/motion";

export function CTABanner() {
  const t = useTranslations("home.cta");
  const locale = useLocale();
  const { fadeUp, stagger, transition, viewport } = useMotionConfig();

  return (
    <>
      <SectionDivider />
      <section className="bg-black-950 py-section-mobile lg:py-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mx-auto max-w-container px-6 lg:px-8 text-center"
        >
          <motion.h2
            variants={fadeUp}
            transition={transition}
            className="font-display text-3xl md:text-5xl font-bold tracking-display text-white-100 mb-6"
          >
            {t("headline")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={transition}
            className="font-body text-lg text-white-300 mb-10 max-w-xl mx-auto"
          >
            {t("sub")}
          </motion.p>
          <motion.div
            variants={fadeUp}
            transition={transition}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg">
              <Link href={`/${locale}/contact`}>{t("demo")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/${locale}/contact`}>{t("sales")}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
