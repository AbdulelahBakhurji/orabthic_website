"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { isValidLocale } from "@/lib/security/constants";

export function LanguageToggle() {
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);

  const nextLocale = locale === "en" ? "ar" : "en";
  const label = nextLocale.toUpperCase();

  const toggle = () => {
    setIsAnimating(true);
    if (isValidLocale(nextLocale)) {
      localStorage.setItem("orabthic-locale", nextLocale);
    }
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/") || `/${nextLocale}`);
    setTimeout(() => setIsAnimating(false), 200);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={tCommon(nextLocale === "en" ? "switchToEnglish" : "switchToArabic")}
      className={cn(
        "relative inline-flex items-center justify-center h-9 min-w-[2.75rem] px-3 rounded-full",
        "bg-black-800/90 border border-black-700 shadow-soft backdrop-blur-md",
        "font-body text-[11px] font-semibold tracking-widest text-white-200 tabular-nums",
        "hover:bg-black-700 hover:border-black-500 hover:text-white-100",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black-950",
        isAnimating && "scale-95 opacity-70"
      )}
    >
      <span className="absolute inset-0 rounded-full grid-fine-dense opacity-20 pointer-events-none" />
      <span className="relative z-10">{label}</span>
    </button>
  );
}
