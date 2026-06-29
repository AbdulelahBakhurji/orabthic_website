"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "@/components/shared/SectionShell";
import { useMotionConfig } from "@/lib/motion";
import { Database, GitBranch, Layers, Server, ShieldCheck, Users } from "lucide-react";

const icons = [Layers, Database, Users, Server, GitBranch, ShieldCheck];

export function ArchitectureBento() {
  const t = useTranslations("home.architecture");
  const { fadeUp, stagger, transition, viewport } = useMotionConfig();
  const items = t.raw("items") as { title: string; description: string; span?: string }[];

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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr"
      >
        {items.map((item, i) => {
          const Icon = icons[i] ?? ShieldCheck;
          return (
            <motion.div
              key={item.title}
              variants={fadeUp}
              transition={transition}
              className="group glass-panel-hover rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 grid-fine-dense opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10">
                <Icon className="h-5 w-5 text-white-300 mb-6" strokeWidth={1.5} />
                <h3 className="font-display text-lg font-bold text-white-100 mb-3">{item.title}</h3>
                <p className="font-body text-sm text-white-300 leading-relaxed">{item.description}</p>
              </div>
              <span className="absolute top-6 end-6 font-body text-[10px] text-black-500 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionShell>
  );
}
