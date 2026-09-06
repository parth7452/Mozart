import Link from "next/link";
import { COPY, founderEmail, SITE_DOMAIN } from "@/lib/site";

export function MarketingFooter() {
  return (
    <footer className="border-t border-hairline bg-ledger text-stone">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="font-serif text-2xl tracking-tight">Mozart</div>
            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-stone/55">
              Invoice factoring · {SITE_DOMAIN}
            </p>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone/50">
              Site
            </div>
            <ul className="mt-3 space-y-2 text-sm text-stone/80">
              <li>
                <Link href="/#how" className="hover:text-stone">
                  {COPY.nav.how}
                </Link>
              </li>
              <li>
                <Link href="/#who" className="hover:text-stone">
                  {COPY.nav.who}
                </Link>
              </li>
              <li>
                <Link href="/thesis" className="hover:text-stone">
                  Thesis
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
        <p className="mt-14 max-w-2xl border-t border-stone/15 pt-8 text-xs leading-relaxed text-stone/55">
          {COPY.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
