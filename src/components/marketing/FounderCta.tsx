import { founderCtaHref, founderCtaLabel, founderEmail } from "@/lib/site";

type Variant = "primary" | "ghost" | "brass";

const styles: Record<Variant, string> = {
  primary:
    "bg-ledger text-stone hover:bg-ledger/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ledger",
  ghost:
    "border border-soot/20 bg-transparent text-soot hover:border-soot/40 hover:bg-soot/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soot",
  brass:
    "bg-brass text-stone hover:bg-brass/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
};

export function FounderCta({
  variant = "primary",
  className = "",
  children,
}: {
  variant?: Variant;
  className?: string;
  children?: string;
}) {
  return (
    <a
      href={founderCtaHref()}
      className={`inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-sm font-medium tracking-wide ${styles[variant]} ${className}`}
    >
      {children ?? founderCtaLabel()}
    </a>
  );
}

/** Hero / section CTA: one button, no email sitting next to it. */
export function FounderCtaBlock({
  className = "",
  note,
  children,
}: {
  className?: string;
  note?: string;
  children?: string;
}) {
  return (
    <div className={`flex flex-col items-start gap-3 ${className}`}>
      <FounderCta>{children ?? "Talk to the founder"}</FounderCta>
      {note ? <p className="text-sm leading-relaxed text-soot/55">{note}</p> : null}
    </div>
  );
}

export function founderEmailCtaLabel(): string {
  return `Email Parth — ${founderEmail()}`;
}
