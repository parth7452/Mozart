"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button, Card, Field, inputClass } from "@/components/desk-ui";

export function CashAppForm({ invoices }: { invoices: { id: string; label: string }[] }) {
  const router = useRouter();
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/servicing/cash-app", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        invoiceId: fd.get("invoiceId"),
        amountCents: Math.round(Number(fd.get("amount")) * 100),
        note: "UI stub",
      }),
    });
    const json = await res.json();
    setMsg(json.error ?? `Stub applied. liveMoneyMoved=${String(json.liveMoneyMoved)}`);
    router.refresh();
  }

  return (
    <Card>
      <h2 className="mb-2 font-semibold text-xl">Cash-app stub</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <Field label="Invoice">
          <select className={inputClass()} name="invoiceId" required>
            {invoices.map((i) => (
              <option key={i.id} value={i.id}>
                {i.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Amount (USD)">
          <input className={inputClass()} name="amount" type="number" step="0.01" required />
        </Field>
        <Button type="submit" disabled={invoices.length === 0}>
          Apply (no ACH)
        </Button>
        {msg ? <p className="text-sm text-ink/70">{msg}</p> : null}
      </form>
    </Card>
  );
}
