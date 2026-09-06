export function money(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function pct(n: number): string {
  return `${n}%`;
}

export function bps(n: number): string {
  return `${n} bps`;
}

export function isoDate(d: Date | string): string {
  return new Date(d).toISOString().slice(0, 10);
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
