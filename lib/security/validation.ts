import { z } from "zod";
import { sanitizeText } from "./sanitize";

export const ALLOWED_COUNTRIES = [
  "Saudi Arabia",
  "UAE",
  "Egypt",
  "United Kingdom",
  "Germany",
  "United States",
  "Singapore",
  "South Africa",
  "Other",
] as const;

export const ALLOWED_PRODUCTS = [
  "crm",
  "accounting",
  "pos",
  "inventory",
  "other",
] as const;

const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100)
    .transform((v: string) => sanitizeText(v, 100)),
  company: z
    .string()
    .min(1, "Company is required")
    .max(150)
    .transform((v: string) => sanitizeText(v, 150)),
  jobTitle: z
    .string()
    .min(1, "Job title is required")
    .max(100)
    .transform((v: string) => sanitizeText(v, 100)),
  email: z
    .string()
    .email("Invalid email address")
    .max(254)
    .transform((v: string) => v.toLowerCase().trim()),
  phone: z
    .string()
    .max(30)
    .optional()
    .transform((v: string | undefined) => (v ? sanitizeText(v, 30) : undefined)),
  country: z.enum(ALLOWED_COUNTRIES),
  productInterests: z
    .array(z.enum(ALLOWED_PRODUCTS))
    .max(5)
    .default([]),
  message: z
    .string()
    .max(5000)
    .optional()
    .transform((v: string | undefined) => (v ? sanitizeText(v, 5000) : undefined)),
  website: z.string().max(0).optional(),
  formTimestamp: z.number().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function validateContactForm(data: unknown) {
  return contactFormSchema.safeParse(data);
}

export function validateHoneypot(website: string | undefined): boolean {
  return !website || website.length === 0;
}

export function validateFormTiming(formTimestamp: number | undefined): boolean {
  if (!formTimestamp) return false;
  const elapsed = Date.now() - formTimestamp;
  return elapsed >= 3000 && elapsed <= 3_600_000;
}
