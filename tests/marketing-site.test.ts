import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  COPY,
  DEFAULT_CAL_URL,
  DEFAULT_PUBLIC_EMAIL,
  META_DESCRIPTION,
  META_TITLE,
  ONE_LINER,
  bookCallHref,
  calUrl,
  founderEmail,
  quoteHref,
} from "@/lib/site";

const MUSIC_TELLS = [
  "piano",
  "classical",
  "wolfgang",
  "amadeus",
  "concert",
  "symphony",
  "sonata",
  "concerto",
];

const INVENTED_TRACTION = ["customers funded", "dollars funded", "loss rate", "aum", "2,000+"];

const CUSTOMER_FILES = [
  "src/lib/site.ts",
  "src/app/(marketing)/page.tsx",
  "src/app/(marketing)/layout.tsx",
  "src/app/(marketing)/quote/page.tsx",
  "src/app/(marketing)/partners/page.tsx",
  "src/app/(marketing)/privacy/page.tsx",
  "src/app/(marketing)/opengraph-image.tsx",
  "src/components/marketing/Header.tsx",
  "src/components/marketing/Footer.tsx",
  "src/components/marketing/QuoteForm.tsx",
  "src/components/marketing/FounderCta.tsx",
  "src/components/marketing/FaqList.tsx",
  "src/components/marketing/Logo.tsx",
  "src/app/layout.tsx",
  "src/app/not-found.tsx",
];

const HARD_BANS = [
  "licensed",
  "iso license",
  "broker license",
  "triumph",
  "rts factor",
  "1.5–3%",
  "1.5-3%",
  "85–95%",
  "85-95%",
  "cash in a few days",
  "parthpahuja@gmail.com",
  "parth@mozart.financial",
  "research stage",
  "research-stage",
  "not live funding",
  "does not fund invoices today",
  "this is not the place",
  "no live advances",
  "leave if you need",
  "honest status",
];

function marketingFile(rel: string) {
  return readFileSync(resolve(__dirname, "..", rel), "utf8");
}

function customerCorpus() {
  return CUSTOMER_FILES.map((rel) => marketingFile(rel)).join("\n").toLowerCase();
}

describe("marketing site config", () => {
  const saved = {
    email: process.env.NEXT_PUBLIC_FOUNDER_EMAIL,
    cal: process.env.NEXT_PUBLIC_CAL_URL,
  };

  afterEach(() => {
    if (saved.email === undefined) delete process.env.NEXT_PUBLIC_FOUNDER_EMAIL;
    else process.env.NEXT_PUBLIC_FOUNDER_EMAIL = saved.email;
    if (saved.cal === undefined) delete process.env.NEXT_PUBLIC_CAL_URL;
    else process.env.NEXT_PUBLIC_CAL_URL = saved.cal;
  });

  it("defaults public contact to start@mozart.financial", () => {
    delete process.env.NEXT_PUBLIC_FOUNDER_EMAIL;
    expect(founderEmail()).toBe("start@mozart.financial");
    expect(DEFAULT_PUBLIC_EMAIL).toBe("start@mozart.financial");
  });

  it("defaults booking to the Calendly event", () => {
    delete process.env.NEXT_PUBLIC_CAL_URL;
    expect(calUrl()).toBe(DEFAULT_CAL_URL);
    expect(bookCallHref()).toBe("https://calendly.com/parthpahuja/30min");
  });

  it("prefers a configured booking URL", () => {
    process.env.NEXT_PUBLIC_CAL_URL = "https://calendly.com/example/mozart";
    expect(bookCallHref()).toBe("https://calendly.com/example/mozart");
  });

  it("points the quote CTA at /quote", () => {
    expect(quoteHref()).toBe("/quote");
  });

  it("states invoice factoring and avoids music branding in the one-liner", () => {
    const line = ONE_LINER.toLowerCase();
    expect(line).toContain("invoice factoring");
    expect(line).toContain("staffing");
    for (const word of MUSIC_TELLS) {
      expect(line).not.toContain(word);
    }
  });

  it("restores IBM Plex Sans and Instrument Serif on marketing pages", () => {
    const layout = marketingFile("src/app/(marketing)/layout.tsx");
    expect(layout).toContain("IBM_Plex_Sans");
    expect(layout).toContain("Instrument_Serif");
    expect(layout).toContain("font-marketing");
  });

  it("uses the approved meta title, description, and twitter card", () => {
    expect(META_TITLE).toBe("Invoice Factoring for Staffing Firms & Suppliers | Mozart");
    expect(META_DESCRIPTION).toContain("Invoice factoring for staffing firms and suppliers");
    expect(META_DESCRIPTION).toContain("does not advance funds itself");
    const layout = marketingFile("src/app/(marketing)/layout.tsx");
    expect(layout).toContain('card: "summary_large_image"');
    const lower = META_DESCRIPTION.toLowerCase();
    for (const phrase of INVENTED_TRACTION) {
      expect(lower).not.toContain(phrase);
    }
  });
});

describe("customer lead-gen copy", () => {
  it("keeps the customer hero, cards, steps, and footer", () => {
    expect(COPY.hero.headline).toBe("Payroll is Friday. Your client pays in 45 days.");
    expect(COPY.hero.subhead).toContain("request invoice funding");
    expect(COPY.hero.subhead).toContain("straight answer on terms this week");
    expect(COPY.hero.primaryCta).toBe("Get a quote");
    expect(COPY.hero.secondaryCta).toBe("Book a 20-minute call");
    expect(COPY.hero.primaryCta.toLowerCase()).not.toContain("3 minute");
    expect(COPY.hero.note).toContain("We do not advance funds ourselves yet.");
    expect(COPY.hero.note).toContain("straight answer this week");
    expect(COPY.hero.chips.map((c) => c.k)).toEqual([
      "Staffing",
      "Suppliers",
      "Flexible with partners",
    ]);
    expect(COPY.problem.title).toBe("The gap is timing, not whether you did the work.");
    expect(COPY.who.notAFit.toLowerCase()).toContain("not a fit");
    expect(COPY.how.steps).toHaveLength(4);
    expect(COPY.how.debtorNote).toMatch(/notified to pay the factor/i);
    expect(COPY.faq.items).toHaveLength(6);
    expect(COPY.faq.items[0].a).toContain("we don't publish a one-size number here");
    expect(COPY.footer.disclaimer).toBe(
      "Mozart is a referral partner / arranger to commercial finance and factoring companies. We do not advance funds ourselves. Terms vary by partner, customer credit, and state. Nothing on this site is a commitment to purchase invoices or extend credit.",
    );
  });

  it("softens loan and lock-in claims", () => {
    expect(COPY.faq.items.find((i) => i.q === "Is this a loan?")?.a).toContain(
      "typically structured as a purchase of receivables, not a loan",
    );
    expect(COPY.hero.chips[2].v).toContain("confirm on your quote");
    expect(COPY.costs.body).not.toMatch(/1\.5/);
    expect(COPY.costs.body).not.toMatch(/85/);
  });

  it("does not lead the homepage with thesis or a disclaimer wall", () => {
    const home = marketingFile("src/app/(marketing)/page.tsx");
    expect(home).not.toContain('id="thesis"');
    expect(home).not.toContain("What Mozart is");
    expect(home).not.toContain('href="/thesis"');
    expect(home.indexOf("<Hero")).toBeLessThan(home.indexOf("<Problem"));
    expect(home.indexOf("<How")).toBeLessThan(home.indexOf("<Faq"));
  });

  it("uses customer nav and hides founder, thesis, desk, and demo from the header", () => {
    const header = marketingFile("src/components/marketing/Header.tsx");
    expect(header).toContain("COPY.nav.how");
    expect(header).toContain("COPY.nav.who");
    expect(header).toContain("COPY.nav.costs");
    expect(header).toContain("COPY.nav.quote");
    expect(header).not.toContain("Thesis");
    expect(header).not.toContain("/#thesis");
    expect(header).not.toContain("/desk");
    expect(header).not.toContain("/demo");
    const footer = marketingFile("src/components/marketing/Footer.tsx");
    expect(footer).toContain("COPY.nav.founder");
    expect(footer).not.toContain('href="/thesis"');
    expect(footer).not.toContain('href="/desk"');
    expect(footer).not.toContain('href="/demo"');
  });

  it("keeps dual CTAs in the hero (quote + book)", () => {
    const cta = marketingFile("src/components/marketing/FounderCta.tsx");
    expect(cta).toContain("QuoteCta");
    expect(cta).toContain("BookCta");
    expect(cta).toContain("HeroCtaBlock");
    const home = marketingFile("src/app/(marketing)/page.tsx");
    expect(home).toContain("HeroCtaBlock");
    expect(home).toContain("ClosingCtas");
    expect(home).toContain("FaqList");
  });
});

describe("soft compliance bans on customer pages", () => {
  it("does not ship hard-banned phrases on public customer surfaces", () => {
    const corpus = customerCorpus();
    for (const phrase of HARD_BANS) {
      expect(corpus, `banned phrase leaked: ${phrase}`).not.toContain(phrase);
    }
  });

  it("does not claim Mozart itself advances or pays out", () => {
    const copy = JSON.stringify(COPY).toLowerCase();
    expect(copy).not.toMatch(/mozart (funds|advances|pays out)/);
    expect(COPY.hero.note.toLowerCase()).toContain("we do not advance funds ourselves");
    expect(COPY.footer.disclaimer.toLowerCase()).toContain("we do not advance funds ourselves");
  });

  it("does not use an absolute not-a-loan or no-long-term-contract blanket", () => {
    expect(COPY.faq.items.some((i) => i.a === "No. Factoring is a purchase of invoices, not a loan.")).toBe(
      false,
    );
    expect(COPY.hero.chips.some((c) => c.k === "No long-term contract")).toBe(false);
  });
});
