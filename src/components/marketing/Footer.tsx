import Link from "next/link";
import { COPY, founderEmail, founderMailto, SITE_DOMAIN } from "@/lib/site";
import { Separator } from "@/components/ui/separator";
import { MozartWordmark } from "./Logo";

export function MarketingFooter() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="min-w-0">
            <MozartWordmark inverse />
            <p className="mt-3 text-sm text-primary-foreground/70">
              Invoice factoring · {SITE_DOMAIN}
            </p>
          </div>
          <div>
            <div className="text-sm font-medium">Site</div>
            <ul className="mt-3 space-y-2.5 text-sm text-primary-foreground/80">
              <li>
                <Link href="/#how" className="hover:text-primary-foreground">
                  {COPY.nav.how}
                </Link>
              </li>
              <li>
                <Link href="/#who" className="hover:text-primary-foreground">
                  {COPY.nav.who}
                </Link>
              </li>
              <li>
                <Link href="/#costs" className="hover:text-primary-foreground">
                  {COPY.nav.costs}
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-primary-foreground">
                  {COPY.nav.quote}
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-primary-foreground">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary-foreground">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium">Contact</div>
            <ul className="mt-3 space-y-2.5 text-sm text-primary-foreground/80">
              <li>
                <a href={founderMailto("Mozart — founder")} className="hover:text-primary-foreground">
                  {COPY.nav.founder}
                </a>
              </li>
              <li className="break-all">
                <a href={`mailto:${founderEmail()}`} className="hover:text-primary-foreground">
                  {founderEmail()}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="mt-10 bg-primary-foreground/15" />
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-primary-foreground/60">
          {COPY.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
