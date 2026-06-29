"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "@/components/shared/SectionShell";
import { useMotionConfig } from "@/lib/motion";
import { Shield, Cloud, Key, FileCheck } from "lucide-react";

const icons = [Shield, Cloud, Key, FileCheck];

export function InfrastructureSection() {
  const t = useTranslations("home.infrastructure");
  const { fadeUp, stagger, transition, viewport } = useMotionConfig();
  const items = t.raw("items") as { title: string; description: string }[];

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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black-800 rounded-2xl overflow-hidden border border-black-700"
      >
        {items.map((item, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={item.title}
              variants={fadeUp}
              transition={transition}
              className="bg-black-950 p-8 group hover:bg-black-900/80 transition-colors duration-500"
            >
              <Icon className="h-5 w-5 text-white-300 mb-6 group-hover:text-white-300 transition-colors" strokeWidth={1.5} />
              <h3 className="font-display text-base font-bold text-white-100 mb-3">{item.title}</h3>
              <p className="font-body text-sm text-white-300 leading-relaxed">{item.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionShell>
  );
}
