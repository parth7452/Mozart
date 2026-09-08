import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/format";

export function PageShell({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        {kicker ? (
          <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-600">{kicker}</div>
        ) : null}
        <h1 className="font-semibold text-3xl tracking-tight">{title}</h1>
      </div>
      {children}
    </div>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-lg border border-rule bg-cream p-5 shadow-sm", className)}>
      {children}
    </section>
  );
}

export function Badge({
  status,
  children,
}: {
  status?: string;
  children?: ReactNode;
}) {
  const tone =
    status === "PASS" ||
    status === "APPROVED" ||
    status === "READY_TO_FUND" ||
    status === "CONFIRMED" ||
    status === "PERFECTED"
      ? "bg-pass/10 text-pass"
      : status === "REVIEW" ||
          status === "PENDING_HITL" ||
          status === "SHADOW" ||
          status === "DRAFTED" ||
          status === "QUEUED"
        ? "bg-review/10 text-review"
        : status === "FAIL" ||
            status === "REJECTED" ||
            status === "BLOCKED" ||
            status === "DUPLICATE" ||
            status === "DISPUTED"
          ? "bg-fail/10 text-fail"
          : "bg-ink/5 text-ink/70";

  return (
    <span className={cn("inline-block rounded-full px-2 py-0.5 text-[11px] font-medium", tone)}>
      {children ?? status}
    </span>
  );
}

export function Button({
  children,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  const styles =
    variant === "danger"
      ? "bg-crimson text-cream hover:opacity-90"
      : variant === "ghost"
        ? "border border-rule bg-transparent hover:bg-paper"
        : "bg-ink text-cream hover:bg-ink/90";
  return (
    <button
      {...props}
      className={cn(
        "rounded-md px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50",
        styles,
        props.className,
      )}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-[11px] uppercase tracking-wider text-ink/60">{label}</span>
      {children}
    </label>
  );
}

export function inputClass() {
  return "w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm outline-none focus:border-ink";
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="text-sm text-ink/60">{children}</p>;
}
