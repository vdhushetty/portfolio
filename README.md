# Venkat Sai Dhushetty — Portfolio

Data Engineer & Scientist portfolio (Data Lab theme).

## Live site

**Production (Vercel project):** https://portfolio-vdhushettys-projects.vercel.app

> Note: `https://portfolio-pied-iota-17.vercel.app` is an **old Vercel alias** that no longer has a deployment (`DEPLOYMENT_NOT_FOUND`). Use the project URL above, or re-assign that domain in the Vercel project settings.

### If the site asks you to log in (Vercel SSO)

Deployment Protection is enabled on the project. To make the portfolio public:

1. Open [Vercel Dashboard](https://vercel.com) → project **portfolio**
2. **Settings → Deployment Protection**
3. Set **Vercel Authentication** / protection to **Disabled** (or only protect Preview, not Production)
4. Save — production should load without login

## Stack

React 19 · TypeScript · TanStack Start · Vite · Tailwind CSS · Nitro (Vercel)

## Scripts

- `npm run dev` — local dev (`0.0.0.0:8080`)
- `npm run build` — production build (Vercel)
- `npm run typecheck` — TypeScript check

## Deploy

GitHub `main` → Vercel production.
