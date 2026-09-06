import { Badge, Card, Empty, PageShell } from "@/components/ui";
import { CashAppForm } from "@/components/forms/CashAppForm";
import { CollectionAdvance } from "@/components/forms/CollectionAdvance";
import { Ucc1Advance } from "@/components/forms/Ucc1Advance";
import { money } from "@/lib/format";
import { getServicingSnapshot } from "@/server/servicing";

export const dynamic = "force-dynamic";

export default async function ServicingPage() {
  const snap = await getServicingSnapshot();
  return (
    <PageShell title="Servicing" kicker="Post-decision stubs">
      <p className="mb-4 text-sm text-ink/70">
        Reserve ledger, cash application, collection cadence, and UCC-1 are stubs. No ACH, lockbox,
        or Secretary of State filing.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="mb-2 font-serif text-xl">Reserves</h2>
          {snap.reserves.length === 0 ? (
            <Empty>No reserve accounts.</Empty>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Held</th>
                  <th>Released</th>
                  <th>Target</th>
                </tr>
              </thead>
              <tbody>
                {snap.reserves.map((r) => (
                  <tr key={r.id}>
                    <td>{r.client.name}</td>
                    <td>{money(r.heldCents)}</td>
                    <td>{money(r.releasedCents)}</td>
                    <td>{r.targetReservePct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
        <CashAppForm invoices={snap.invoices.map((i) => ({ id: i.id, label: `${i.invoiceNumber} · ${i.client.name}` }))} />
        <Card>
          <h2 className="mb-2 font-serif text-xl">Cash applications</h2>
          {snap.cashApps.length === 0 ? (
            <Empty>None. Stub only.</Empty>
          ) : (
            <ul className="space-y-1 text-sm">
              {snap.cashApps.map((c) => (
                <li key={c.id}>
                  {c.invoice.invoiceNumber} · {money(c.amountCents)} · {c.source}
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card>
          <h2 className="mb-2 font-serif text-xl">Collection cadence</h2>
          {snap.collections.length === 0 ? (
            <Empty>Queue empty. Approve an invoice in credit to enqueue DAY_0–DAY_45.</Empty>
          ) : (
            <ul className="space-y-2 text-sm">
              {snap.collections.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-2">
                  <span>
                    {c.invoice.invoiceNumber} · {c.cadence} · <Badge status={c.status} />
                  </span>
                  <CollectionAdvance id={c.id} />
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="md:col-span-2">
          <h2 className="mb-2 font-serif text-xl">UCC-1 filings</h2>
          {snap.filings.length === 0 ? (
            <Empty>No filings.</Empty>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Jurisdiction</th>
                  <th>Status</th>
                  <th>Advance</th>
                </tr>
              </thead>
              <tbody>
                {snap.filings.map((f) => (
                  <tr key={f.id}>
                    <td>{f.client.name}</td>
                    <td>{f.jurisdiction}</td>
                    <td>
                      <Badge status={f.status} />
                    </td>
                    <td>
                      <Ucc1Advance clientId={f.clientId} current={f.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </PageShell>
  );
}
