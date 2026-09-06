import { notFound } from "next/navigation";
import { Badge, Card, PageShell } from "@/components/ui";
import { InvoiceActions } from "@/components/forms/InvoiceActions";
import { money } from "@/lib/format";
import { findDuplicates, getInvoice } from "@/server/invoices";
import { extractSchemaName } from "@/domain/extract";
import { assertVertical } from "@/domain/verticals";

export const dynamic = "force-dynamic";

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoice = await getInvoice(id);
  if (!invoice) notFound();
  const vertical = assertVertical(invoice.client.vertical);
  const dups = await findDuplicates({
    clientId: invoice.clientId,
    invoiceNumber: invoice.invoiceNumber,
    debtorName: invoice.debtorName,
    amountCents: invoice.amountCents,
    excludeId: invoice.id,
  });
  const payload = invoice.extract ? JSON.parse(invoice.extract.payload) : null;

  return (
    <PageShell title={invoice.invoiceNumber} kicker="Verification">
      <p className="mb-4 text-sm text-ink/70">
        {invoice.client.name} → {invoice.debtorName} · {money(invoice.amountCents)} ·{" "}
        <Badge status={invoice.status} /> <Badge status={invoice.fundingState} />
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="mb-2 font-semibold text-xl">Support docs (stub ingest)</h2>
          <ul className="space-y-1 text-sm">
            {invoice.documents.map((d) => (
              <li key={d.id}>
                <Badge>{d.kind}</Badge> {d.filename}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="mb-2 font-semibold text-xl">Duplicate check</h2>
          {dups.length === 0 ? (
            <p className="text-sm text-ink/70">No duplicates across the book.</p>
          ) : (
            <ul className="text-sm">
              {dups.map((d) => (
                <li key={d.id}>
                  {d.invoiceNumber} / {d.debtorName} / {money(d.amountCents)}
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card>
          <h2 className="mb-2 font-semibold text-xl">
            Extract · {extractSchemaName(vertical)}
          </h2>
          {payload ? (
            <pre className="overflow-auto text-xs leading-5">{JSON.stringify(payload, null, 2)}</pre>
          ) : (
            <p className="text-sm text-ink/60">Not extracted yet.</p>
          )}
        </Card>
        <Card>
          <h2 className="mb-2 font-semibold text-xl">Match scores</h2>
          {invoice.match ? (
            <ul className="text-sm">
              <li>Invoice ↔ support: {invoice.match.invoiceToSupport}</li>
              <li>Invoice ↔ books: {invoice.match.invoiceToBooks}</li>
              <li>Overall: {invoice.match.overall}</li>
              <li className="mt-2 text-ink/60">{invoice.match.notes}</li>
            </ul>
          ) : (
            <p className="text-sm text-ink/60">Not matched yet.</p>
          )}
          {invoice.confirmation ? (
            <p className="mt-3 text-sm">
              Debtor confirm: <Badge status={invoice.confirmation.status} /> {invoice.confirmation.stubContact}
            </p>
          ) : null}
        </Card>
        <InvoiceActions invoiceId={invoice.id} />
      </div>
    </PageShell>
  );
}
