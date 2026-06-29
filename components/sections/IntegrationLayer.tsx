"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "@/components/shared/SectionShell";
import { useMotionConfig } from "@/lib/motion";

export function IntegrationLayer() {
  const t = useTranslations("home.integrations");
  const { fadeUp, stagger, transition, viewport } = useMotionConfig();
  const connectors = t.raw("connectors") as string[];
  const capabilities = t.raw("capabilities") as { title: string; desc: string }[];

  return (
    <SectionShell
      label={t("label")}
      title={t("title")}
      description={t("description")}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
        className="space-y-12"
      >
        <motion.div variants={fadeUp} transition={transition} className="relative overflow-hidden rounded-2xl border border-black-700 bg-black-900/40 py-8">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex shrink-0">
                {connectors.map((c) => (
                  <span
                    key={`${dup}-${c}`}
                    className="mx-6 px-5 py-2.5 rounded-full border border-black-700 font-body text-sm text-white-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              variants={fadeUp}
              transition={transition}
              className="border-s border-black-700 ps-6 first:border-s-0 first:ps-0"
            >
              <h3 className="font-display text-lg font-bold text-white-100 mb-3">{cap.title}</h3>
              <p className="font-body text-sm text-white-300 leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionShell>
  );
}
