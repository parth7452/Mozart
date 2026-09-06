"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Card } from "@/components/ui";

const ADAPTERS = [
  { kind: "PLAID", label: "Plaid (bank)" },
  { kind: "QBO", label: "QuickBooks" },
  { kind: "XERO", label: "Xero" },
  { kind: "NETSUITE", label: "NetSuite" },
  { kind: "KYB_AML", label: "KYB / AML" },
] as const;

export function AdapterPanel({ clientId }: { clientId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function run(kind: string) {
    setBusy(kind);
    setMsg(null);
    const res = await fetch(`/api/clients/${clientId}/adapters/${kind}`, { method: "POST" });
    const json = await res.json();
    setBusy(null);
    setMsg(json.result?.summary ?? json.error ?? "Done");
    router.refresh();
  }

  return (
    <Card>
      <h2 className="mb-2 font-semibold text-xl">Mock adapters</h2>
      <p className="mb-3 text-sm text-ink/60">
        Interface seams only. No live vendor calls, no KYB spend.
      </p>
      <div className="flex flex-wrap gap-2">
        {ADAPTERS.map((a) => (
          <Button key={a.kind} type="button" variant="ghost" disabled={busy === a.kind} onClick={() => run(a.kind)}>
            {a.label}
          </Button>
        ))}
      </div>
      {msg ? <p className="mt-3 text-sm text-ink/70">{msg}</p> : null}
    </Card>
  );
}
