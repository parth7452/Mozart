import Link from "next/link";
import { Badge, Card, Empty, PageShell } from "@/components/desk-ui";
import { HitlButtons } from "@/components/forms/HitlButtons";
import { money, pct } from "@/lib/format";
import { listCreditQueue } from "@/server/credit";
import { FUNDING_POLICY } from "@/domain/policy";

export const dynamic = "force-dynamic";

export default async function CreditPage() {
  const invoices = await listCreditQueue();
  return (
    <PageShell title="Debtor credit v1" kicker="Shadow / HITL">
      <p className="mb-4 max-w-2xl text-sm text-ink/70">
        Recommend-only. Risk, dilution, fraud flags, advance %, and reserve % are suggestions.
        A credit officer must approve before any ready-to-fund state. Auto-fund is off.{" "}
        {FUNDING_POLICY.banner}
      </p>
      <Card>
        {invoices.length === 0 ? (
          <Empty>No recommendations yet. Extract and match an invoice first.</Empty>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Score</th>
                <th>Advance / reserve</th>
                <th>Flags</th>
                <th>Gate</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => {
                const flags = inv.credit ? (JSON.parse(inv.credit.fraudFlags) as string[]) : [];
                return (
                  <tr key={inv.id}>
                    <td>
                      <Link href={`/verification/${inv.id}`} className="underline">
                        {inv.invoiceNumber}
                      </Link>
                      <div className="text-ink/60">
                        {inv.client.name} · {inv.debtorName} · {money(inv.amountCents)}
                      </div>
                    </td>
                    <td>{inv.credit?.riskScore ?? "—"}</td>
                    <td>
                      {inv.credit
                        ? `${pct(inv.credit.recommendedAdvancePct)} / ${pct(inv.credit.recommendedReservePct)}`
                        : "—"}
                      <div className="text-ink/60">{inv.credit ? `${inv.credit.dilutionBps} bps dilution` : ""}</div>
                    </td>
                    <td className="text-xs">{flags.length ? flags.join(", ") : "none"}</td>
                    <td>
                      <div className="mb-2">
                        <Badge status={inv.credit?.status} />{" "}
                        <Badge status={inv.fundingState} />
                      </div>
                      {inv.fundingState === "PENDING_HITL" ? <HitlButtons invoiceId={inv.id} /> : null}
                      {inv.credit?.decidedBy ? (
                        <div className="mt-1 text-xs text-ink/60">by {inv.credit.decidedBy}</div>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>
    </PageShell>
  );
}
