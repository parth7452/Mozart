# Mozart marketing site (`mozart.financial`)

Public early-access site for **Mozart** — an AI-native **US invoice factoring** product (working name). Audience: staffing owners/CFOs and SMB suppliers to enterprise/government.

This is **not** a music, piano, or cultural-arts brand. The site does **not** offer live funding.

It lives in the same Next.js App Router app as the Phase 1 ops scaffold:

| URL | What |
| --- | --- |
| `/`, `/privacy` | Public marketing |
| `/desk`, `/demo`, `/onboarding`, `/verification`, `/credit`, `/servicing` | Internal ops console |
| `/api/*` | Ops API stubs |

Route groups: `src/app/(marketing)` and `src/app/(desk)`. Shared config: `src/lib/site.ts`.

## Run locally

Same as the rest of the repo (Node 20+):

```bash
cp .env.example .env
npm install
npm run setup          # ops DB — not required to *view* marketing pages
npm run dev            # http://localhost:3000  (marketing)
# ops desk:            http://localhost:3000/desk
# demo walkthrough:    http://localhost:3000/demo
```

`npm run setup` is only needed if you will click through to the ops desk and expect seeded clients. Marketing pages are static and do not touch Prisma.

## Environment variables

All marketing vars are `NEXT_PUBLIC_*` (inlined at build time). None are secrets.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended in production | Canonical origin for metadata, sitemap, robots. Default: `https://mozart.financial` (or the Vercel production URL if that env is present). |
| `NEXT_PUBLIC_FOUNDER_EMAIL` | No | CTA mailto. Default: `parthpahuja@gmail.com`. |
| `NEXT_PUBLIC_CAL_URL` | No | If set (e.g. `https://cal.com/you/mozart`), primary CTA becomes **Book a research call** and points here. If unset, CTA is **Talk to the founder** → mailto. |

Ops-only vars (`DATABASE_URL`, stub auth) are unchanged. See root `.env.example`.

Copy on the site is intentionally traction-free: no customer logos, AUM, loss rates, or testimonials.

## Deploy on Vercel

One project, repo root (this is not a monorepo split).

1. Import the GitHub repo into Vercel.
2. Framework preset: **Next.js**. Root directory: `.` (default).
3. Build command: `npm run build` (already runs `prisma generate && next build`).
4. Set env:
   - `DATABASE_URL` — still required for the ops build (Prisma generate). SQLite will not persist on Vercel; use Postgres if you want the desk to work in production. Marketing HTML will still build.
   - `NEXT_PUBLIC_SITE_URL=https://mozart.financial`
   - `NEXT_PUBLIC_FOUNDER_EMAIL` if you want something other than the default
   - `NEXT_PUBLIC_CAL_URL` when a Cal.com event exists
5. Deploy. Confirm:
   - `https://<deployment>.vercel.app/` — marketing
   - `https://<deployment>.vercel.app/desk` — ops (needs a working DB)
   - `https://<deployment>.vercel.app/demo` — scaffold walkthrough

If you want marketing-only hosting later, split `apps/marketing` out. For now a single deploy is the cleanest fit for this repo.

## Point `mozart.financial` (and `www`) at the deploy

DNS is at **Porkbun**. Do this **after** you have a Vercel deployment URL.

1. In the Vercel project: **Settings → Domains** → add `mozart.financial` and `www.mozart.financial`.
2. Vercel will show the exact records to create. Typical pattern:
   - Apex `mozart.financial`: `A` → `10.0.1.1` (Vercel anycast; confirm in the dashboard — do not guess if they show something else)
   - `www`: `CNAME` → `cname.vercel-dns.com`
3. In Porkbun → domain **mozart.financial** → DNS:
   - Remove conflicting parking/A/CNAME records on `@` and `www`
   - Add the records Vercel specified
4. Wait for propagation. Vercel issues the certificate automatically.

Until DNS is cut over, share the `*.vercel.app` URL. Do not announce live funding when the domain goes live; the footer disclaimer stays.

## Privacy / indexing

- `/privacy` is intentionally short: email + optional scheduler + host logs. No application data.
- `src/app/robots.ts` allows `/` and `/privacy`, disallows ops and `/api`.

## Brand check

Search the repo for piano, classical, Wolfgang, concert, symphony before shipping copy changes. The public one-liner is asserted in `tests/marketing-site.test.ts`.
