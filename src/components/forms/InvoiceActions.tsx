"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Card } from "@/components/ui";

export function InvoiceActions({ invoiceId }: { invoiceId: string }) {
  const router = useRouter();
  const [msg, setMsg] = useState<string | null>(null);

  async function post(path: string) {
    const res = await fetch(path, { method: "POST" });
    const json = await res.json();
    setMsg(json.error ?? "Updated");
    router.refresh();
  }

  return (
    <Card>
      <h2 className="mb-2 font-semibold text-xl">Pipeline</h2>
      <p className="mb-3 text-sm text-ink/60">
        Dual-path extract → match → debtor confirm stub. Credit is a separate human-gated step.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="ghost" onClick={() => post(`/api/invoices/${invoiceId}/extract`)}>
          Extract
        </Button>
        <Button type="button" variant="ghost" onClick={() => post(`/api/invoices/${invoiceId}/match`)}>
          Match
        </Button>
        <Button type="button" variant="ghost" onClick={() => post(`/api/invoices/${invoiceId}/confirm`)}>
          Debtor confirm stub
        </Button>
        <Button type="button" onClick={() => post(`/api/credit/${invoiceId}/recommend`)}>
          Shadow credit
        </Button>
      </div>
      {msg ? <p className="mt-3 text-sm text-ink/70">{msg}</p> : null}
    </Card>
  );
}
