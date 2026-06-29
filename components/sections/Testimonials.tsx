"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionDivider } from "@/components/shared/SectionDivider";
import { useMotionConfig } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const t = useTranslations("home.testimonials");
  const { fadeUp, transition, viewport } = useMotionConfig();
  const items = t.raw("items") as Array<{
    quote: string;
    name: string;
    company: string;
    country: string;
  }>;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused, items.length]);

  return (
    <>
      <SectionDivider />
      <section
        className="bg-black-950 py-section-mobile lg:py-section"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
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

          <div className="relative max-w-3xl mx-auto min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="rounded-card border border-black-700 bg-black-800 p-10 md:p-12"
              >
                <blockquote className="font-body text-lg md:text-xl text-white-200 leading-relaxed mb-8">
                  &ldquo;{items[active].quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <span className="text-2xl" aria-hidden="true">{items[active].country}</span>
                  <div>
                    <p className="font-body text-sm font-semibold text-white-100">{items[active].name}</p>
                    <p className="font-body text-xs text-white-300">{items[active].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                  i === active ? "w-8 bg-white" : "w-1.5 bg-white/30"
                )}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
