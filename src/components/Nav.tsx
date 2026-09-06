import Link from "next/link";
import { getSession } from "@/lib/auth";

const LINKS = [
  { href: "/", label: "Desk" },
  { href: "/demo", label: "Demo" },
  { href: "/onboarding", label: "Onboarding" },
  { href: "/verification", label: "Verification" },
  { href: "/credit", label: "Credit" },
  { href: "/servicing", label: "Servicing" },
];

export function Nav() {
  const session = getSession();
  return (
    <header className="border-b border-rule bg-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl tracking-tight">Mozart</span>
          <span className="text-[11px] uppercase tracking-[0.18em] text-gold">Phase 1</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-ink/80 hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="text-right text-xs text-ink/70">
          <div>{session.name}</div>
          <div className="uppercase tracking-wider">{session.role} · auth stub</div>
        </div>
      </div>
    </header>
  );
}
