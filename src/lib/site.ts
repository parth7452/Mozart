/** Public marketing site config. Safe to expose — no secrets. */

export const SITE_NAME = "Mozart";
export const SITE_DOMAIN = "mozart.financial";
export const DEFAULT_PUBLIC_EMAIL = "start@mozart.financial";
export const DEFAULT_CAL_URL = "https://calendly.com/parthpahuja/30min";

export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return `https://${SITE_DOMAIN}`;
}

export function founderEmail(): string {
  return process.env.NEXT_PUBLIC_FOUNDER_EMAIL?.trim() || DEFAULT_PUBLIC_EMAIL;
}

export function calUrl(): string {
  return process.env.NEXT_PUBLIC_CAL_URL?.trim() || DEFAULT_CAL_URL;
}

export function founderMailto(subject = "Mozart quote request"): string {
  return `mailto:${founderEmail()}?subject=${encodeURIComponent(subject)}`;
}

export function bookCallHref(): string {
  return calUrl();
}

export function quoteHref(): string {
  return "/quote";
}

/**
 * Public homepage copy — customer lead-gen with soft compliance.
 * Do not invent traction, licenses, partner brands, or Mozart-as-funder claims.
 */
export const COPY = {
  nav: {
    how: "How it works",
    who: "Who it's for",
    costs: "What it costs",
    quote: "Get a quote",
    founder: "Founder",
  },
  hero: {
    headline: "Payroll is Friday. Your client pays in 45 days.",
    subhead:
      "Mozart helps staffing firms and suppliers request invoice funding through established factoring partners. Send an invoice and your customer list so we can see if there's a fit. We aim for a straight answer on terms this week.",
    primaryCta: "Get a quote",
    secondaryCta: "Book a 20-minute call",
    note: "Mozart works with established factoring partners to fund invoices today, and is building its own funding. Either way, you get a straight answer this week. We do not advance funds ourselves yet.",
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
        k: "Flexible with partners",
        v: "No long-term lock-in required with partners we work with — confirm on your quote. You choose which invoices to send.",
      },
    ],
  },
  problem: {
    title: "The gap is timing, not whether you did the work.",
    body: "If you staff warehouses or ship to a big buyer, you often finish the job long before cash hits your account. Invoice factoring is how many operators close that gap: a finance company may purchase the receivable and collect from your customer when they pay. You keep operating. They keep their terms.",
    explain:
      "Someone is already covering that wait — your own cash, a bank line, or a factor. Mozart helps arrange that conversation around the customer who owes you, then walks through whether a partner is a fit — without requiring a long-term lock-in up front. Confirm structure on your quote.",
  },
  who: {
    title: "Built for two kinds of businesses.",
    staffingLabel: "Staffing firms",
    staffingTitle: "Weekly payroll. Slow-paying clients.",
    staffingBody:
      "Wages go out on a clock. Hospitals, warehouses, and other clients often pay in 30, 45, or 60 days. Mozart is built around timesheets and that weekly cycle.",
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
    notAFit:
      "Usually not a fit: consumer receivables, construction retainage, invoices already in dispute, or businesses looking for a loan against equipment or personal credit.",
  },
  how: {
    title: "Four steps. We arrange; partners fund.",
    intro:
      "Send us an invoice and who owes you. We look at the customer, walk through whether a partner is a fit, and — if you proceed — the partner handles funding and collection.",
    steps: [
      {
        n: "01",
        title: "Send an invoice and your customer list",
        body: "A recent invoice plus the buyers you want to discuss. That's enough to start a terms request.",
      },
      {
        n: "02",
        title: "We underwrite your customer, not you",
        body: "Credit is about who owes the invoice — the hospital, warehouse, or agency — not your personal FICO. Stronger payers are usually easier to place.",
      },
      {
        n: "03",
        title: "Walk through terms before you sign",
        body: "If there's a fit, we'll walk through a range — how a partner might advance, what they charge, and who we'd introduce. Confirm everything on your quote. Not a priced offer from this page.",
      },
      {
        n: "04",
        title: "Partner funds, then collects from your customer",
        body: "If you accept a partner's terms, that partner advances against the invoice. When your customer pays, the partner reconciles the reserve and their fee. Mozart does not advance funds itself.",
      },
    ],
    debtorNote:
      "Your customer will typically be notified to pay the factor instead of you. That's how factoring usually works, and most enterprise AP teams already do it. We'll tell you how notice typically looks before anything is sent.",
  },
  costs: {
    title: "What it costs",
    body: "Fees and advance rates depend on your customers' credit, how fast they pay, and the partner factor. We'll walk through a real range on the call or quote request — we don't publish a one-size number here.",
    extras:
      "No long-term lock-in required with partners we work with — confirm on your quote. You choose which invoices to discuss.",
  },
  different: {
    title: "Why we're different",
    points: [
      {
        k: "We underwrite your customer, not you",
        v: "The credit that matters is the company that owes the invoice.",
      },
      {
        k: "Pick which invoices",
        v: "No requirement to send your whole book. Confirm volume expectations on your quote.",
      },
      {
        k: "See if there's a fit before you sign",
        v: "We'll walk through a range and who we'd introduce — not a one-click priced offer.",
      },
    ],
  },
  faq: {
    title: "Questions people actually ask",
    items: [
      {
        q: "What does it cost?",
        a: "Fees and advance rates depend on your customers' credit, how fast they pay, and the partner factor. We'll walk through a real range on the call or quote request — we don't publish a one-size number here.",
      },
      {
        q: "Do I have to factor everything?",
        a: "Usually no. You pick which invoices and which customers to discuss. Volume expectations vary by partner — confirm on your quote.",
      },
      {
        q: "Is this a loan?",
        a: "Factoring is typically structured as a purchase of receivables, not a loan. Structure varies by partner and state — confirm on your quote.",
      },
      {
        q: "Will my customer know?",
        a: "Usually yes — they are asked to pay the factor instead of you. Enterprise and government AP teams do this routinely. We'll show you how notice typically looks before it goes out.",
      },
      {
        q: "What do you need from me?",
        a: "Company details, a recent invoice, your top customers, current payment terms, and typical days-to-pay. Bank logins and a full partner application come later, only if you want to proceed.",
      },
      {
        q: "Does Mozart fund invoices itself?",
        a: "No. We do not advance funds ourselves. Mozart works with established factoring partners today and is building its own book. We aim for a straight answer this week on whether there's a fit.",
      },
    ],
  },
  talk: {
    title: "See if your invoices are a fit",
    body: "Request terms, or book twenty minutes with the founder. We aim for a straight answer this week — not a teaser rate and not a commitment to fund.",
    primaryCta: "Get a quote",
    secondaryCta: "Book 20 minutes",
  },
  quote: {
    title: "Request terms",
    lede: "One screen.",
    body: `This form emails a terms request to ${DEFAULT_PUBLIC_EMAIL} so we can see if there's a fit. It is not a live credit decision, not a priced offer, and not a commitment to fund.`,
    submit: "Send terms request",
    successTitle: "Request sent.",
    success:
      "We aim to reply this week with whether there's a fit, or a clear no. If you'd rather talk it through, book twenty minutes.",
  },
  partners: {
    title: "Partners",
    intro:
      "Mozart helps arrange invoice funding through commercial finance companies today, and is building its own book. Two kinds of partners matter. We do not list partner brands here.",
    factorTitle: "Factor partners",
    factorBody:
      "If you purchase B2B receivables and want staffing or supplier paper — timesheet-backed invoices, enterprise or government buyers — we originate and introduce those relationships. Text-only for now; we do not publish partner names or logos without permission.",
    channelTitle: "Channel partners",
    channelBody:
      "Staffing networks, PE-backed platforms, accountants, and referral sources who see clients waiting 30–60 days to get paid. If that is your book, we want the conversation. Commercial terms go in writing — nothing on this page is a placement-fee schedule.",
    cta: "Talk to the founder about a partnership",
  },
  thesis: {
    title: "Why the hard part is the operating loop.",
    p1: "Invoice factoring is simple to say: you have a solid unpaid invoice, you need cash before the customer pays, someone buys the invoice at an advance. The hard part is everything in between. A lot of that work still lives in inboxes, PDFs, and people.",
    p2: "Mozart is building that loop with AI in the ops layer first: read the invoice, match it to the work, score the credit, keep a human gate, then service reserves and collections. The goal is to run the book at software-like cost while the product stays backed by real invoices.",
  },
  footer: {
    disclaimer:
      "Mozart is a referral partner / arranger to commercial finance and factoring companies. We do not advance funds ourselves. Terms vary by partner, customer credit, and state. Nothing on this site is a commitment to purchase invoices or extend credit.",
  },
} as const;

export const ONE_LINER =
  "Invoice factoring for staffing firms and suppliers. Request terms through established factoring partners.";

export const META_TITLE = "Invoice Factoring for Staffing Firms & Suppliers | Mozart";
export const META_DESCRIPTION =
  "Invoice factoring for staffing firms and suppliers. Request terms through commercial finance partners — we aim for a straight answer this week. Mozart does not advance funds itself.";
