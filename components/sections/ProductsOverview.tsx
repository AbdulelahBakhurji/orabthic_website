"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionDivider } from "@/components/shared/SectionDivider";
import { useMotionConfig } from "@/lib/motion";

const products = ["crm", "accounting", "pos", "inventory"] as const;

export function ProductsOverview() {
  const t = useTranslations("home.products");
  const { fadeUp, stagger, transition, viewport } = useMotionConfig();

  return (
    <>
      <SectionDivider />
      <section className="bg-black-950 py-section-mobile lg:py-section">
        <div className="mx-auto max-w-container px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="mb-16"
          >
            <motion.h2
              variants={fadeUp}
              transition={transition}
              className="font-display text-3xl md:text-4xl font-bold tracking-display text-white-100 mb-4"
            >
              {t("title")}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={transition}
              className="font-body text-lg text-white-300 max-w-2xl"
            >
              {t("subtitle")}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {products.map((id) => (
              <motion.div key={id} variants={fadeUp} transition={transition}>
                <ProductCard id={id} href={`/products#${id}`} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
