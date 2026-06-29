import { setRequestLocale } from "next-intl/server";
import { ContactPageContent } from "@/components/sections/ContactPageContent";
import { getPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return getPageMetadata(locale, "contact");
}

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <ContactPageContent />;
}
