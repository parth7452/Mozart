import Link from "next/link";
import { COPY } from "@/lib/site";
import { QuoteCta } from "./FounderCta";

const LINKS = [
  { href: "/#how", label: COPY.nav.how },
  { href: "/#who", label: COPY.nav.who },
  { href: "/#costs", label: COPY.nav.costs },
];

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-hairline/80 bg-stone/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Link href="/" className="flex items-baseline gap-2.5">
          <span className="font-serif text-xl tracking-tight text-soot sm:text-2xl">Mozart</span>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-soot/50 sm:inline">
            Invoice factoring
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] text-soot/75 md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-soot">
              {l.label}
            </Link>
          ))}
        </nav>
        <QuoteCta className="!px-3.5 !py-1.5 text-[13px]">{COPY.nav.quote}</QuoteCta>
      </div>
      <nav className="flex gap-5 overflow-x-auto border-t border-hairline/70 px-5 py-2 text-[12px] text-soot/70 md:hidden">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="whitespace-nowrap hover:text-soot">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
