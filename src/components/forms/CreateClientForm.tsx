"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button, Card, Field, inputClass } from "@/components/ui";

export function CreateClientForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        legalName: fd.get("legalName") || undefined,
        vertical: fd.get("vertical"),
      }),
    });
    const json = await res.json();
    setPending(false);
    if (!res.ok) {
      setError(json.error ?? "Failed");
      return;
    }
    router.push(`/onboarding/${json.client.id}`);
    router.refresh();
  }

  return (
    <Card>
      <h2 className="mb-3 font-serif text-xl">New client</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <Field label="Name">
          <input className={inputClass()} name="name" required placeholder="Harborline Staffing LLC" />
        </Field>
        <Field label="Legal name">
          <input className={inputClass()} name="legalName" placeholder="Same as name if blank" />
        </Field>
        <Field label="Vertical">
          <select className={inputClass()} name="vertical" defaultValue="staffing">
            <option value="staffing">staffing</option>
            <option value="smb_supplier">smb_supplier</option>
          </select>
        </Field>
        {error ? <p className="text-sm text-fail">{error}</p> : null}
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create client"}
        </Button>
      </form>
    </Card>
  );
}
