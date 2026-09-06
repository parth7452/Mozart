import Link from "next/link";
import { founderEmail, SITE_DOMAIN } from "@/lib/site";

export function MarketingFooter() {
  return (
    <footer className="border-t border-hairline bg-ledger text-stone">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="font-serif text-2xl tracking-tight">Mozart</div>
            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-stone/55">
              Invoice factoring · {SITE_DOMAIN}
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-stone/75">
              Working name for a research-stage, AI-native US invoice factoring
              project. Built for staffing owners and CFOs, and for SMB suppliers
              waiting on enterprise or government AP. This is not a music brand.
            </p>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone/50">
              Site
            </div>
            <ul className="mt-3 space-y-2 text-sm text-stone/80">
              <li>
                <Link href="/#thesis" className="hover:text-stone">
                  Thesis
                </Link>
              </li>
              <li>
                <Link href="/#who" className="hover:text-stone">
                  Who it&apos;s for
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-stone">
                  Privacy
                </Link>
              </li>
              <li>
                <a href={`mailto:${founderEmail()}`} className="hover:text-stone">
                  {founderEmail()}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone/50">
              Internal
            </div>
            <ul className="mt-3 space-y-2 text-sm text-stone/80">
              <li>
                <Link href="/desk" className="hover:text-stone">
                  Ops desk
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-stone">
                  Scaffold demo
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-12 max-w-3xl border-t border-stone/15 pt-8 text-xs leading-relaxed text-stone/55">
          Research-stage disclaimer. Mozart is not offering live funding, advances,
          or the purchase of receivables through this website. Nothing here is a
          credit decision, an offer of securities, or a commitment to buy invoices.
          There is no application that funds. If we talk, it is a research call —
          not an underwriting. Do not send invoices or bank credentials through
          this site.
        </p>
      </div>
    </footer>
  );
}
