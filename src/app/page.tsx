import Link from "next/link";
import { FUNDING_POLICY } from "@/domain/policy";
import { Badge, Card, PageShell } from "@/components/ui";
import { money } from "@/lib/format";
import { listClients } from "@/server/clients";
import { listInvoices } from "@/server/invoices";
import { listCreditQueue } from "@/server/credit";

export const dynamic = "force-dynamic";

export default async function DeskPage() {
  const [clients, invoices, credit] = await Promise.all([
    listClients(),
    listInvoices(),
    listCreditQueue(),
  ]);
  const pendingHitl = credit.filter((i) => i.fundingState === "PENDING_HITL").length;
  const bookCents = invoices.reduce((s, i) => s + i.amountCents, 0);

  return (
    <PageShell title="Factoring ops desk" kicker="Invoice factoring">
      <p className="mb-6 max-w-2xl text-sm text-ink/70">
        Mozart underwrites and services purchased invoices for staffing firms and SMB
        suppliers. This build is a scaffold: shadow credit, human gate, no ACH.
      </p>
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Stat label="Clients" value={String(clients.length)} href="/onboarding" />
        <Stat label="Invoices on book" value={String(invoices.length)} href="/verification" />
        <Stat label="HITL queue" value={String(pendingHitl)} href="/credit" />
        <Stat label="Face value" value={money(bookCents)} href="/verification" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="mb-2 text-xl font-semibold">Dual-path verticals</h2>
          <p className="mb-3 text-sm text-ink/70">
            Discovery is still open. Both extract schemas ship in v1.
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Badge>staffing</Badge> timesheet + VMS extract
            </li>
            <li>
              <Badge>smb_supplier</Badge> PO + delivery extract
            </li>
          </ul>
        </Card>
        <Card>
          <h2 className="mb-2 text-xl font-semibold">Credit & funding policy</h2>
          <ul className="space-y-1 text-sm text-ink/80">
            <li>Mode: {FUNDING_POLICY.creditMode} / recommend-only</li>
            <li>Auto-fund: {String(FUNDING_POLICY.autoFundEnabled)}</li>
            <li>Live funding: {String(FUNDING_POLICY.liveFundingEnabled)}</li>
            <li>HITL required before ready-to-fund: {String(FUNDING_POLICY.requireHitlBeforeReadyToFund)}</li>
            <li>Fund path needs accounting + bank: {String(FUNDING_POLICY.requireAccountingAndBankBeforeFundPath)}</li>
          </ul>
          <p className="mt-3 text-sm">
            <Link href="/demo" className="underline">
              Run the demo walkthrough →
            </Link>
          </p>
        </Card>
      </div>
    </PageShell>
  );
}

function Stat({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <Link href={href} className="block">
      <Card>
        <div className="text-[11px] uppercase tracking-wider text-ink/50">{label}</div>
        <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
      </Card>
    </Link>
  );
}
