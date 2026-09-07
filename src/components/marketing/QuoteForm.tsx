"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  DAYS_TO_PAY,
  PLEDGED_OPTIONS,
  QuoteSchema,
  TERMS_OPTIONS,
  VERTICAL_OPTIONS,
  VOLUME_BANDS,
  type QuoteInput,
} from "@/lib/quote";
import { COPY } from "@/lib/site";
import { BookCta } from "./FounderCta";

const fieldClass =
  "mt-1.5 w-full rounded-sm border border-hairline bg-stone px-3 py-2.5 text-sm text-soot outline-none focus:border-ledger";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="text-[12px] font-medium text-soot/80">{label}</span>
      {children}
    </label>
  );
}

export function QuoteForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<{ channel: string; mailto?: string } | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = new FormData(event.currentTarget);
    const raw = Object.fromEntries(form.entries());
    const parsed = QuoteSchema.safeParse(raw);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please complete every field.");
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data satisfies QuoteInput),
      });
      const json = (await res.json()) as {
        error?: string;
        delivery?: { channel: string; mailto?: string };
      };
      if (!res.ok) {
        setError(json.error ?? "Could not send the request. Try emailing us directly.");
        return;
      }
      const delivery = json.delivery ?? { channel: "mailto" };
      if (delivery.channel === "mailto" && delivery.mailto) {
        window.location.href = delivery.mailto;
      }
      setDone(delivery);
    } catch {
      setError("Could not send the request. Try emailing us directly.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="border border-hairline bg-stone px-6 py-10 sm:px-8">
        <h2 className="font-serif text-2xl tracking-tight">{COPY.quote.successTitle}</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-soot/70">{COPY.quote.success}</p>
        {done.channel === "mailto" ? (
          <p className="mt-4 text-sm leading-relaxed text-soot/55">
            No email provider is configured on this deploy, so your mail app should have opened
            a message to parth@mozart.financial. If it didn&apos;t, use the founder email in the
            footer.
          </p>
        ) : (
          <p className="mt-4 text-sm leading-relaxed text-soot/55">
            Delivered by email to parth@mozart.financial — not a CRM and not a credit decision.
          </p>
        )}
        <div className="mt-8">
          <BookCta>Book a 20-minute call</BookCta>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-hairline bg-stone px-6 py-8 sm:px-8 sm:py-10">
      <p className="text-[15px] leading-relaxed text-soot/70">{COPY.quote.body}</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label="Company" htmlFor="company">
          <input id="company" name="company" required className={fieldClass} autoComplete="organization" />
        </Field>
        <Field label="Vertical" htmlFor="vertical">
          <select id="vertical" name="vertical" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select…
            </option>
            {VERTICAL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Monthly invoice volume" htmlFor="monthlyVolume">
          <select id="monthlyVolume" name="monthlyVolume" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select…
            </option>
            {VOLUME_BANDS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Current terms" htmlFor="currentTerms">
          <select id="currentTerms" name="currentTerms" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select…
            </option>
            {TERMS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Average days-to-pay" htmlFor="avgDaysToPay">
          <select id="avgDaysToPay" name="avgDaysToPay" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select…
            </option>
            {DAYS_TO_PAY.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Already pledged?" htmlFor="pledged">
          <select id="pledged" name="pledged" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select…
            </option>
            {PLEDGED_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Top 3 customers" htmlFor="topCustomers">
            <textarea
              id="topCustomers"
              name="topCustomers"
              required
              rows={3}
              className={fieldClass}
              placeholder="Who owes the invoices you want to discuss?"
            />
          </Field>
        </div>
        <Field label="Work email" htmlFor="email">
          <input id="email" name="email" type="email" required className={fieldClass} autoComplete="email" />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <input id="phone" name="phone" type="tel" required className={fieldClass} autoComplete="tel" />
        </Field>
      </div>
      {error ? <p className="mt-5 text-sm text-fail">{error}</p> : null}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-sm bg-ledger px-5 py-2.5 text-sm font-medium tracking-wide text-stone hover:bg-ledger/90 disabled:opacity-60"
        >
          {pending ? "Sending…" : COPY.quote.submit}
        </button>
        <p className="text-xs leading-relaxed text-soot/50">
          Emailed to parth@mozart.financial. No fake CRM.
        </p>
      </div>
    </form>
  );
}
