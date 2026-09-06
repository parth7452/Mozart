/** Public marketing site config. Safe to expose — no secrets. */

export const SITE_NAME = "Mozart";
export const SITE_DOMAIN = "mozart.financial";
export const DEFAULT_FOUNDER_EMAIL = "parthpahuja@gmail.com";

export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return `https://${SITE_DOMAIN}`;
}

export function founderEmail(): string {
  return process.env.NEXT_PUBLIC_FOUNDER_EMAIL?.trim() || DEFAULT_FOUNDER_EMAIL;
}

export function calUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_CAL_URL?.trim();
  return raw || null;
}

export function founderMailto(subject = "Mozart research call"): string {
  return `mailto:${founderEmail()}?subject=${encodeURIComponent(subject)}`;
}

/** Cal.com if configured, otherwise mailto the founder. */
export function founderCtaHref(): string {
  return calUrl() ?? founderMailto();
}

export function founderCtaLabel(): string {
  return calUrl() ? "Book a research call" : "Talk to the founder";
}

/** Approved public homepage copy v2.1. Do not invent metrics or live funding. */
export const COPY = {
  nav: {
    how: "How it works",
    who: "Who it's for",
    talk: "Talk to the founder",
  },
  hero: {
    eyebrow: "Early access · Research stage · Not live funding",
    headline:
      "Get cash from invoices you've already earned, while your customer is still paying.",
    subhead:
      "Mozart is building invoice factoring for staffing firms and suppliers who sell to big companies or government. You wait on their payment terms. We are building software to buy those invoices and run the messy middle. This site does not fund invoices today.",
    cta: "Talk to the founder",
    note: "Research call, not an application.",
    chips: [
      {
        k: "Staffing",
        v: "Payroll goes out weekly. Clients pay in 30–60 days.",
      },
      {
        k: "Suppliers",
        v: "You delivered. Their payment team still hasn't paid.",
      },
      {
        k: "Honest status",
        v: "Building the system. No live funding from this page.",
      },
    ],
  },
  problem: {
    title: "The gap is timing, not whether you did the work.",
    body: "If you staff warehouses or ship to a big buyer, you often finish the job long before cash hits your account. Someone is already covering that wait: your own cash, a bank line, or a factor. Mozart is being built for that wait. Not as a bank account, and not as a marketplace of random lenders.",
    boundary:
      "If you need money on an invoice this week, this is not the place. If you run this cash cycle and want to talk while the product is still being shaped, that is the conversation.",
  },
  who: {
    title: "Built for two kinds of businesses.",
    staffingLabel: "Staffing firms",
    staffingTitle: "Weekly payroll. Slow-paying clients.",
    staffingBody:
      "Wages go out on a clock. Hospitals, warehouses, and other clients often pay in 30, 45, or 60 days. Mozart is being designed around timesheets and that weekly cycle.",
    staffingPoints: [
      "The invoice should match hours actually worked.",
      "The customer who pays is usually a bigger company, not a consumer.",
      "The pain is when cash arrives, not whether the work happened.",
    ],
    supplierLabel: "Suppliers to enterprise or government",
    supplierTitle: "You shipped. They haven't paid yet.",
    supplierBody:
      "The order is clean. The packing slip exists. Their payment team at a big company, or a government office, is still processing it. Good invoices sit unpaid and starve day-to-day operations.",
    supplierPoints: [
      "Buyer is enterprise or government.",
      "Paper trail: purchase order, invoice, delivery or acceptance.",
      "Cash is late because of process, not because the shipment is disputed.",
    ],
  },
  how: {
    title: "Four steps. This website stops before money moves.",
    intro:
      "This is the product we are building. It is a design plan, not a promise that funding is live.",
    steps: [
      {
        n: "01",
        title: "Check the invoice is real",
        body: "Pull the invoice and match it to the work: timesheet for staffing, purchase order and delivery for suppliers.",
      },
      {
        n: "02",
        title: "Review the credit",
        body: "Score the risk. A person still has to approve. This site does not auto-approve or send advances.",
      },
      {
        n: "03",
        title: "Run the book after purchase",
        body: "Hold reserves, apply cash when the customer pays, keep a collections calendar. This is ongoing ops, not a one-time wire.",
      },
      {
        n: "04",
        title: "Collect from the customer who owes you",
        body: "They pay the invoice. Closing that loop is how the book stays healthy.",
      },
    ],
  },
  what: {
    isTitle: "What it is",
    isBody:
      "Software-shaped invoice factoring for US B2B invoices in staffing and supplier verticals. Built first as underwriting and servicing ops.",
    isntTitle: "What it isn't",
    isntBody:
      "Not a live funder from this website. Not a lender marketplace. Not a bank line with a new logo.",
    claimTitle: "What we will not claim here",
    claimBody:
      "No customer counts, no dollars funded, no loss rates. Those numbers do not exist yet. This site will not invent them.",
  },
  thesis: {
    title: "Why the hard part is the operating loop.",
    p1: "Invoice factoring is simple to say: you have a solid unpaid invoice, you need cash before the customer pays, someone buys the invoice at an advance. The hard part is everything in between. A lot of that work still lives in inboxes, PDFs, and people.",
    p2: "Mozart is building that loop with AI in the ops layer first: read the invoice, match it to the work, score the credit, keep a human gate, then service reserves and collections. The goal is to run the book at software-like cost while the product stays backed by real invoices.",
  },
  talk: {
    title: "Talk to the founder. Research call, not an application.",
    body: "If you run a staffing firm, or you supply enterprise or government, and unpaid invoices are a real constraint, we want that conversation. Early access means a research call. We will not fund an invoice from this page.",
    ctaPrefix: "Email Parth",
  },
  footer: {
    disclaimer:
      "Mozart is in research / early access. Nothing on this site is an offer to buy invoices, extend credit, or fund receivables. No live advances from this page.",
  },
} as const;

export const ONE_LINER =
  "Mozart is building invoice factoring for staffing firms and suppliers who sell to big companies or government.";

export const META_DESCRIPTION =
  "Mozart is building invoice factoring for staffing firms and suppliers who sell to big companies or government. Research stage. This site does not fund invoices today.";
