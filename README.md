# Mozart

Working name for an **AI-native US invoice factoring** product (Corgi analog: risk-bearing AR factor + AI ops). Target clients: staffing agencies and SMB suppliers to enterprise/government.

This repo is **not** a music, piano, or cultural brand. Phase 1 is an ops-console scaffold: typed domain models, mock integrations, and a walkable demo. It is **not** a live funder and **not** a marketing site.

**NO LIVE FUNDING.** Credit v1 is shadow / recommend-only. A human must approve before any invoice can sit in `READY_TO_FUND`. There is no ACH, lockbox, or payout ledger.

## Setup

Requires Node 20+.

```bash
cp .env.example .env          # SQLite by default
npm install
npm run setup                 # prisma generate + db push + seed
npm run dev                   # http://localhost:3000
```

Useful scripts:

| Script | Purpose |
| --- | --- |
| `npm run dev` | Next.js App Router (Turbopack) |
| `npm run setup` | Generate client, push schema, seed demo book |
| `npm run db:reset` | Wipe SQLite and re-seed |
| `npm test` | Vitest (demo path + policy) |
| `npm run smoke` | Service-layer smoke of fake invoice → extract → HITL |
| `npm run build` | Production build |

Open `/demo` for the walkthrough: seed → fake invoice → staffing extract → match → shadow credit → HITL approve. The crimson banner stays up the entire time.

### Postgres later

Local default is SQLite so `dev` and smoke work with no Docker. Production target is Postgres.

1. `docker compose up -d`
2. In `prisma/schema.prisma`, set `provider = "postgresql"`
3. `DATABASE_URL=postgresql://mozart:mozart@localhost:5432/mozart npm run db:push`

## Architecture

```
src/domain/          policy, verticals, extract Zod schemas, state machines, credit math
src/integrations/    Bank / accounting / KYB / debtor-confirm interfaces + mocks
src/server/          Prisma services used by API routes, seed, and smoke
src/app/             App Router UI + /api stubs
src/components/      Ops UI (banner, forms, demo walkthrough)
prisma/              schema + seed
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

The UI banner repeats this on every page. Do not invent traction or loss metrics here.

## Next Phase 1 priorities

1. Swap SQLite → Postgres and add real migrations.
2. Replace auth stub with a real session (still internal-only).
3. Persist uploaded files (object store) instead of `stub://` paths.
4. Implement adapters behind the existing interfaces (Plaid / QBO|Xero|NetSuite / KYB) — still no auto-fund.
5. Debtor confirmation that actually reaches AP (still not a funding instruction).
6. Stronger duplicate + related-party checks across the book.
7. Credit officer audit log and dual-control if advance % exceeds a threshold.
8. Marketing / landing site stays **out of this repo** (separate follow-on).

## Out of scope (this pass)

- Marketing site
- Production Plaid / QBO / KYB keys
- Real money movement or lockbox
- Invented traction or loss metrics
