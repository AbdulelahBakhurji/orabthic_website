"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/useLanguage";
import { ProductIcon } from "./ProductIcons";

interface ProductCardProps {
  id: "crm" | "accounting" | "pos" | "inventory";
  href?: string;
}

export function ProductCard({ id, href }: ProductCardProps) {
  const t = useTranslations(`home.products.products.${id}`);
  const tCommon = useTranslations("home.products");
  const locale = useLocale();
  const { isRTL } = useLanguage();
  const features = t.raw("features") as string[];

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative rounded-card border border-black-700 bg-black-800 p-10",
        "hover:border-black-500 transition-all duration-300",
        "overflow-hidden"
      )}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <ProductIcon name={id} className="h-12 w-12 text-white mb-6" />

      <h3 className="font-display text-2xl font-bold text-white-100 mb-1">{t("name")}</h3>
      <p className="font-body text-sm text-white-300 mb-4" dir={locale === "en" ? "rtl" : "ltr"}>
        {t("nameAr")}
      </p>
      <p className="font-body text-sm text-white-200/70 mb-6 leading-relaxed">{t("description")}</p>

      <ul className="space-y-2 mb-8">
        {features.map((feature) => (
          <li key={feature} className="font-body text-xs text-white-300 flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 rounded-full bg-white/40 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {href && (
        <Link
          href={`/${locale}${href}`}
          className="inline-flex items-center gap-2 font-body text-sm font-semibold text-white-100 hover:text-white transition-colors group/link"
        >
          {tCommon("learnMore")}
          <ArrowRight className={cn("h-4 w-4 transition-transform group-hover/link:translate-x-1", isRTL && "rotate-180 group-hover/link:-translate-x-1")} />
        </Link>
      )}
    </motion.div>
  );
}
