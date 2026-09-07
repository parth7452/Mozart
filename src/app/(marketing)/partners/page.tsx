import type { Metadata } from "next";
import { BookCta } from "@/components/marketing/FounderCta";
import { COPY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partners",
  description: COPY.partners.intro,
};

export default function PartnersPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brass">Partners</p>
      <h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
        {COPY.partners.title}
      </h1>
      <p className="mt-6 text-[15px] leading-relaxed text-soot/75">{COPY.partners.intro}</p>

      <section className="mt-14 border-t border-hairline pt-10">
        <h2 className="font-serif text-2xl tracking-tight">{COPY.partners.factorTitle}</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-soot/75">{COPY.partners.factorBody}</p>
      </section>

      <section className="mt-12 border-t border-hairline pt-10">
        <h2 className="font-serif text-2xl tracking-tight">{COPY.partners.channelTitle}</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-soot/75">{COPY.partners.channelBody}</p>
      </section>

      <div className="mt-14">
        <BookCta variant="primary">{COPY.partners.cta}</BookCta>
      </div>
    </article>
  );
}
