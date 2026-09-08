import Link from "next/link";
import { COPY, founderEmail, founderMailto, SITE_DOMAIN } from "@/lib/site";
import { Separator } from "@/components/ui/separator";

export function MarketingFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
                M
              </span>
              <span className="text-base font-semibold tracking-tight">Mozart</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Invoice factoring · {SITE_DOMAIN}
            </p>
          </div>
          <div>
            <div className="text-sm font-medium">Site</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#how" className="hover:text-foreground">
                  {COPY.nav.how}
                </Link>
              </li>
              <li>
                <Link href="/#who" className="hover:text-foreground">
                  {COPY.nav.who}
                </Link>
              </li>
              <li>
                <Link href="/#costs" className="hover:text-foreground">
                  {COPY.nav.costs}
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-foreground">
                  {COPY.nav.quote}
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-foreground">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-medium">Contact</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={founderMailto("Mozart — founder")} className="hover:text-foreground">
                  {COPY.nav.founder}
                </a>
              </li>
              <li>
                <a href={`mailto:${founderEmail()}`} className="hover:text-foreground">
                  {founderEmail()}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="mt-12" />
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          {COPY.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
