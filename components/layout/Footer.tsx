"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Linkedin, MapPin, Twitter, Youtube } from "lucide-react";
import { useMotionConfig } from "@/lib/motion";
import { LEGAL_LINKS, SOCIAL_LINKS } from "@/lib/security/constants";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const { fadeUp, transition, viewport } = useMotionConfig();

  const productLinks = [
    { key: "crm", href: "/products#crm" },
    { key: "accounting", href: "/products#accounting" },
    { key: "pos", href: "/products#pos" },
    { key: "inventory", href: "/products#inventory" },
    { key: "orabthicNext", href: "/products", comingSoon: true },
  ] as const;

  const companyLinks = [
    { key: "about", href: "/about" },
    { key: "careers", href: "/about#careers" },
    { key: "press", href: "/about#press" },
    { key: "partners", href: "/about#partners" },
  ] as const;

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }}
      className="relative bg-black-900 border-t border-black-700 overflow-hidden"
    >
      <div className="grid-fine-dense absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-container px-6 lg:px-8 py-section-mobile lg:py-20">
        <motion.div
          variants={fadeUp}
          transition={transition}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10"
        >
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href={`/${locale}`} className="inline-block mb-6 group">
              <Image
                src="/logo.png"
                alt="Orabthic"
                width={168}
                height={40}
                className="h-9 w-auto opacity-95 group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="font-display text-base font-semibold text-white-100 mb-5">{t("tagline")}</p>
            <p className="font-body text-sm text-white-300 leading-relaxed mb-6 max-w-sm">
              {t("description")}
            </p>
            <div className="flex items-start gap-2 text-white-300">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="font-body text-sm">{t("contact.address")}</p>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="font-body text-xs font-semibold uppercase tracking-label text-white-300 mb-6">
              {t("products.title")}
            </h3>
            <ul className="space-y-3">
              {productLinks.map(({ key, href, ...rest }) => (
                <li key={key}>
                  <Link
                    href={`/${locale}${href}`}
                    className="font-body text-sm text-white-200 hover:text-white-100 transition-colors inline-flex items-center gap-2"
                  >
                    {t(`products.${key}`)}
                    {"comingSoon" in rest && rest.comingSoon && (
                      <span className="text-[9px] font-semibold uppercase tracking-wide text-coming-soon bg-coming-soon/10 border border-coming-soon/20 px-1.5 py-0.5 rounded-full">
                        {t("products.comingSoon")}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="font-body text-xs font-semibold uppercase tracking-label text-white-300 mb-6">
              {t("company.title")}
            </h3>
            <ul className="space-y-3">
              {companyLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={`/${locale}${href}`}
                    className="font-body text-sm text-white-200 hover:text-white-100 transition-colors"
                  >
                    {t(`company.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="font-body text-xs font-semibold uppercase tracking-label text-white-300 mb-6">
              {t("contact.title")}
            </h3>
            <a
              href={`mailto:${t("contact.email")}`}
              className="block font-body text-sm text-white-200 hover:text-white-100 transition-colors mb-2"
            >
              {t("contact.email")}
            </a>
            <a
              href={`tel:${t("contact.phone").replace(/\s/g, "")}`}
              className="block font-body text-sm text-white-200 hover:text-white-100 transition-colors mb-6"
            >
              {t("contact.phone")}
            </a>
            <div className="flex gap-2">
              {[
                { label: "LinkedIn", Icon: Linkedin, href: SOCIAL_LINKS.linkedin },
                { label: "X / Twitter", Icon: Twitter, href: SOCIAL_LINKS.twitter },
                { label: "YouTube", Icon: Youtube, href: SOCIAL_LINKS.youtube },
              ].map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center h-9 w-9 rounded-full border border-black-700 text-white-300 hover:text-white-100 hover:border-black-500 hover:bg-black-800 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-16 pt-8 border-t border-black-700 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <p className="font-body text-xs text-black-500">{t("copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex flex-wrap items-center gap-4 lg:gap-6">
            <a
              href={LEGAL_LINKS.privacy}
              className="font-body text-xs text-black-500 hover:text-white-300 transition-colors"
            >
              {t("privacy")}
            </a>
            <a
              href={LEGAL_LINKS.terms}
              className="font-body text-xs text-black-500 hover:text-white-300 transition-colors"
            >
              {t("terms")}
            </a>
            <span className="hidden sm:block w-px h-3 bg-black-700" aria-hidden="true" />
            <span className="font-body text-[10px] uppercase tracking-wide text-black-500 border border-black-700 px-2.5 py-1 rounded-md bg-black-800/50">
              {t("badges.security")}
            </span>
            <span className="font-body text-[10px] uppercase tracking-wide text-black-500 border border-black-700 px-2.5 py-1 rounded-md bg-black-800/50">
              {t("badges.privacy")}
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
