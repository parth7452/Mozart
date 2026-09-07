# Mozart

Working name for an **AI-native US invoice factoring** product (Corgi analog: risk-bearing AR factor + AI ops). Target clients: staffing agencies and SMB suppliers to enterprise/government.

This repo is **not** a music, piano, or cultural brand.

Two surfaces share one Next.js App Router app:

| Surface | Routes | Purpose |
| --- | --- | --- |
| **Marketing** | `/`, `/quote`, `/partners`, `/privacy` (`/thesis` kept, not in public nav) | Public customer site for `mozart.financial` |
| **Ops desk** | `/desk`, `/demo`, plus onboarding / verification / credit / servicing | Phase 1 scaffold: typed domain models, mock integrations, walkable demo |

**NO LIVE FUNDING** on either surface. Credit v1 is shadow / recommend-only. A human must approve before any invoice can sit in `READY_TO_FUND`. There is no ACH, lockbox, or payout ledger. The marketing site takes emailed terms requests; Mozart does not advance funds itself.

## Setup

Requires Node 20+.

```bash
cp .env.example .env          # SQLite by default
npm install
npm run setup                 # prisma generate + db push + seed
npm run dev                   # http://localhost:3000  (marketing)
```

Then:

- Public site: [http://localhost:3000](http://localhost:3000)
- Ops desk: [http://localhost:3000/desk](http://localhost:3000/desk)
- Demo walkthrough: [http://localhost:3000/demo](http://localhost:3000/demo)

Useful scripts:

| Script | Purpose |
| --- | --- |
| `npm run dev` | Next.js App Router (Turbopack) |
| `npm run setup` | Generate client, push schema, seed demo book |
| `npm run db:reset` | Wipe SQLite and re-seed |
| `npm test` | Vitest (demo path + policy + marketing CTA) |
| `npm run smoke` | Service-layer smoke of fake invoice → extract → HITL |
| `npm run build` | Production build |

Open `/demo` for the walkthrough: seed → fake invoice → staffing extract → match → shadow credit → HITL approve. The crimson banner stays up on ops routes.

Marketing pages do not need the database. `npm run setup` is only required for the desk.

### Postgres later

Local default is SQLite so `dev` and smoke work with no Docker. Production target is Postgres.

1. `docker compose up -d`
2. In `prisma/schema.prisma`, set `provider = "postgresql"`
3. `DATABASE_URL=postgresql://mozart:mozart@localhost:5432/mozart npm run db:push`

### Marketing env + `mozart.financial`

Documented in [docs/marketing.md](docs/marketing.md). Short version:

| Variable | Default | Role |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://mozart.financial` | Canonical URL / sitemap |
| `NEXT_PUBLIC_FOUNDER_EMAIL` | `start@mozart.financial` | Public contact / quote inbox |
| `NEXT_PUBLIC_CAL_URL` | `https://cal.com/parth-mozart/20min` | Book-a-call link (override when the real event exists) |

Deploy the repo root to **Vercel** (Next.js preset). After a `*.vercel.app` URL exists, add `mozart.financial` and `www` in Vercel Domains, then create the records Vercel shows at **Porkbun**. Do not guess IPs — paste what the dashboard prints.

## Architecture

```
src/app/(marketing)/   public site (home, thesis, privacy)
src/app/(desk)/        ops UI (desk, demo, onboarding, verification, credit, servicing)
src/app/api/           ops API stubs
src/components/        ops UI + src/components/marketing
src/lib/site.ts        public CTA / domain config
src/domain/            policy, verticals, extract Zod schemas, state machines, credit math
src/integrations/      Bank / accounting / KYB / debtor-confirm interfaces + mocks
src/server/            Prisma services used by API routes, seed, and smoke
prisma/                schema + seed
docs/marketing.md      run, env, Vercel, Porkbun DNS
```

Boring stack: **Next.js 15 App Router**, **TypeScript**, **Prisma**, **Zod**, **Tailwind**, **Vitest**. Auth is a stub session (`src/lib/auth.ts`) — `Alex Chen · credit_officer`.

### Dual-path verticals

Discovery has not locked a single vertical. Both models and extract schemas ship now:

| Vertical | Support docs | Extract schema |
| --- | --- | --- |
| `staffing` | timesheet + VMS | `StaffingExtractSchema` |
| `smb_supplier` | PO + delivery | `SmbSupplierExtractSchema` |

The demo seeds Harborline Staffing (`INV-1042`) and Northfork Components (`INV-2208`).

### Selection filter (fund path)

A fund path **would** open only after:

- accounting connected — QBO **or** Xero **or** NetSuite
- bank connected — Plaid

That gate is implemented (`fundPathWouldOpen`). It does not turn on money movement.

### Credit v1

`recommendCredit` emits risk score, dilution (bps), fraud flags, advance %, reserve %. Status starts as recommend / `PENDING_HITL`. `hitlDecide` is the only path to `READY_TO_FUND`. `FUNDING_POLICY.autoFundEnabled` is false and there is no `FUNDED` state.

### Servicing stubs

Reserve ledger, cash-application stub (`liveMoneyMoved: false`), DAY_0–DAY_45 collection queue, UCC-1 status machine (`NOT_STARTED → DRAFTED → FILED → PERFECTED`). No SOS transmission.

### Integration seams

Replace the mock classes; keep the interfaces in `src/integrations/types.ts`:

- `BankLinkAdapter` → `MockPlaidAdapter`
- `AccountingAdapter` → `MockAccountingAdapter` (`QBO` / `XERO` / `NETSUITE`)
- `KybAmlAdapter` → `MockKybAmlAdapter` (`vendorSpendCents: 0`)
- `DebtorConfirmAdapter` → `MockDebtorConfirmAdapter`

No live vendor API calls and no KYB spend in this build.

## No-funding policy

`src/domain/policy.ts` is the source of truth:

- `liveFundingEnabled: false`
- `autoFundEnabled: false`
- `creditMode: "shadow"`
- HITL required before `READY_TO_FUND`
- accounting + bank required before the fund path would open

The ops banner repeats this on every desk page. The marketing footer uses referral/arranger language: Mozart helps arrange funding through partners and does not advance funds itself. Do not invent traction, licenses, or loss metrics.

## Next Phase 1 priorities

1. Swap SQLite → Postgres and add real migrations.
2. Replace auth stub with a real session (still internal-only).
3. Persist uploaded files (object store) instead of `stub://` paths.
4. Implement adapters behind the existing interfaces (Plaid / QBO|Xero|NetSuite / KYB) — still no auto-fund.
5. Debtor confirmation that actually reaches AP (still not a funding instruction).
6. Stronger duplicate + related-party checks across the book.
7. Credit officer audit log and dual-control if advance % exceeds a threshold.

## Out of scope (this pass)

- Production Plaid / QBO / KYB keys
- Real money movement or lockbox
- Invented traction or loss metrics
