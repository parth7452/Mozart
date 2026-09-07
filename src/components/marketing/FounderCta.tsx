import Link from "next/link";
import { bookCallHref, quoteHref } from "@/lib/site";

type Variant = "primary" | "ghost" | "brass";

const styles: Record<Variant, string> = {
  primary:
    "bg-ledger text-stone hover:bg-ledger/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ledger",
  ghost:
    "border border-soot/20 bg-transparent text-soot hover:border-soot/40 hover:bg-soot/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soot",
  brass:
    "bg-brass text-stone hover:bg-brass/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
};

const base =
  "inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-sm font-medium tracking-wide";

export function QuoteCta({
  variant = "primary",
  className = "",
  children,
}: {
  variant?: Variant;
  className?: string;
  children?: string;
}) {
  return (
    <Link href={quoteHref()} className={`${base} ${styles[variant]} ${className}`}>
      {children ?? "Get a quote"}
    </Link>
  );
}

export function BookCta({
  variant = "ghost",
  className = "",
  children,
}: {
  variant?: Variant;
  className?: string;
  children?: string;
}) {
  return (
    <a
      href={bookCallHref()}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children ?? "Book a 20-minute call"}
    </a>
  );
}

/** Hero CTA row: quote + book, then a one-line disclosure. */
export function HeroCtaBlock({
  className = "",
  note,
  primary,
  secondary,
}: {
  className?: string;
  note?: string;
  primary?: string;
  secondary?: string;
}) {
  return (
    <div className={`flex flex-col items-start gap-4 ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <QuoteCta>{primary ?? "Get a quote"}</QuoteCta>
        <BookCta>{secondary ?? "Book a 20-minute call"}</BookCta>
      </div>
      {note ? <p className="max-w-xl text-sm leading-relaxed text-soot/55">{note}</p> : null}
    </div>
  );
}

export function ClosingCtas({
  primary,
  secondary,
}: {
  primary?: string;
  secondary?: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <QuoteCta variant="brass">{primary ?? "Get a quote"}</QuoteCta>
      <BookCta
        variant="ghost"
        className="border-stone/30 text-stone hover:border-stone/50 hover:bg-stone/5"
      >
        {secondary ?? "Book 20 minutes"}
      </BookCta>
    </div>
  );
}
