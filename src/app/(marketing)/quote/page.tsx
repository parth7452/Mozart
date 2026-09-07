import type { Metadata } from "next";
import { QuoteForm } from "@/components/marketing/QuoteForm";
import { COPY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request terms",
  description: COPY.quote.body,
};

export default function QuotePage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brass">
        Terms request
      </p>
      <h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
        {COPY.quote.title}
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-soot/60">{COPY.quote.lede}</p>
      <div className="mt-10">
        <QuoteForm />
      </div>
    </article>
  );
}
