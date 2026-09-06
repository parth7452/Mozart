import Link from "next/link";
import { Badge, Card, Empty, PageShell } from "@/components/ui";
import { CreateInvoiceForm } from "@/components/forms/CreateInvoiceForm";
import { money } from "@/lib/format";
import { listClients } from "@/server/clients";
import { listInvoices } from "@/server/invoices";

export const dynamic = "force-dynamic";

export default async function VerificationPage() {
  const [invoices, clients] = await Promise.all([listInvoices(), listClients()]);
  return (
    <PageShell title="Verification" kicker="Invoices">
      <div className="grid gap-6 md:grid-cols-[1fr_340px]">
        <Card>
          {invoices.length === 0 ? (
            <Empty>No invoices on book. Ingest one or seed the demo.</Empty>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Client / debtor</th>
                  <th>Amount</th>
                  <th>Extract</th>
                  <th>Funding</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td>
                      <Link href={`/verification/${inv.id}`} className="underline">
                        {inv.invoiceNumber}
                      </Link>
                      {inv.isDuplicate ? (
                        <div className="mt-1">
                          <Badge status="DUPLICATE" />
                        </div>
                      ) : null}
                    </td>
                    <td>
                      <div>{inv.client.name}</div>
                      <div className="text-ink/60">{inv.debtorName}</div>
                    </td>
                    <td>{money(inv.amountCents)}</td>
                    <td>
                      <Badge status={inv.status} />
                    </td>
                    <td>
                      <Badge status={inv.fundingState} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
        <CreateInvoiceForm clients={clients.map((c) => ({ id: c.id, name: c.name, vertical: c.vertical }))} />
      </div>
    </PageShell>
  );
}
