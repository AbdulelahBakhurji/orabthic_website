"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ComingSoonCard } from "@/components/shared/ComingSoonCard";
import { OrabthicNextFeatured } from "@/components/sections/OrabthicNextFeatured";
import { ProductIcon } from "@/components/shared/ProductIcons";
import { SectionShell } from "@/components/shared/SectionShell";
import { useMotionConfig } from "@/lib/motion";

const comingSoonIds = ["hr", "project", "manufacturing", "bi", "ecommerce"] as const;
const iconMap = {
  hr: "hr",
  project: "project",
  manufacturing: "manufacturing",
  bi: "bi",
  ecommerce: "ecommerce",
} as const;

export function ComingSoonProducts() {
  const t = useTranslations("home.comingSoon");
  const { fadeUp, stagger, transition, viewport } = useMotionConfig();

  return (
    <SectionShell label={t("eyebrow")} title={t("title")}>
      <OrabthicNextFeatured />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
        className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible scrollbar-hide"
      >
        {comingSoonIds.map((id) => (
          <motion.div key={id} variants={fadeUp} transition={transition} className="min-w-[260px] md:min-w-0">
            <ComingSoonCard
              id={id}
              icon={<ProductIcon name={iconMap[id]} className="h-10 w-10 text-white" />}
            />
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
}
