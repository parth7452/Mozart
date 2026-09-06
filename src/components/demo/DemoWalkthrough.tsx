"use client";

import { useState, type ReactNode } from "react";
import { Badge, Button, Card } from "@/components/ui";
import { money } from "@/lib/format";

type DemoState = {
  policy: { banner: string; liveFundingEnabled: boolean; autoFundEnabled: boolean };
  client: {
    id: string;
    name: string;
    vertical: string;
    accountingConnected: boolean;
    bankConnected: boolean;
    kybStatus: string;
  } | null;
  invoice: {
    id: string;
    invoiceNumber: string;
    debtorName: string;
    amountCents: number;
    status: string;
    fundingState: string;
    documents: { id: string; kind: string; filename: string }[];
    extract: { vertical: string; payload: string } | null;
    match: {
      invoiceToSupport: number;
      invoiceToBooks: number;
      overall: number;
      notes: string;
    } | null;
    confirmation: { status: string; notes: string } | null;
    credit: {
      riskScore: number;
      dilutionBps: number;
      fraudFlags: string;
      recommendedAdvancePct: number;
      recommendedReservePct: number;
      rationale: string;
      status: string;
      decidedBy: string | null;
    } | null;
  } | null;
  smb: { name: string; vertical: string; invoices: { extract: { payload: string } | null }[] } | null;
  steps: {
    seeded: boolean;
    extracted: boolean;
    matched: boolean;
    confirmed: boolean;
    recommended: boolean;
    hitlDone: boolean;
    readyToFund: boolean;
  };
};

export function DemoWalkthrough({ initial }: { initial: DemoState }) {
  const [state, setState] = useState<DemoState>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    const res = await fetch("/api/demo");
    setState(await res.json());
  }

  async function seed() {
    setBusy(true);
    setError(null);
    const res = await fetch("/api/demo", { method: "POST" });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) return setError(json.error);
    setState(json);
  }

  async function step(name: string) {
    setBusy(true);
    setError(null);
    const res = await fetch("/api/demo/step", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step: name }),
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) return setError(json.error);
    await refresh();
  }

  const inv = state.invoice;
  const extract = inv?.extract ? JSON.parse(inv.extract.payload) : null;
  const flags = inv?.credit ? (JSON.parse(inv.credit.fraudFlags) as string[]) : [];

  return (
    <div className="space-y-4">
      <Card className="border-crimson/40">
        <p className="text-sm font-medium text-crimson">{state.policy.banner}</p>
        <p className="mt-1 text-xs text-ink/60">
          liveFunding={String(state.policy.liveFundingEnabled)} · autoFund=
          {String(state.policy.autoFundEnabled)}
        </p>
      </Card>

      <ol className="grid gap-4 md:grid-cols-2">
        <Step n={1} title="Seed synthetic book" done={state.steps.seeded}>
          <p className="mb-3 text-sm text-ink/70">
            Harborline Staffing (timesheet/VMS) plus Northfork Components (PO/delivery).
          </p>
          <Button type="button" onClick={seed} disabled={busy}>
            {state.steps.seeded ? "Re-load seed" : "Seed demo"}
          </Button>
        </Step>

        <Step n={2} title="Fake invoice" done={Boolean(inv)}>
          {inv ? (
            <dl className="space-y-1 text-sm">
              <Row k="Number" v={inv.invoiceNumber} />
              <Row k="Debtor" v={inv.debtorName} />
              <Row k="Amount" v={money(inv.amountCents)} />
              <Row k="Docs" v={inv.documents.map((d) => d.kind).join(", ")} />
            </dl>
          ) : (
            <p className="text-sm text-ink/60">Seed first.</p>
          )}
        </Step>

        <Step n={3} title="Staffing extract" done={state.steps.extracted}>
          <p className="mb-3 text-sm text-ink/70">StaffingExtractSchema — timesheet + VMS.</p>
          <Button type="button" variant="ghost" disabled={busy || !inv} onClick={() => step("extract")}>
            Run extract
          </Button>
          {extract ? (
            <pre className="mt-3 overflow-auto text-xs">{JSON.stringify(extract, null, 2)}</pre>
          ) : null}
        </Step>

        <Step n={4} title="Match + confirm" done={state.steps.matched}>
          <div className="mb-3 flex gap-2">
            <Button type="button" variant="ghost" disabled={busy || !inv} onClick={() => step("match")}>
              Score match
            </Button>
            <Button type="button" variant="ghost" disabled={busy || !inv} onClick={() => step("confirm")}>
              Debtor stub
            </Button>
          </div>
          {inv?.match ? (
            <p className="text-sm">
              Support {inv.match.invoiceToSupport} · Books {inv.match.invoiceToBooks} · Overall{" "}
              {inv.match.overall}
            </p>
          ) : null}
        </Step>

        <Step n={5} title="Shadow credit" done={state.steps.recommended}>
          <Button type="button" variant="ghost" disabled={busy || !inv} onClick={() => step("recommend")}>
            Recommend
          </Button>
          {inv?.credit ? (
            <ul className="mt-3 space-y-1 text-sm">
              <li>Risk {inv.credit.riskScore} · dilution {inv.credit.dilutionBps} bps</li>
              <li>
                Advance {inv.credit.recommendedAdvancePct}% · reserve {inv.credit.recommendedReservePct}%
              </li>
              <li>Flags: {flags.length ? flags.join(", ") : "none"}</li>
              <li className="text-ink/60">{inv.credit.rationale}</li>
            </ul>
          ) : null}
        </Step>

        <Step n={6} title="HITL approve" done={state.steps.hitlDone}>
          <p className="mb-3 text-sm text-ink/70">
            Ready-to-fund is impossible without this gate. Still no payout.
          </p>
          <Button type="button" disabled={busy || !inv} onClick={() => step("approve")}>
            Credit officer approve
          </Button>
          {inv ? (
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <Badge status={inv.credit?.status} />
              <Badge status={inv.fundingState} />
              {inv.credit?.decidedBy ? <span>by {inv.credit.decidedBy}</span> : null}
            </div>
          ) : null}
        </Step>
      </ol>

      <Card>
        <h2 className="mb-2 font-serif text-xl">Outcome</h2>
        <p className="text-sm">
          Ready to fund: <strong>{state.steps.readyToFund ? "yes (state only)" : "no"}</strong>. Live
          funding remains disabled. There is no ACH, no lockbox, and no funded ledger.
        </p>
        <p className="mt-2 text-sm text-ink/60">
          SMB path is seeded as {state.smb?.name ?? "—"}. Run{" "}
          <button className="underline" type="button" onClick={() => step("smb_extract")} disabled={busy}>
            smb extract
          </button>{" "}
          to exercise SmbSupplierExtractSchema.
        </p>
      </Card>
      {error ? <p className="text-sm text-fail">{error}</p> : null}
    </div>
  );
}

function Step({
  n,
  title,
  done,
  children,
}: {
  n: number;
  title: string;
  done: boolean;
  children: ReactNode;
}) {
  return (
    <li>
      <Card>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-serif text-xl">
            <span className="mr-2 text-gold">{n}</span>
            {title}
          </h2>
          <Badge status={done ? "PASS" : "PENDING"}>{done ? "done" : "todo"}</Badge>
        </div>
        {children}
      </Card>
    </li>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink/50">{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}
