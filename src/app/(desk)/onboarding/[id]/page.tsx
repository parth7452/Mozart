import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Card, PageShell } from "@/components/desk-ui";
import { AdapterPanel } from "@/components/forms/AdapterPanel";
import { OnboardingDecide } from "@/components/forms/OnboardingDecide";
import { clientFundPath, getClient } from "@/server/clients";
import { VERTICAL_LABEL, type Vertical } from "@/domain/verticals";

export const dynamic = "force-dynamic";

export default async function ClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClient(id);
  if (!client) notFound();
  const path = clientFundPath(client);

  return (
    <PageShell title={client.name} kicker="Onboarding">
      <div className="mb-4 text-sm text-ink/70">
        {client.legalName} · {VERTICAL_LABEL[client.vertical as Vertical]} ·{" "}
        <Badge status={client.onboardingStatus} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="mb-2 font-semibold text-xl">Selection filter</h2>
          <p className="mb-3 text-sm text-ink/70">
            Accounting (QBO / Xero / NetSuite) + bank (Plaid) must both connect before a fund
            path can open. Live funding stays off.
          </p>
          <ul className="space-y-1 text-sm">
            <li>Accounting: {client.accountingProvider ?? "—"} {client.accountingConnected ? "connected" : "not connected"}</li>
            <li>Bank (Plaid): {client.bankConnected ? "connected" : "not connected"}</li>
            <li>KYB: <Badge status={client.kybStatus} /></li>
            <li>Fund path: {path.wouldOpen ? "would open" : "closed"}</li>
          </ul>
          <p className="mt-3 text-sm text-ink/60">{path.reason}</p>
        </Card>
        <AdapterPanel clientId={client.id} />
        <OnboardingDecide clientId={client.id} current={client.onboardingStatus} />
        <Card>
          <h2 className="mb-2 font-semibold text-xl">Adapter runs</h2>
          {client.adapterRuns.length === 0 ? (
            <p className="text-sm text-ink/60">No mock adapters run yet.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {client.adapterRuns.map((r) => (
                <li key={r.id}>
                  <Badge status={r.status} /> <span className="font-medium">{r.kind}</span> — {r.summary}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-sm">
            <Link href="/verification" className="underline">
              Invoices →
            </Link>
          </p>
        </Card>
      </div>
    </PageShell>
  );
}
