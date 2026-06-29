"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ComingSoonCardProps {
  id: string;
  icon: React.ReactNode;
  className?: string;
}

export function ComingSoonCard({ id, icon, className }: ComingSoonCardProps) {
  const t = useTranslations(`home.comingSoon.products.${id}`);
  const tCommon = useTranslations("home.comingSoon");

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "relative h-full flex flex-col rounded-2xl border border-dashed border-coming-soon/40",
        "bg-black-950/80 p-7 animate-gold-pulse",
        className
      )}
    >
      <span
        className={cn(
          "absolute top-4 end-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full",
          "text-[9px] font-semibold uppercase tracking-[0.15em] text-coming-soon",
          "bg-coming-soon/10 border border-coming-soon/20"
        )}
      >
        <Clock className="h-3 w-3" />
        {tCommon("badge")}
      </span>

      <div className="mb-5 opacity-30 grayscale">{icon}</div>
      <h3 className="font-display text-lg font-bold text-white-100 mb-2">{t("name")}</h3>
      <p className="font-body text-xs text-white-300 mb-6 leading-relaxed flex-1">{t("description")}</p>
      <Button variant="gold" size="sm" className="rounded-full w-full">
        {tCommon("notifyMe")}
      </Button>
    </motion.div>
  );
}
