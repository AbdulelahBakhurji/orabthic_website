import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { PlatformManifesto } from "@/components/sections/PlatformManifesto";
import { ArchitectureBento } from "@/components/sections/ArchitectureBento";
import { ComingSoonProducts } from "@/components/sections/ComingSoonProducts";
import { InfrastructureSection } from "@/components/sections/InfrastructureSection";
import { IntegrationLayer } from "@/components/sections/IntegrationLayer";
import { ContactStrip } from "@/components/sections/ContactStrip";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { getPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return getPageMetadata(locale, "home");
}

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <OrganizationJsonLd />
      <Hero />
      <PlatformManifesto />
      <ArchitectureBento />
      <ComingSoonProducts />
      <InfrastructureSection />
      <IntegrationLayer />
      <ContactStrip />
    </>
  );
}
