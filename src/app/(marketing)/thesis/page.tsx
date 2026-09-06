import type { Metadata } from "next";
import Link from "next/link";
import { COPY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thesis",
  description: COPY.thesis.title,
};

export default function ThesisPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 py-20 sm:px-8 sm:py-28">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brass">Thesis</p>
      <h1 className="mt-5 max-w-[18ch] font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
        {COPY.thesis.title}
      </h1>
      <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-soot/75">
        <p>{COPY.thesis.p1}</p>
        <p>{COPY.thesis.p2}</p>
      </div>
      <p className="mt-14 text-sm text-soot/60">
        <Link href="/#talk" className="underline decoration-hairline underline-offset-4 hover:text-soot">
          {COPY.nav.talk}
        </Link>
        {" · "}
        <Link href="/" className="underline decoration-hairline underline-offset-4 hover:text-soot">
          Back to the homepage
        </Link>
      </p>
    </article>
  );
}
