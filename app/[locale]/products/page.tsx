import { setRequestLocale, getTranslations } from "next-intl/server";
import { ProductsPageContent } from "@/components/sections/ProductsPageContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return getPageMetadata(locale, "products");
}

export default async function ProductsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "metadata.breadcrumb" });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t("home"), url: `https://orabthic.com/${locale}` },
          { name: t("products"), url: `https://orabthic.com/${locale}/products` },
        ]}
      />
      <ProductsPageContent />
    </>
  );
}
