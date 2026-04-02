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
| **Contact** | Web3Forms (browser `fetch`) | Public access key; see env notes below |
| **Deployment** | Vercel | Recommended host |

## Project layout

```
src/
├── app/
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
# Edit .env.local: set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY (your Web3Forms access key)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Notes |
|----------|----------|--------|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Yes (contact form) | Web3Forms access key. Inlined at build time (required so the browser can POST directly to `https://api.web3forms.com/submit` and avoid server-side Cloudflare blocks). Set in Vercel → Environment Variables. Never commit `.env.local`. Restrict the key to your production domain in the [Web3Forms](https://web3forms.com) dashboard when possible. |

The contact form POSTs JSON from the **browser** to Web3Forms (same approach as their official JS examples).

## Build

```bash
npm run build
npm start   # optional local production check
```

## Security & deployment notes

- Web3Forms access keys are intended to be used from public forms; still restrict by domain in the Web3Forms dashboard.
- Other security headers remain (see `next.config.ts`).
- Keep `.env.local` out of git (see `.gitignore`).

## Deploy on Vercel

1. Push this folder as the **repository root** (Option A) and **Import Project** in Vercel (Framework Preset: Next.js).
2. **Environment variables:** add **`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`** for Production (and Preview if you test the form there). Remove legacy `WEB3FORMS_ACCESS_KEY` if you no longer use it.
3. Redeploy after adding or changing env vars so the key is baked into the client bundle.
