"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/shared/SectionShell";
import { useLanguage } from "@/lib/useLanguage";
import { useMotionConfig } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ContactStrip() {
  const t = useTranslations("home.cta");
  const locale = useLocale();
  const { isRTL } = useLanguage();
  const { fadeUp, stagger, transition, viewport } = useMotionConfig();

  return (
    <SectionShell divider className="!py-20 lg:!py-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10"
      >
        <div className="max-w-2xl">
          <motion.h2
            variants={fadeUp}
            transition={transition}
            className="font-display text-3xl md:text-4xl font-bold tracking-display text-white-100 mb-4"
          >
            {t("headline")}
          </motion.h2>
          <motion.p variants={fadeUp} transition={transition} className="font-body text-base text-white-300 leading-relaxed">
            {t("sub")}
          </motion.p>
        </div>
        <motion.div variants={fadeUp} transition={transition} className="flex flex-wrap gap-4 shrink-0">
          <Button asChild size="lg" className="rounded-full px-8 group">
            <Link href={`/${locale}/contact`}>
              {t("demo")}
              <ArrowUpRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-black-700">
            <Link href={`/${locale}/products`}>{t("explore")}</Link>
          </Button>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
}
