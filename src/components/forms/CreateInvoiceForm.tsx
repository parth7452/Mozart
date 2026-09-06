"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button, Card, Field, inputClass } from "@/components/ui";

export function CreateInvoiceForm({
  clients,
}: {
  clients: { id: string; name: string; vertical: string }[];
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setPending(true);
    setError(null);
    const dollars = Number(fd.get("amount"));
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: fd.get("clientId"),
        invoiceNumber: fd.get("invoiceNumber"),
        debtorName: fd.get("debtorName"),
        amountCents: Math.round(dollars * 100),
        issueDate: fd.get("issueDate"),
        dueDate: fd.get("dueDate"),
      }),
    });
    const json = await res.json();
    setPending(false);
    if (!res.ok) {
      setError(json.error ?? "Failed");
      return;
    }
    const invoiceId = json.invoice?.id as string;
    const kinds = String(fd.get("docs") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const kind of kinds) {
      await fetch(`/api/invoices/${invoiceId}/documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, filename: `${kind.toLowerCase()}-stub.pdf` }),
      });
    }
    router.push(`/verification/${invoiceId}`);
    router.refresh();
  }

  return (
    <Card>
      <h2 className="mb-3 font-serif text-xl">Ingest invoice</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <Field label="Client">
          <select className={inputClass()} name="clientId" required>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.vertical})
              </option>
            ))}
          </select>
        </Field>
        <Field label="Invoice #">
          <input className={inputClass()} name="invoiceNumber" required />
        </Field>
        <Field label="Debtor">
          <input className={inputClass()} name="debtorName" required />
        </Field>
        <Field label="Amount (USD)">
          <input className={inputClass()} name="amount" type="number" step="0.01" required />
        </Field>
        <Field label="Issue">
          <input className={inputClass()} name="issueDate" type="date" required />
        </Field>
        <Field label="Due">
          <input className={inputClass()} name="dueDate" type="date" required />
        </Field>
        <Field label="Support kinds">
          <input
            className={inputClass()}
            name="docs"
            placeholder="INVOICE,TIMESHEET,VMS or INVOICE,PO,DELIVERY"
          />
        </Field>
        {error ? <p className="text-sm text-fail">{error}</p> : null}
        <Button type="submit" disabled={pending || clients.length === 0}>
          {pending ? "Ingesting…" : "Ingest"}
        </Button>
      </form>
    </Card>
  );
}
