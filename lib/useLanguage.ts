import { useLocale } from "next-intl";
import { getDirection } from "./utils";

export function useLanguage() {
  const locale = useLocale() as "en" | "ar";
  const isRTL = locale === "ar";
  const dir = getDirection(locale);

  return { locale, isRTL, dir };
}
