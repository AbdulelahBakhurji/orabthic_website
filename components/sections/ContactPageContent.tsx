"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Youtube } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMotionConfig } from "@/lib/motion";

const countries = [
  "Saudi Arabia", "UAE", "Egypt", "United Kingdom", "Germany",
  "United States", "Singapore", "South Africa", "Other",
];

const productInterests = ["crm", "accounting", "pos", "inventory", "other"];

export function ContactPageContent() {
  const t = useTranslations("contact");
  const { fadeUp, stagger, transition, viewport } = useMotionConfig();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-black-950 pt-32 pb-section-mobile lg:pb-section min-h-screen">
      <div className="mx-auto max-w-container px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
        >
          <motion.div variants={fadeUp} transition={transition}>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-display text-white-100 whitespace-pre-line mb-8">
              {t("headline")}
            </h1>
            <p className="font-body text-base text-white-300 mb-12 leading-relaxed">{t("subheadline")}</p>

            <div className="space-y-8 mb-12">
              <div>
                <h3 className="font-body text-xs font-semibold uppercase tracking-label text-white-300 mb-4">
                  {t("offices.title")}
                </h3>
                {(["riyadh", "dubai", "london"] as const).map((office) => (
                  <div key={office} className="mb-4">
                    <p className="font-body text-sm font-semibold text-white-100">{t(`offices.${office}.city`)}</p>
                    <p className="font-body text-sm text-white-300">{t(`offices.${office}.address`)}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-label text-white-300 mb-2">{t("email.label")}</p>
                <a href="mailto:enterprise@orabthic.com" className="font-body text-sm text-white-100 hover:underline">
                  enterprise@orabthic.com
                </a>
              </div>
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-label text-white-300 mb-2">{t("phone.label")}</p>
                <a href="tel:+966110000000" className="font-body text-sm text-white-100">+966 11 000 0000</a>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="#" aria-label="LinkedIn" className="text-white-300 hover:text-white-100 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" aria-label="X" className="text-white-300 hover:text-white-100 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="YouTube" className="text-white-300 hover:text-white-100 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} transition={transition}>
            {submitted ? (
              <div className="rounded-card border border-black-700 bg-black-800 p-10 text-center">
                <p className="font-display text-2xl font-bold text-white-100 mb-4">{t("form.success")}</p>
                <p className="font-body text-sm text-white-300">{t("form.successMessage")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 rounded-card border border-black-700 bg-black-800 p-8 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("form.fullName")}</Label>
                    <Input id="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">{t("form.company")}</Label>
                    <Input id="company" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">{t("form.jobTitle")}</Label>
                    <Input id="title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("form.email")}</Label>
                    <Input id="email" type="email" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("form.phone")}</Label>
                    <Input id="phone" type="tel" />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("form.country")}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t("form.countryPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t("form.productInterest")}</Label>
                  <div className="flex flex-wrap gap-3">
                    {productInterests.map((p) => (
                      <label key={p} className="flex items-center gap-2 font-body text-sm text-white-200 cursor-pointer">
                        <input type="checkbox" className="rounded border-black-700 bg-black-900" />
                        {t(`form.products.${p}`)}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t("form.message")}</Label>
                  <Textarea id="message" rows={4} />
                </div>
                <Button type="submit" className="w-full">
                  {t("form.send")}
                </Button>
              </form>
            )}

            <div className="mt-10 p-8 rounded-card border border-dashed border-black-700 text-center">
              <p className="font-body text-sm text-white-300 mb-4">{t("schedule.title")}</p>
              <Button variant="outline">{t("schedule.cta")}</Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
