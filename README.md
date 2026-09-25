# Web_Nexoras — Portfolio (Next.js)

Rebuilt from the original React + TypeScript portfolio into **Next.js 14 (App Router) + JavaScript/JSX**.

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 🛠 Build for production

```bash
npm run build
npm start
```

Deploys cleanly to **Vercel** (recommended — just import the repo, zero config needed).

## ✏️ Where to edit things

| What | File |
|---|---|
| **Brand name, tagline, email, phone, social links, resume URL, site URL** | `lib/site-config.js` — edit this ONE file and it updates everywhere (Navbar, Footer, Contact, SEO tags, JSON-LD) |
| Hero heading / typing roles | `sections/Hero.jsx` |
| About bio / highlights | `sections/About.jsx` |
| Skills list (name, %, color, icon) | `components/SkillsDisplay.jsx` → `defaultSkills` array |
| Experience timeline | `sections/Experience.jsx` |
| Services offered | `sections/Services.jsx` |
| Projects | `sections/Projects.jsx` |
| Testimonials | `sections/Testimonials.jsx` |
| Contact form (currently mock — you said you'll wire the API yourself) | `sections/Contact.jsx` → `handleSubmit` |
| SEO metadata (title, description, OG image, JSON-LD) | `app/layout.jsx` |
| Sitemap / robots.txt | `app/sitemap.js` / `app/robots.js` |

## 🖼 Resume / CV

`lib/site-config.js` → `resumeUrl`. Either:
- Drop a PDF into `public/resume.pdf` and set `resumeUrl: "/resume.pdf"`, or
- Paste a hosted link (Google Drive, etc).

## 🔌 Connecting your own backend / API

The contact form in `sections/Contact.jsx` currently just simulates a submit
(`await new Promise(r => setTimeout(r, 1500))`). Replace that with a `fetch()`
call to your own API route or backend once it's ready.

## 🎨 What changed vs. the original

- **Framework:** Vite + React + TypeScript → **Next.js (App Router) + JavaScript/JSX**
- **Routing:** react-router-dom removed — this is a single-page portfolio using
  anchor-link scrolling, which Next.js handles natively. A Next.js 404 (`app/not-found.jsx`)
  replaces the old `NotFound` route.
- **Images:** all `<img>` tags replaced with `next/image` for automatic
  optimization (lazy loading, responsive sizes, modern formats).
- **SEO:** added the Next.js Metadata API (title/description/OG/Twitter cards),
  `sitemap.xml`, `robots.txt`, and JSON-LD structured data (`ProfessionalService` schema).
- **Fonts:** Google Fonts now loaded via `next/font/google` instead of a CSS `@import`
  (faster, no layout shift).
- **Branding:** all `mahirTheCoder` / `Mahir` references replaced with **Web_Nexoras**;
  contact info & social links updated. Original per-project GitHub repo links were left
  as-is since those point to real existing repos.
- **Skills section:** redesigned — rounded **cards** (not circular rings) in an
  **auto-scrolling marquee**, pauses on hover, scales up and lights up in the
  skill's own brand color on hover.
- **Services section:** rewritten for a MERN / full-stack offering (Frontend,
  Backend, Database, Full-Stack, UI/UX, Deployment).
- **Unused shadcn/ui + toast/dialog/sheet/react-query/react-router/react-hook-form
  dependencies removed** — none of them were actually used in the rendered site,
  so dropping them keeps the project lean.

## 📦 Tech stack

Next.js 14 · React 18 · Tailwind CSS · Framer Motion · React Three Fiber / Drei · lucide-react · react-icons
