# Mozart marketing site (`mozart.financial`)

Public customer site for **Mozart** — **US invoice factoring** arranged through commercial finance partners. Audience: staffing owners/CFOs and SMB suppliers to enterprise/government.

This is **not** a music, piano, or cultural-arts brand. Mozart does **not** advance funds itself. Partners fund today; Mozart is building its own book.

It lives in the same Next.js App Router app as the Phase 1 ops scaffold:

| URL | What |
| --- | --- |
| `/` | Public homepage (customer lead-gen) |
| `/quote` | Terms-request form (emailed lead, not a CRM) |
| `/partners` | Factor + channel partner inquiry (text only, no logos) |
| `/privacy` | Privacy |
| `/thesis` | Investor memo. URL kept. Not in public nav or footer. |
| `/desk`, `/demo`, `/onboarding`, `/verification`, `/credit`, `/servicing` | Internal ops console — routes kept, hidden from public nav/footer |
| `/api/quote` | Emails the terms request |
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

`npm run setup` is only needed if you will click through to the ops desk and expect seeded clients. Marketing pages do not touch Prisma.

## Environment variables

Public marketing vars are `NEXT_PUBLIC_*` (inlined at build time). Quote delivery secrets stay server-side.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended in production | Canonical origin for metadata, sitemap, robots. Default: `https://mozart.financial` (or the Vercel production URL if that env is present). |
| `NEXT_PUBLIC_FOUNDER_EMAIL` | No | Public contact / quote inbox. Default: `parth@mozart.financial`. |
| `NEXT_PUBLIC_CAL_URL` | No | Booking link. Default placeholder: `https://cal.com/parth-mozart/20min`. Override when the real event exists. |
| `RESEND_API_KEY` | No | If set, `/api/quote` emails the lead via Resend. |
| `RESEND_FROM` | No | Resend from address. Default: `Mozart Quotes <onboarding@resend.dev>` (swap after domain verify). |
| `FORMSPREE_FORM_ID` | No | If Resend is unset and this is set, `/api/quote` posts to Formspree. |

If neither Resend nor Formspree is configured, the form falls back to a `mailto:` draft to the founder inbox. Label that clearly — there is no fake CRM.

Ops-only vars (`DATABASE_URL`, stub auth) are unchanged. See root `.env.example`.

Public homepage copy lives in `src/lib/site.ts` `COPY`. Do not invent customer counts, dollars funded, loss rates, licenses, or partner brand names. Soft compliance (see legal memo `broker-disclosure-site-2026-09-07`): no Mozart-as-funder claims, no unsupported fee bands, no absolute “not a loan” / “no long-term contract” language. Counsel approval is still pending for the final footer/FAQ.

Primary nav: How it works, Who it's for, What it costs, Get a quote. Founder link is footer-only. Thesis, `/desk`, and `/demo` stay off public nav and footer.

## Deploy on Vercel

One project, repo root (this is not a monorepo split).

1. Import the GitHub repo into Vercel.
2. Framework preset: **Next.js**. Root directory: `.` (default).
3. Build command: `npm run build` (already runs `prisma generate && next build`).
4. Set env:
   - `DATABASE_URL` — still required for the ops build (Prisma generate). SQLite will not persist on Vercel; use Postgres if you want the desk to work in production. Marketing HTML will still build.
   - `NEXT_PUBLIC_SITE_URL=https://mozart.financial`
   - `NEXT_PUBLIC_FOUNDER_EMAIL=parth@mozart.financial` if you want to pin the inbox
   - `NEXT_PUBLIC_CAL_URL` when a real Cal.com event exists
   - `RESEND_API_KEY` (preferred) or `FORMSPREE_FORM_ID` so quote requests actually send
5. Deploy. Confirm:
   - `https://<deployment>.vercel.app/` — marketing
   - `https://<deployment>.vercel.app/quote` — terms request
   - `https://<deployment>.vercel.app/desk` — ops (needs a working DB; not linked from the public footer)

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

Until DNS is cut over, share the `*.vercel.app` URL. Footer is legal Variant A referral/arranger language. Do not claim Mozart advances funds. Do not put 3-minute process claims on CTAs.

## Privacy / indexing

- `/privacy` covers the terms-request fields, founder email, optional scheduler, and host logs.
- `src/app/robots.ts` allows `/` and disallows ops and `/api`.
- `/thesis` is `noindex`.

## Brand + compliance check

Search the repo for piano, classical, Wolfgang, concert, symphony before shipping copy changes. Also search customer pages for licensed, named factors, fee bands, “cash in a few days”, and Mozart-as-funder claims. Assertions live in `tests/marketing-site.test.ts`.
