# Orabthic Enterprise Website

Production-ready multi-page enterprise website for Orabthic — a global B2B SaaS platform.

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** with custom design tokens
- **Framer Motion** animations
- **next-intl** (English + Arabic, full RTL)
- **Shadcn/ui** primitives
- **Lucide React** icons
- **Geist + Inter** fonts (Noto Arabic for RTL)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/en`.

## Pages

| Route | Description |
|-------|-------------|
| `/en`, `/ar` | Home |
| `/[locale]/products` | Product details |
| `/[locale]/solutions` | Industry solutions |
| `/[locale]/pricing` | Pricing tiers + FAQ |
| `/[locale]/about` | Company info |
| `/[locale]/contact` | Contact form |

## Deployment

Configured for Vercel. Set `SITE_URL` env var for sitemap generation.

```bash
npm run build
```

## Language Toggle

Click **عر** / **EN** in the navbar to switch locale. Preference persists in `localStorage`.
