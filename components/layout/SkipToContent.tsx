"use client";

import { useTranslations } from "next-intl";

export function SkipToContent() {
  const t = useTranslations("common");

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[300] focus:bg-black-900 focus:text-white-100 focus:px-4 focus:py-2 focus:rounded"
    >
      {t("skipToContent")}
    </a>
  );
}
