"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "./LanguageToggle";

const navItems = [
  { key: "home", href: "" },
  { key: "products", href: "/products" },
  { key: "solutions", href: "/solutions" },
  { key: "pricing", href: "/pricing" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isRTL = locale === "ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    const full = `/${locale}${href}`;
    return href === "" ? pathname === `/${locale}` || pathname === `/${locale}/` : pathname.startsWith(full);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-black-700 bg-black-900/90 backdrop-blur-xl shadow-soft"
            : "bg-black-950/80 backdrop-blur-sm"
        )}
      >
        <nav
          className="mx-auto flex h-[72px] max-w-container items-center justify-between px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <Link href={`/${locale}`} className="flex items-center shrink-0 group">
            <Image
              src="/logo.png"
              alt="Orabthic"
              width={168}
              height={40}
              className="h-9 w-auto opacity-95 group-hover:opacity-100 transition-opacity"
              priority
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={`/${locale}${href}`}
                  className={cn(
                    "relative px-4 py-2 rounded-full font-body text-[13px] font-medium transition-all duration-300",
                    isActive(href)
                      ? "text-white-100 bg-black-800 shadow-soft"
                      : "text-white-300 hover:text-white-100 hover:bg-black-800/60"
                  )}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            <Button asChild size="sm" className="rounded-full px-5">
              <Link href={`/${locale}/contact`}>{t("requestDemo")}</Link>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-white-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black-950 lg:hidden"
          >
            <div className="absolute inset-0 grid-fine opacity-50" />
            <div className="relative flex items-center justify-between p-6 border-b border-black-700 bg-black-900">
              <Image src="/logo.png" alt="Orabthic" width={150} height={36} className="h-8 w-auto" />
              <button onClick={() => setMobileOpen(false)} className="p-2 text-white-100" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.ul
              className="relative flex flex-col gap-1 px-4 pt-6"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            >
              {navItems.map(({ key, href }) => (
                <motion.li
                  key={key}
                  variants={{
                    hidden: { opacity: 0, x: isRTL ? -30 : 30 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={`/${locale}${href}`}
                    className={cn(
                      "block py-4 px-4 rounded-xl font-display text-xl font-bold transition-colors",
                      isActive(href) ? "text-white-100 bg-black-800" : "text-white-200"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(key)}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                className="flex flex-col gap-4 pt-8 px-4"
              >
                <LanguageToggle />
                <Button asChild className="rounded-full">
                  <Link href={`/${locale}/contact`}>{t("requestDemo")}</Link>
                </Button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
