import Link from "next/link";
import { Button, type ButtonProps } from "@/components/ui/button";
import { bookCallHref, quoteHref } from "@/lib/site";
import { cn } from "@/lib/utils";

const mobileCta = "h-11 w-full min-h-11 px-5 sm:w-auto";

export function QuoteCta({
  variant = "default",
  size = "lg",
  className = "",
  children,
  onNavigate,
}: {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  children?: string;
  onNavigate?: () => void;
}) {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn(size !== "sm" && mobileCta, className)}
    >
      <Link href={quoteHref()} onClick={onNavigate}>
        {children ?? "Get a quote"}
      </Link>
    </Button>
  );
}

export function BookCta({
  variant = "outline",
  size = "lg",
  className = "",
  children,
}: {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  children?: string;
}) {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn(mobileCta, "h-auto min-h-11 whitespace-normal py-2.5 text-center", className)}
    >
      <a href={bookCallHref()} target="_blank" rel="noreferrer">
        {children ?? "Book a 20-minute call"}
      </a>
    </Button>
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
    <div className={cn("flex w-full flex-col items-stretch gap-4 sm:items-start", className)}>
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
        <QuoteCta>{primary ?? "Get a quote"}</QuoteCta>
        <BookCta>{secondary ?? "Book a 20-minute call"}</BookCta>
      </div>
      {note ? <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">{note}</p> : null}
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
    <div className="flex w-full flex-col gap-3 sm:flex-row">
      <QuoteCta variant="secondary">{primary ?? "Get a quote"}</QuoteCta>
      <BookCta
        variant="outline"
        className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
      >
        {secondary ?? "Book 20 minutes"}
      </BookCta>
    </div>
  );
}
