# Sabin Pradhan: AI Engineer Portfolio

A minimal, professional portfolio built with Next.js 15 (App Router), TypeScript, Tailwind CSS 4, and Framer Motion.

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 15 | React, App Router |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS 4 | Utility-first CSS, theme variables |
| **Animations** | Framer Motion | Scroll and entrance animations |
| **Icons** | Lucide React | Icon set |
| **Contact** | Web3Forms via `/api/contact` | Server-side key; see env notes below |
| **Deployment** | Vercel | Recommended host |

## Project layout

```
src/
├── app/
│   ├── api/contact/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Contact.tsx
│   ├── Experience.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── LoadingScreen.tsx
│   ├── Navbar.tsx
│   ├── ThemeProvider.tsx
│   └── TiltCard.tsx
└── public/
    ├── resume PDF, images, logos
```

## Setup

```bash
cd portfolio
npm install
cp .env.example .env.local
# Edit .env.local: set WEB3FORMS_ACCESS_KEY (same value as your Web3Forms dashboard key)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Notes |
|----------|----------|--------|
| `WEB3FORMS_ACCESS_KEY` | Yes (contact form) | Web3Forms access key. **Server-only** — not exposed to the browser. Set in Vercel → Project → Settings → Environment Variables. Never commit `.env.local`. Restrict the key to your production domain in the [Web3Forms](https://web3forms.com) dashboard when possible. |

The contact form POSTs JSON to **`/api/contact`**; the Route Handler forwards to Web3Forms with the secret key.

## Build

```bash
npm run build
npm start   # optional local production check
```

## Security & deployment notes

- The Web3Forms key stays on the server (`WEB3FORMS_ACCESS_KEY`); the browser only talks to same-origin `/api/contact`.
- Production CSP uses `connect-src 'self'` for fetches from the client bundle.
- Other security headers remain (see `next.config.ts`).
- Keep `.env.local` out of git (see `.gitignore`).

## Deploy on Vercel

1. Push this folder as the **repository root** (Option A) and **Import Project** in Vercel (Framework Preset: Next.js).
2. **Environment variables:** add `WEB3FORMS_ACCESS_KEY` for Production (and Preview if you test the form there). No `NEXT_PUBLIC_` prefix needed.
3. Redeploy after adding or changing env vars.
