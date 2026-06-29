import { setRequestLocale } from "next-intl/server";
import { SolutionsPageContent } from "@/components/sections/SolutionsPageContent";
import { getPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return getPageMetadata(locale, "solutions");
}

export default function SolutionsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <SolutionsPageContent />;
}
