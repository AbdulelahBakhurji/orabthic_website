"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/shared/SectionShell";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { useLanguage } from "@/lib/useLanguage";
import { cn } from "@/lib/utils";

type FaqItem = {
  category: string;
  question: string;
  answer: string;
};

const categoryStyles: Record<string, string> = {
  pricing: "text-accent bg-accent/10 border-accent/20",
  deployment: "text-white-200 bg-black-800 border-black-600",
  platform: "text-white-200 bg-black-800 border-black-600",
  support: "text-white-200 bg-black-800 border-black-600",
  healthcare: "text-coming-soon bg-coming-soon/10 border-coming-soon/20",
};

export function PricingFAQ() {
  const t = useTranslations("pricing.faq");
  const tPricing = useTranslations("pricing");
  const locale = useLocale();
  const { isRTL } = useLanguage();
  const faqItems = t.raw("items") as FaqItem[];

  return (
    <>
      <FAQJsonLd items={faqItems} />

      <SectionShell label={t("label")} title={t("title")} description={t("subtitle")} divider>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="relative rounded-2xl border border-black-700 bg-black-900 p-8 shadow-card overflow-hidden">
              <div className="absolute inset-0 grid-fine opacity-25 pointer-events-none" />
              <div className="relative z-10">
                <div className="h-11 w-11 rounded-xl bg-black-800 border border-black-700 flex items-center justify-center mb-6">
                  <MessageCircle className="h-5 w-5 text-white-200" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-bold text-white-100 mb-3">{t("sidebarTitle")}</h3>
                <p className="font-body text-sm text-white-300 leading-relaxed mb-6">{t("sidebarText")}</p>
                <p className="font-mono text-[10px] uppercase tracking-wide text-white-300 mb-6">
                  {faqItems.length} {t("label")}
                </p>
                <Button asChild className="rounded-full w-full group">
                  <Link href={`/${locale}/contact`}>
                    {tPricing("contactCta")}
                    <ArrowUpRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-black-700 rounded-2xl bg-black-900/80 px-5 md:px-6 overflow-hidden shadow-soft data-[state=open]:border-black-600 data-[state=open]:bg-black-900 transition-colors"
                >
                  <AccordionTrigger className="py-5 hover:no-underline gap-4">
                    <div className="flex items-start gap-4 text-start">
                      <span className="font-mono text-xs text-white-300 mt-1 shrink-0 w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="space-y-2">
                        <span
                          className={cn(
                            "inline-flex text-[9px] font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full border",
                            categoryStyles[item.category] ?? categoryStyles.platform
                          )}
                        >
                          {t(`categories.${item.category}`)}
                        </span>
                        <span className="block font-display text-base font-semibold text-white-100 leading-snug">
                          {item.question}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="ps-10 md:ps-14 pb-5 text-[15px] leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
