import { ClosingCtas, HeroCtaBlock } from "@/components/marketing/FounderCta";
import { COPY } from "@/lib/site";

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

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(20,18,16,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,18,16,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
        <h1 className="max-w-[16ch] font-serif text-[2.35rem] leading-[1.15] tracking-tight text-soot sm:text-5xl lg:text-[3.35rem]">
          {COPY.hero.headline}
        </h1>
        <p className="mt-7 max-w-xl text-base leading-relaxed text-soot/70 sm:text-[17px]">
          {COPY.hero.subhead}
        </p>
        <HeroCtaBlock
          className="mt-10"
          note={COPY.hero.note}
          primary={COPY.hero.primaryCta}
          secondary={COPY.hero.secondaryCta}
        />
      </div>
      <ClarityBar />
    </section>
  );
}

function ClarityBar() {
  return (
    <div className="relative border-t border-hairline bg-stone">
      <dl className="mx-auto grid max-w-5xl gap-10 px-5 py-12 sm:px-8 sm:py-14 md:grid-cols-3 md:gap-12">
        {COPY.hero.chips.map((chip) => (
          <div key={chip.k} className="max-w-xs">
            <dt className="font-serif text-xl tracking-tight text-soot">{chip.k}</dt>
            <dd className="mt-2 max-w-[28ch] text-sm leading-relaxed text-soot/70">{chip.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Problem() {
  return (
    <section className="border-b border-hairline">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-xl">
          <h2 className="max-w-[18ch] font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            {COPY.problem.title}
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-soot/75">{COPY.problem.body}</p>
          <p className="mt-8 border-l-2 border-brass/50 pl-5 text-[15px] leading-relaxed text-soot/70">
            {COPY.problem.explain}
          </p>
        </div>
      </div>
    </section>
  );
}

function Who() {
  return (
    <section id="who" className="scroll-mt-24 border-b border-hairline bg-[#EFE8DA]/50">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="max-w-[16ch] font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
          {COPY.who.title}
        </h2>
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <article className="max-w-md">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ledger">
              {COPY.who.staffingLabel}
            </p>
            <h3 className="mt-3 font-serif text-2xl leading-snug tracking-tight">
              {COPY.who.staffingTitle}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-soot/75">{COPY.who.staffingBody}</p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-soot/70">
              {COPY.who.staffingPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="max-w-md">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ledger">
              {COPY.who.supplierLabel}
            </p>
            <h3 className="mt-3 font-serif text-2xl leading-snug tracking-tight">
              {COPY.who.supplierTitle}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-soot/75">{COPY.who.supplierBody}</p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-soot/70">
              {COPY.who.supplierPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
        <p className="mt-12 max-w-2xl text-xs leading-relaxed text-soot/50">{COPY.who.notAFit}</p>
      </div>
    </section>
  );
}

function How() {
  return (
    <section id="how" className="scroll-mt-24 border-b border-hairline">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-xl">
          <h2 className="max-w-[18ch] font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            {COPY.how.title}
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-soot/70">{COPY.how.intro}</p>
        </div>
        <ol className="mt-16 max-w-2xl space-y-12">
          {COPY.how.steps.map((step, index) => (
            <li key={step.n} className="grid gap-3 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-8">
              <span className="font-serif text-2xl text-brass">{step.n}</span>
              <div className="max-w-md">
                <h3 className="font-serif text-2xl leading-snug tracking-tight">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-soot/70">{step.body}</p>
                {index === COPY.how.steps.length - 1 ? (
                  <p className="mt-4 text-sm leading-relaxed text-soot/55">{COPY.how.debtorNote}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Costs() {
  return (
    <section id="costs" className="scroll-mt-24 border-b border-hairline bg-[#EFE8DA]/50">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-xl">
          <h2 className="max-w-[16ch] font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            {COPY.costs.title}
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-soot/75">{COPY.costs.body}</p>
          <p className="mt-6 text-sm leading-relaxed text-soot/55">{COPY.costs.extras}</p>
        </div>
      </div>
    </section>
  );
}

function Different() {
  return (
    <section className="border-b border-hairline">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="max-w-[16ch] font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
          {COPY.different.title}
        </h2>
        <dl className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {COPY.different.points.map((point) => (
            <div key={point.k} className="max-w-xs">
              <dt className="font-serif text-xl tracking-tight">{point.k}</dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-soot/70">{point.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="border-b border-hairline">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="max-w-[16ch] font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
          {COPY.faq.title}
        </h2>
        <dl className="mt-14 max-w-2xl space-y-10">
          {COPY.faq.items.map((item) => (
            <div key={item.q}>
              <dt className="font-serif text-xl tracking-tight">{item.q}</dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-soot/70">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Talk() {
  return (
    <section id="talk" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="bg-ledger px-6 py-14 text-stone sm:px-12 sm:py-16">
          <h2 className="max-w-md font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            {COPY.talk.title}
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone/70">{COPY.talk.body}</p>
          <div className="mt-10">
            <ClosingCtas primary={COPY.talk.primaryCta} secondary={COPY.talk.secondaryCta} />
          </div>
        </div>
      </div>
    </section>
  );
}
