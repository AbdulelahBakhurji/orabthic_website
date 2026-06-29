import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function getPageMetadata(
  locale: string,
  page: "home" | "products" | "pricing" | "about" | "contact" | "solutions"
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `metadata.pages.${page}` });
  const site = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "ar" ? "ar_SA" : "en_US",
      siteName: site("siteName"),
    },
  };
}
