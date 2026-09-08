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
import { COPY, founderEmail } from "@/lib/site";
import { BookCta } from "./FounderCta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const selectClass =
  "flex h-11 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
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
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{COPY.quote.successTitle}</CardTitle>
          <CardDescription className="text-[0.9375rem] leading-relaxed">{COPY.quote.success}</CardDescription>
        </CardHeader>
        <CardContent>
          {done.channel === "mailto" ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              No email provider is configured on this deploy, so your mail app should have opened a
              message to {founderEmail()}. If it didn&apos;t, use the contact email in the footer.
            </p>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Delivered by email to {founderEmail()} — not a CRM and not a credit decision.
            </p>
          )}
        </CardContent>
        <CardFooter>
          <BookCta>Book a 20-minute call</BookCta>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="min-w-0 overflow-hidden">
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardDescription className="text-[0.9375rem] leading-relaxed">{COPY.quote.body}</CardDescription>
        </CardHeader>
        <CardContent className="grid min-w-0 gap-5 sm:grid-cols-2">
          <Field label="Company" htmlFor="company">
            <Input id="company" name="company" required autoComplete="organization" />
          </Field>
          <Field label="Vertical" htmlFor="vertical">
            <select id="vertical" name="vertical" required defaultValue="" className={selectClass}>
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
            <select
              id="monthlyVolume"
              name="monthlyVolume"
              required
              defaultValue=""
              className={selectClass}
            >
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
            <select
              id="currentTerms"
              name="currentTerms"
              required
              defaultValue=""
              className={selectClass}
            >
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
            <select
              id="avgDaysToPay"
              name="avgDaysToPay"
              required
              defaultValue=""
              className={selectClass}
            >
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
            <select id="pledged" name="pledged" required defaultValue="" className={selectClass}>
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
          <Field label="Top 3 customers" htmlFor="topCustomers" className="sm:col-span-2">
            <Textarea
              id="topCustomers"
              name="topCustomers"
              required
              rows={3}
              placeholder="Who owes the invoices you want to discuss?"
            />
          </Field>
          <Field label="Work email" htmlFor="email">
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </Field>
          <Field label="Phone" htmlFor="phone">
            <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
          </Field>
        </CardContent>
        <CardFooter className="flex-col items-start gap-3">
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
            <Button type="submit" disabled={pending} className="h-11 w-full sm:w-auto">
              {pending ? "Sending…" : COPY.quote.submit}
            </Button>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Emailed to {founderEmail()}. No fake CRM.
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
