import { setRequestLocale } from "next-intl/server";
import { AboutPageContent } from "@/components/sections/AboutPageContent";
import { getPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return getPageMetadata(locale, "about");
}

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <AboutPageContent />;
}
