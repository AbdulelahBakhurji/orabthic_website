import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Noto_Kufi_Arabic, Noto_Sans_Arabic } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { locales, type Locale } from "@/i18n";
import { getDirection } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { PageTransition } from "@/components/layout/PageTransition";
import "../globals.css";
import { getTranslations } from "next-intl/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["700"],
  variable: "--font-noto-kufi",
  display: "swap",
});

const notoSans = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500"],
  variable: "--font-noto-sans",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      siteName: t("siteName"),
      images: [{ url: "/logo.png", width: 1200, height: 630, alt: t("siteName") }],
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      canonical: "https://orabthic.com",
      languages: {
        en: "https://orabthic.com/en",
        ar: "https://orabthic.com/ar",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = getDirection(locale);

  return (
    <div
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${GeistSans.variable} ${notoKufi.variable} ${notoSans.variable} ${
        locale === "ar"
          ? "[font-family:var(--font-noto-sans)] [font-feature-settings:'ss01'] [&_h1,&_h2,&_h3,&_h4]:[font-family:var(--font-noto-kufi)] arabic-text"
          : "[&_h1,&_h2,&_h3,&_h4]:font-display"
      } min-h-screen bg-black-950 text-white-100 antialiased`}
    >
      <NextIntlClientProvider locale={locale} messages={messages}>
        <SkipToContent />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <main id="main-content">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
