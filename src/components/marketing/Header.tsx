"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { COPY } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { QuoteCta } from "./FounderCta";

const LINKS = [
  { href: "/#how", label: COPY.nav.how },
  { href: "/#who", label: COPY.nav.who },
  { href: "/#costs", label: COPY.nav.costs },
];

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
            M
          </span>
          <span className="text-base font-semibold tracking-tight">Mozart</span>
          <span className="hidden text-sm text-muted-foreground sm:inline">Invoice factoring</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <QuoteCta size="sm" className="hidden md:inline-flex">
            {COPY.nav.quote}
          </QuoteCta>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Mozart</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1">
                {LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <Separator className="my-6" />
              <QuoteCta className="w-full">{COPY.nav.quote}</QuoteCta>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
