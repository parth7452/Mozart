import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  COPY,
  DEFAULT_FOUNDER_EMAIL,
  founderCtaHref,
  founderCtaLabel,
  founderEmail,
  founderMailto,
  META_DESCRIPTION,
  ONE_LINER,
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

const INVENTED_TRACTION = [
  "customers funded",
  "dollars funded",
  "loss rate",
  "aum",
  "$1",
  "2,000+",
];

function marketingFile(rel: string) {
  return readFileSync(resolve(__dirname, "..", rel), "utf8");
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

  it("defaults the founder CTA to mailto when Cal.com is unset", () => {
    delete process.env.NEXT_PUBLIC_FOUNDER_EMAIL;
    delete process.env.NEXT_PUBLIC_CAL_URL;
    expect(founderEmail()).toBe(DEFAULT_FOUNDER_EMAIL);
    expect(founderCtaHref()).toBe(founderMailto());
    expect(founderCtaHref()).toContain("parthpahuja@gmail.com");
    expect(founderCtaLabel()).toBe("Talk to the founder");
  });

  it("prefers a configured Cal.com URL", () => {
    process.env.NEXT_PUBLIC_CAL_URL = "https://cal.com/example/mozart";
    expect(founderCtaHref()).toBe("https://cal.com/example/mozart");
    expect(founderCtaLabel()).toBe("Book a research call");
  });

  it("states invoice factoring and avoids music branding in the one-liner", () => {
    const line = ONE_LINER.toLowerCase();
    expect(line).toContain("invoice factoring");
    expect(line).toContain("staffing");
    for (const word of MUSIC_TELLS) {
      expect(line).not.toContain(word);
    }
  });

  it("keeps the public description research-stage and traction-free", () => {
    expect(META_DESCRIPTION).toContain("does not fund invoices today");
    const lower = META_DESCRIPTION.toLowerCase();
    for (const phrase of INVENTED_TRACTION) {
      expect(lower).not.toContain(phrase);
    }
  });
});

describe("approved homepage copy v2.1", () => {
  it("keeps hero, problem, ICPs, and steps as approved", () => {
    expect(COPY.hero.eyebrow).toBe("Early access · Research stage · Not live funding");
    expect(COPY.hero.headline).toBe(
      "Get cash from invoices you've already earned, while your customer is still paying.",
    );
    expect(COPY.hero.subhead).toContain("This site does not fund invoices today.");
    expect(COPY.hero.cta).toBe("Talk to the founder");
    expect(COPY.hero.note).toBe("Research call, not an application.");
    expect(COPY.hero.chips).toHaveLength(3);
    expect(COPY.problem.title).toBe("The gap is timing, not whether you did the work.");
    expect(COPY.who.title).toBe("Built for two kinds of businesses.");
    expect(COPY.how.title).toBe("Four steps. This website stops before money moves.");
    expect(COPY.how.steps).toHaveLength(4);
    expect(COPY.footer.disclaimer).toContain("No live advances from this page.");
  });

  it("does not lead the homepage with thesis", () => {
    const home = marketingFile("src/app/(marketing)/page.tsx");
    expect(home).not.toContain('id="thesis"');
    expect(home.indexOf("<Hero")).toBeLessThan(home.indexOf("<Problem"));
    expect(home.indexOf("<Problem")).toBeLessThan(home.indexOf("<Who"));
    expect(home).toContain('href="/thesis"');
  });

  it("uses the three-item primary nav and demotes thesis", () => {
    const header = marketingFile("src/components/marketing/Header.tsx");
    expect(header).toContain("COPY.nav.how");
    expect(header).toContain("COPY.nav.who");
    expect(header).toContain("COPY.nav.talk");
    expect(header).not.toContain("/#thesis");
    expect(header).not.toContain("Thesis");
    const footer = marketingFile("src/components/marketing/Footer.tsx");
    expect(footer).toContain('href="/thesis"');
  });

  it("keeps a single CTA in the hero button row (no email chrome)", () => {
    const cta = marketingFile("src/components/marketing/FounderCta.tsx");
    expect(cta).toContain("no email sitting next to it");
    expect(cta).not.toContain("Or email");
    const home = marketingFile("src/app/(marketing)/page.tsx");
    expect(home).toContain("FounderCtaBlock");
    expect(home).toContain("founderEmailCtaLabel");
  });
});
