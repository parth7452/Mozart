import Link from "next/link";
import { Badge, Card, Empty, PageShell } from "@/components/ui";
import { CreateClientForm } from "@/components/forms/CreateClientForm";
import { clientFundPath, listClients } from "@/server/clients";
import { VERTICAL_LABEL, type Vertical } from "@/domain/verticals";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const clients = await listClients();
  return (
    <PageShell title="Onboarding" kicker="Clients">
      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        <Card>
          {clients.length === 0 ? (
            <Empty>No clients yet. Create one or run the demo seed.</Empty>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Vertical</th>
                  <th>Onboarding</th>
                  <th>KYB</th>
                  <th>Fund path</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => {
                  const path = clientFundPath(c);
                  return (
                    <tr key={c.id}>
                      <td>
                        <Link href={`/onboarding/${c.id}`} className="underline">
                          {c.name}
                        </Link>
                      </td>
                      <td>{VERTICAL_LABEL[c.vertical as Vertical] ?? c.vertical}</td>
                      <td>
                        <Badge status={c.onboardingStatus} />
                      </td>
                      <td>
                        <Badge status={c.kybStatus} />
                      </td>
                      <td>{path.wouldOpen ? "Would open" : "Blocked"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Card>
        <CreateClientForm />
      </div>
    </PageShell>
  );
}
