import { calUrl, founderCtaHref, founderCtaLabel, founderEmail, founderMailto } from "@/lib/site";

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

export function FounderCtaPair({ className = "" }: { className?: string }) {
  const cal = calUrl();
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-center ${className}`}>
      <FounderCta>{cal ? "Book a research call" : "Talk to the founder"}</FounderCta>
      {cal ? (
        <a
          href={founderMailto()}
          className="text-sm text-soot/70 underline decoration-hairline underline-offset-4 hover:text-soot"
        >
          Or email {founderEmail()}
        </a>
      ) : (
        <a
          href={founderMailto()}
          className="text-sm text-soot/70 underline decoration-hairline underline-offset-4 hover:text-soot"
        >
          {founderEmail()}
        </a>
      )}
    </div>
  );
}
