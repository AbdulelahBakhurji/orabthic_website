"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { WorldMap } from "@/components/shared/WorldMap";
import { SectionDivider } from "@/components/shared/SectionDivider";
import { useMotionConfig } from "@/lib/motion";

export function GlobalTrust() {
  const t = useTranslations("home.trust");
  const { fadeUp, stagger, transition, viewport } = useMotionConfig();

  const metrics = ["countries", "uptime", "iso", "support"] as const;

  return (
    <>
      <SectionDivider />
      <section className="bg-black-950 py-section-mobile lg:py-section">
        <div className="mx-auto max-w-container px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            transition={transition}
            className="font-display text-3xl md:text-4xl font-bold tracking-display text-white-100 text-center mb-16"
          >
            {t("title")}
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            transition={transition}
            className="mb-16"
          >
            <WorldMap className="w-full max-w-4xl mx-auto h-auto" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {metrics.map((key) => (
              <motion.div
                key={key}
                variants={fadeUp}
                transition={transition}
                className="text-center"
              >
                <p className="font-display text-2xl md:text-3xl font-bold text-white-100 mb-2">
                  {t(`metrics.${key}.value`)}
                </p>
                <p className="font-body text-xs text-white-300 uppercase tracking-label">
                  {t(`metrics.${key}.label`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
