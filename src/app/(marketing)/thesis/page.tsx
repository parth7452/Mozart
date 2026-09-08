import type { Metadata } from "next";
import Link from "next/link";
import { COPY } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Thesis",
  description: COPY.thesis.title,
  robots: { index: false, follow: false },
};

export default function ThesisPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-24 lg:px-8">
      <Badge variant="secondary">Thesis</Badge>
      <h1 className="mt-5 max-w-[18ch] font-serif text-[2rem] font-normal leading-tight tracking-tight sm:text-5xl">
        {COPY.thesis.title}
      </h1>
      <div className="mt-10 space-y-6 text-[0.9375rem] leading-relaxed text-muted-foreground">
        <p>{COPY.thesis.p1}</p>
        <p>{COPY.thesis.p2}</p>
      </div>
      <p className="mt-14 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button asChild className="h-11 w-full sm:w-auto">
          <Link href="/quote">{COPY.nav.quote}</Link>
        </Button>
        <Button asChild variant="outline" className="h-11 w-full sm:w-auto">
          <Link href="/">Back to the homepage</Link>
        </Button>
      </p>
    </article>
  );
}
