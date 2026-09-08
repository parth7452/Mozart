"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { COPY } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { QuoteCta } from "./FounderCta";
import { MozartMark, MozartWordmark } from "./Logo";

const LINKS = [
  { href: "/#how", label: COPY.nav.how },
  { href: "/#who", label: COPY.nav.who },
  { href: "/#costs", label: COPY.nav.costs },
];

export function MarketingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link href="/" className="min-w-0" onClick={() => setOpen(false)}>
          <MozartWordmark />
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <QuoteCta size="sm" className="hidden md:inline-flex">
            {COPY.nav.quote}
          </QuoteCta>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10 md:hidden" aria-label="Open menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[85vw] max-w-sm flex-col gap-0 p-6">
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center gap-2.5 font-serif text-xl font-normal tracking-tight">
                  <MozartMark className="h-7 w-7" />
                  Mozart
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1">
                {LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-3 text-base text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <Separator className="my-6" />
              <QuoteCta className="w-full" onNavigate={() => setOpen(false)}>
                {COPY.nav.quote}
              </QuoteCta>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
