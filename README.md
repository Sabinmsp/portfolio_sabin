# Sabin Pradhan: AI Engineer Portfolio

A single page portfolio built with Next.js 15 (App Router), TypeScript, Tailwind CSS 4, and Framer Motion.

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
│   ├── icon.png        # favicon
│   └── globals.css     # design tokens, type scale, ledger primitives
├── components/
│   ├── Contact.tsx
│   ├── Experience.tsx  # Work and Study sections
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── ProjectCard.tsx   # a ledger row
│   ├── ProjectVisual.tsx # screenshot or pipeline diagram
│   └── ThemeProvider.tsx
└── public/
    ├── resume PDF, images, logos
```

## Design system

The layout is an index: numbered ledger rows separated by rules, no cards.
Everything is driven by tokens in `globals.css`.

- **Type scale.** Six steps (`--t-label` through `--t-numeral`), 15px floor,
  17px body on mobile and 18px on desktop. Use the `.t-*` and `.meta` classes
  rather than Tailwind `text-*` utilities so the scale stays closed.
- **Color.** Dark is the primary design; light is a warm paper variant with its
  own accent, not an inversion. Every text pairing is measured at 4.5:1 or
  better, including against `--bg-inset`.
- **Accent.** One filled action per context. Everything else is a ruled or
  underlined link.
- **Motion.** Entrance only, and every animation is disabled under
  `prefers-reduced-motion: reduce`.

## Project visuals

`ProjectVisual` renders one of two kinds, set per project in `Experience.tsx`:

- `kind: "flow"` draws the pipeline the project actually runs.
- `kind: "shot"` renders a real screenshot (`src`, `alt`, `caption`).

The `mockup-*.png` files in `public/` are stock product photos, not screenshots
of these projects, so nothing references them. Drop a genuine screenshot into
`public/` and switch that project to `kind: "shot"` when you have one.

## Setup

```bash
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
