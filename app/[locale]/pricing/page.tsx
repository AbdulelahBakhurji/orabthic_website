import { setRequestLocale } from "next-intl/server";
import { PricingPageContent } from "@/components/sections/PricingPageContent";
import { getPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return getPageMetadata(locale, "pricing");
}

export default function PricingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <PricingPageContent />;
}
