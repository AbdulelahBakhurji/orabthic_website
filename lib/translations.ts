import en from "./translations/en.json";
import ar from "./translations/ar.json";

export const t = { en, ar } as const;

export type Translations = typeof en;
export type Locale = keyof typeof t;
