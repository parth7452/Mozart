import { FounderCta, FounderCtaPair } from "@/components/marketing/FounderCta";
import { ONE_LINER } from "@/lib/site";

const LOOP = [
  {
    n: "01",
    title: "Verify",
    body: "Extract the invoice and match it to work performed — timesheet and VMS for staffing, PO and delivery for suppliers. The receivable has to be real before anything else matters.",
  },
  {
    n: "02",
    title: "Underwrite",
    body: "Score the credit in shadow mode. A human still has to approve. There is no auto-fund path, and this website does not issue advances.",
  },
  {
    n: "03",
    title: "Service",
    body: "Hold reserves, apply cash when the debtor pays, run a collections calendar. Factoring is an operating book, not a one-time wire.",
  },
  {
    n: "04",
    title: "Collect",
    body: "The debtor is the one who pays. Closing the loop — not just originating it — is how an asset-backed book stays a book.",
  },
];

export default function MarketingHome() {
  return (
    <>
      <Hero />
      <Thesis />
      <Who />
      <Loop />
      <Talk />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(20,18,16,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,18,16,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brass">
          Early access · Research stage
        </p>
        <h1 className="mt-5 max-w-4xl font-serif text-[2.35rem] leading-[1.12] tracking-tight text-soot sm:text-5xl lg:text-[3.65rem]">
          Invoice cash for staffing firms and suppliers who wait on enterprise AP.
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-relaxed text-soot/70 sm:text-lg">
          {ONE_LINER} Mozart is being built as an underwriting and servicing
          system — not a lender marketplace, and not a live funder from this
          site.
        </p>
        <FounderCtaPair className="mt-9" />
        <dl className="mt-14 grid gap-6 border-t border-hairline pt-8 sm:grid-cols-3">
          <HeroFact k="Staffing" v="Weekly payroll. Customers pay net-30 to 60. The gap is cash you already earned." />
          <HeroFact k="SMB suppliers" v="You delivered. Enterprise or government AP is still in the queue." />
          <HeroFact k="US invoices" v="Asset-backed volume. Software-shaped ops. No live funding on this site." />
        </dl>
      </div>
    </section>
  );
}

function HeroFact({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-ledger">{k}</dt>
      <dd className="mt-2 text-sm leading-relaxed text-soot/70">{v}</dd>
    </div>
  );
}

function Thesis() {
  return (
    <section id="thesis" className="scroll-mt-20 border-b border-hairline">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:py-24">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brass">Thesis</p>
          <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            Faster verify → fund → service → collect. Software margins on an
            asset-backed book.
          </h2>
        </div>
        <div className="space-y-5 text-[15px] leading-relaxed text-soot/75">
          <p>
            Invoice factoring is simple in the abstract: you have a good
            receivable, you need cash before the debtor pays, someone buys the
            invoice at an advance. The hard part is the operating loop. Most of
            that loop still runs on inboxes, PDFs, and people.
          </p>
          <p>
            The durable edge is not a prettier portal. It is compressing{" "}
            <em className="font-serif text-soot">verify → fund → service → collect</em>{" "}
            until the cost to run the book looks like software — while the
            product itself stays collateralized by invoices, not by a story
            about growth.
          </p>
          <p>
            Mozart is building that loop as an AI-native ops system first:
            extract the invoice, match it to the work, score the credit, hold a
            human gate, then service reserves and collections. We are not
            publishing traction, AUM, customer counts, or loss rates. Those
            numbers do not exist here yet, and this site will not invent them.
          </p>
          <p>
            If you are looking for an application that funds this week, this is
            not it. If you run the cash cycle we describe and want to talk while
            the product is still being shaped, that is the conversation.
          </p>
        </div>
      </div>
    </section>
  );
}

function Who() {
  return (
    <section id="who" className="scroll-mt-20 border-b border-hairline bg-[#EFE8DA]/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brass">
          Who it&apos;s for
        </p>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
          Two ICPs. Same product: purchased receivables, not a bank line in a
          new wrapper.
        </h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <article className="border border-hairline bg-stone p-7 sm:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ledger">
              Staffing owners &amp; CFOs
            </p>
            <h3 className="mt-3 font-serif text-2xl tracking-tight">Payroll float</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-soot/75">
              Wages go out weekly. Hospitals, warehouses, and other buyers pay
              on 30, 45, or 60. Someone is already financing that gap — a
              revolver, a factor, or the owner&apos;s own cash. Mozart is being
              designed around timesheets, VMS files, and that weekly cycle.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-soot/70">
              <li className="flex gap-2">
                <span className="text-brass">—</span>
                Invoice tied to hours actually worked, not a hope.
              </li>
              <li className="flex gap-2">
                <span className="text-brass">—</span>
                Debtor is usually a larger, slower payer — not a consumer.
              </li>
              <li className="flex gap-2">
                <span className="text-brass">—</span>
                The pain is timing, not whether the work happened.
              </li>
            </ul>
          </article>
          <article className="border border-hairline bg-stone p-7 sm:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ledger">
              SMB suppliers
            </p>
            <h3 className="mt-3 font-serif text-2xl tracking-tight">
              Enterprise &amp; government lag
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-soot/75">
              You shipped. The PO is clean. The packing slip exists. AP at a
              Fortune 1000 or an agency is still in queue. Good invoices sit on
              the balance sheet and starve operations. The second path is PO +
              delivery documentation — proof the receivable is real.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-soot/70">
              <li className="flex gap-2">
                <span className="text-brass">—</span>
                Buyer is enterprise or government, not a thin SMB.
              </li>
              <li className="flex gap-2">
                <span className="text-brass">—</span>
                Paper trail: PO, invoice, delivery / acceptance.
              </li>
              <li className="flex gap-2">
                <span className="text-brass">—</span>
                Cash is delayed by process, not by a disputed shipment.
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

function Loop() {
  return (
    <section id="loop" className="scroll-mt-20 border-b border-hairline">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brass">
          The loop
        </p>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
          Four steps. The website stops before money moves.
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-soot/70">
          This is how we think about the product — and how the internal ops
          scaffold is shaped. It is a statement of design, not a claim that
          funding is live.
        </p>
        <ol className="mt-12 grid gap-px bg-hairline sm:grid-cols-2">
          {LOOP.map((step) => (
            <li key={step.n} className="bg-stone p-7 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-serif text-3xl text-brass">{step.n}</span>
                <span className="text-[11px] uppercase tracking-[0.16em] text-soot/40">
                  {step.title}
                </span>
              </div>
              <h3 className="mt-6 font-serif text-2xl tracking-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-soot/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Talk() {
  return (
    <section id="talk" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="border border-hairline bg-ledger px-6 py-12 text-stone sm:px-12 sm:py-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brass">
            Early access
          </p>
          <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            Talk to the founder. Research call, not an application.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-stone/70">
            If you run a staffing firm or supply enterprise or government, and
            AR lag is a real constraint, we want the conversation. Early access
            is a research call. We will not fund an invoice from this page.
          </p>
          <div className="mt-8">
            <FounderCta variant="brass">Talk to the founder</FounderCta>
          </div>
        </div>
      </div>
    </section>
  );
}
