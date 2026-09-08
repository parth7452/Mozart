import { cn } from "@/lib/utils";

const MARK_PATH =
  "M9.25 23V9.5h3.05L16 17.35 19.7 9.5h3.05V23h-2.55v-9.15L16.55 21.9h-1.1L11.8 13.85V23H9.25Z";

/** Ledger-green square with a geometric M — used in nav, footer, and favicon. */
export function MozartMark({
  className,
  title,
  inverse = false,
}: {
  className?: string;
  title?: string;
  inverse?: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className={cn("h-8 w-8 shrink-0", className)}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <rect width="32" height="32" rx="6" fill={inverse ? "#F3EEE4" : "#1A3C32"} />
      <path d={MARK_PATH} fill={inverse ? "#1A3C32" : "#F3EEE4"} />
    </svg>
  );
}

export function MozartWordmark({
  className,
  inverse = false,
}: {
  className?: string;
  inverse?: boolean;
}) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <MozartMark inverse={inverse} />
      <span className="truncate font-serif text-xl leading-none tracking-tight">Mozart</span>
    </span>
  );
}
