export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/company/orabthic",
  twitter: "https://twitter.com/orabthic",
  youtube: "https://youtube.com/@orabthic",
} as const;

export const LEGAL_LINKS = {
  privacy: "https://orabthic.com/en/privacy",
  terms: "https://orabthic.com/en/terms",
} as const;

const LOCALE_PATTERN = /^(en|ar)$/;

export function isValidLocale(value: string): value is "en" | "ar" {
  return LOCALE_PATTERN.test(value);
}
