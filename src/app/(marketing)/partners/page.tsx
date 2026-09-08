import type { Metadata } from "next";
import { BookCta } from "@/components/marketing/FounderCta";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { COPY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partners",
  description: COPY.partners.intro,
};

export default function PartnersPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-24 lg:px-8">
      <Badge variant="secondary">Partners</Badge>
      <h1 className="mt-5 font-serif text-[2rem] font-normal leading-tight tracking-tight sm:text-5xl">{COPY.partners.title}</h1>
      <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">{COPY.partners.intro}</p>

      <div className="mt-12 grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-xl font-normal">{COPY.partners.factorTitle}</CardTitle>
            <CardDescription className="text-[15px] leading-relaxed">
              {COPY.partners.factorBody}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-xl font-normal">{COPY.partners.channelTitle}</CardTitle>
            <CardDescription className="text-[15px] leading-relaxed">
              {COPY.partners.channelBody}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BookCta variant="default" className="w-full sm:w-auto">
              {COPY.partners.cta}
            </BookCta>
          </CardContent>
        </Card>
      </div>
    </article>
  );
}
