"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Activity, Database, Globe2, Plug } from "lucide-react";
import { SectionShell } from "@/components/shared/SectionShell";
import { useMotionConfig } from "@/lib/motion";
import { cn } from "@/lib/utils";

const principleIcons = [Database, Activity, Globe2, Plug];

export function PlatformManifesto() {
  const t = useTranslations("home.manifesto");
  const { fadeUp, stagger, transition, viewport } = useMotionConfig();
  const paragraphs = t.raw("paragraphs") as string[];
  const principles = t.raw("principles") as { title: string; desc: string }[];

  return (
    <SectionShell label={t("label")} divider>
      <motion.div
        initial={false}
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
        className="relative"
      >
        {/* Title band */}
        <motion.div
          variants={fadeUp}
          transition={transition}
          className="relative mb-12 lg:mb-16 pb-12 lg:pb-16 border-b border-black-700 lg:ps-8 xl:ps-12"
        >
          <div className="absolute bottom-0 start-8 xl:start-12 w-16 h-px bg-accent hidden lg:block" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold tracking-display text-white-100 leading-[1.05] max-w-4xl lg:ps-8 xl:ps-12">
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Narrative column */}
          <motion.div variants={fadeUp} transition={transition} className="lg:col-span-6 lg:ps-8 xl:ps-12">
            <div className="space-y-0 divide-y divide-black-700 border-y border-black-700 lg:border-0 lg:divide-y-0">
              {paragraphs.map((p, i) => (
                <div
                  key={i}
                  className={cn(
                    "relative py-8 lg:py-10 first:pt-0",
                    i < paragraphs.length - 1 && "lg:border-b lg:border-black-700"
                  )}
                >
                  <span
                    className="absolute -start-2 lg:-start-6 top-8 lg:top-10 font-display text-6xl lg:text-7xl font-bold text-black-800/80 select-none pointer-events-none leading-none"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="relative font-body text-[15px] lg:text-base text-white-300 leading-[1.9] ps-12 lg:ps-16">
                    {p}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Principles column — timeline */}
          <motion.div variants={fadeUp} transition={transition} className="lg:col-span-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white-300 mb-8">
              {t("principlesLabel")}
            </p>
            <div className="relative">
              <div className="absolute start-[21px] top-3 bottom-3 w-px bg-gradient-to-b from-accent via-black-700 to-transparent hidden sm:block" />

              <div className="space-y-4">
                {principles.map((item, i) => {
                  const Icon = principleIcons[i] || Database;
                  return (
                    <motion.div
                      key={item.title}
                      variants={fadeUp}
                      transition={transition}
                      className="group relative flex gap-5 sm:gap-6"
                    >
                      <div className="relative z-10 shrink-0">
                        <div className="h-11 w-11 rounded-full bg-black-900 border-2 border-black-700 flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-300">
                          <Icon className="h-4 w-4 text-white-200 group-hover:text-accent-fg transition-colors" strokeWidth={1.5} />
                        </div>
                      </div>

                      <div className="flex-1 rounded-2xl border border-black-700 bg-black-900/80 p-5 md:p-6 group-hover:border-black-600 group-hover:bg-black-900 transition-all duration-300">
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <h3 className="font-display text-base font-bold text-white-100">{item.title}</h3>
                          <span className="font-mono text-[9px] text-white-300 tabular-nums shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        {item.desc && (
                          <p className="font-body text-sm text-white-300 leading-relaxed">{item.desc}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
