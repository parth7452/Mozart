import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Building2,
  Check,
  FileText,
  Handshake,
  ListFilter,
  Package,
  ScanSearch,
  ShieldCheck,
  Users,
} from "lucide-react";
import { ClosingCtas, HeroCtaBlock } from "@/components/marketing/FounderCta";
import { FaqList } from "@/components/marketing/FaqList";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { COPY, META_TITLE } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
};

const STEP_ICONS = [FileText, ShieldCheck, Handshake, Building2];

export default function MarketingHome() {
  return (
    <>
      <Hero />
      <Problem />
      <Who />
      <How />
      <Costs />
      <Different />
      <Faq />
      <Talk />
    </>
  );
}

function Section({
  id,
  muted,
  className,
  children,
}: {
  id?: string;
  muted?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "border-b",
        muted ? "bg-muted/60" : "bg-background",
        id ? "scroll-mt-20" : undefined,
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-28">{children}</div>
    </section>
  );
}

function Hero() {
  return (
    <section className="border-b bg-background">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:px-8 lg:py-28">
        <div className="min-w-0">
          <Badge variant="secondary" className="whitespace-normal text-left">
            Invoice factoring for staffing & suppliers
          </Badge>
          <h1 className="mt-5 max-w-[16ch] font-serif text-[2rem] font-normal leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            {COPY.hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
            {COPY.hero.subhead}
          </p>
          <HeroCtaBlock
            className="mt-8 sm:mt-10"
            note={COPY.hero.note}
            primary={COPY.hero.primaryCta}
            secondary={COPY.hero.secondaryCta}
          />
        </div>
        <div className="grid min-w-0 gap-3 sm:gap-4">
          {COPY.hero.chips.map((chip) => (
            <Card key={chip.k} className="min-w-0">
              <CardHeader className="pb-3">
                <CardTitle className="font-serif text-lg font-normal sm:text-xl">{chip.k}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{chip.v}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <Section muted>
      <div className="max-w-2xl">
        <h2 className="max-w-[18ch] font-serif text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
          {COPY.problem.title}
        </h2>
        <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted-foreground">{COPY.problem.body}</p>
        <p className="mt-8 border-l-2 border-primary/40 pl-5 text-[0.9375rem] leading-relaxed text-muted-foreground">
          {COPY.problem.explain}
        </p>
      </div>
    </Section>
  );
}

function Who() {
  return (
    <Section id="who">
      <h2 className="max-w-[16ch] font-serif text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
        {COPY.who.title}
      </h2>
      <div className="mt-10 grid min-w-0 gap-5 sm:mt-12 lg:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-muted">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <Badge variant="muted">{COPY.who.staffingLabel}</Badge>
            <CardTitle className="pt-2 font-serif text-xl font-normal">{COPY.who.staffingTitle}</CardTitle>
            <CardDescription className="text-[0.9375rem] leading-relaxed">
              {COPY.who.staffingBody}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              {COPY.who.staffingPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="min-w-0">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-muted">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <Badge variant="muted">{COPY.who.supplierLabel}</Badge>
            <CardTitle className="pt-2 font-serif text-xl font-normal">{COPY.who.supplierTitle}</CardTitle>
            <CardDescription className="text-[0.9375rem] leading-relaxed">
              {COPY.who.supplierBody}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              {COPY.who.supplierPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <p className="mt-8 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:mt-10">
        {COPY.who.notAFit}
      </p>
    </Section>
  );
}

function How() {
  return (
    <Section id="how" muted>
      <div className="max-w-2xl">
        <h2 className="max-w-[18ch] font-serif text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
          {COPY.how.title}
        </h2>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted-foreground">{COPY.how.intro}</p>
      </div>
      <ol className="mt-10 grid min-w-0 gap-4 sm:mt-12 md:grid-cols-2">
        {COPY.how.steps.map((step, index) => {
          const Icon = STEP_ICONS[index] ?? FileText;
          return (
            <li key={step.n} className="min-w-0">
              <Card className="h-full min-w-0">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground">
                      {step.n}
                    </span>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardTitle className="pt-2 font-serif text-lg font-normal">{step.title}</CardTitle>
                  <CardDescription className="text-[0.9375rem] leading-relaxed">{step.body}</CardDescription>
                </CardHeader>
                {index === COPY.how.steps.length - 1 ? (
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">{COPY.how.debtorNote}</p>
                  </CardContent>
                ) : null}
              </Card>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

function Costs() {
  return (
    <Section id="costs">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="font-serif text-3xl font-normal tracking-tight sm:text-4xl">
            {COPY.costs.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{COPY.costs.body}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{COPY.costs.extras}</p>
        </CardContent>
      </Card>
    </Section>
  );
}

function Different() {
  const icons = [ScanSearch, ListFilter, Handshake];
  return (
    <Section muted>
      <h2 className="max-w-[16ch] font-serif text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
        {COPY.different.title}
      </h2>
      <div className="mt-10 grid min-w-0 gap-4 sm:mt-12 md:grid-cols-3">
        {COPY.different.points.map((point, index) => {
          const Icon = icons[index] ?? ScanSearch;
          return (
            <Card key={point.k} className="min-w-0">
              <CardHeader>
                <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="font-serif text-base font-normal sm:text-lg">{point.k}</CardTitle>
                <CardDescription className="text-[0.9375rem] leading-relaxed">{point.v}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

function Faq() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <h2 className="max-w-[16ch] font-serif text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
          {COPY.faq.title}
        </h2>
        <div className="mt-8 sm:mt-10">
          <FaqList />
        </div>
      </div>
    </Section>
  );
}

function Talk() {
  return (
    <section id="talk" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="rounded-2xl bg-primary px-5 py-10 text-primary-foreground sm:px-12 sm:py-16">
          <h2 className="max-w-md font-serif text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
            {COPY.talk.title}
          </h2>
          <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-primary-foreground/70 sm:mt-6">
            {COPY.talk.body}
          </p>
          <div className="mt-8 sm:mt-10">
            <ClosingCtas primary={COPY.talk.primaryCta} secondary={COPY.talk.secondaryCta} />
          </div>
        </div>
      </div>
    </section>
  );
}
