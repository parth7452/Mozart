import { PageShell } from "@/components/ui";
import { DemoWalkthrough } from "@/components/demo/DemoWalkthrough";
import { demoState } from "@/server/demo";

export const dynamic = "force-dynamic";

export default async function DemoPage() {
  const initial = await demoState();
  return (
    <PageShell title="Demo walkthrough" kicker="Fake invoice → extract → HITL">
      <DemoWalkthrough initial={JSON.parse(JSON.stringify(initial))} />
    </PageShell>
  );
}
