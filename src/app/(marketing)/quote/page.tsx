import type { Metadata } from "next";
import { QuoteForm } from "@/components/marketing/QuoteForm";
import { Badge } from "@/components/ui/badge";
import { COPY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request terms",
  description: COPY.quote.body,
};

export default function QuotePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Badge variant="secondary">Terms request</Badge>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">{COPY.quote.title}</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{COPY.quote.lede}</p>
      <div className="mt-10">
        <QuoteForm />
      </div>
    </article>
  );
}
