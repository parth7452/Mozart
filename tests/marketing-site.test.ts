import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  DEFAULT_FOUNDER_EMAIL,
  founderCtaHref,
  founderCtaLabel,
  founderEmail,
  founderMailto,
  HERO_FACTS,
  HERO_HEADLINE,
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

  it("frames the first screen as seller-side AR factoring, not AP finance", () => {
    const hero = HERO_HEADLINE.toLowerCase();
    expect(hero).toMatch(/we buy the invoices|ar factoring/);
    expect(hero).toContain("staffing");
    expect(hero).not.toMatch(/\bap\b|accounts payable|reverse factor|early.?pay/);

    const line = ONE_LINER.toLowerCase();
    expect(line).toMatch(/purchase receivables|buy.*receivable/);
    expect(line).toMatch(/before their customers pay|cash against/);
    expect(line).not.toMatch(/\bap\b|accounts payable/);

    expect(META_DESCRIPTION.toLowerCase()).toMatch(/invoice factoring/);
    expect(META_DESCRIPTION.toLowerCase()).toMatch(/\bar\b|receivable/);
    expect(META_DESCRIPTION).not.toMatch(/\bAP\b|accounts payable/);

    for (const fact of HERO_FACTS) {
      expect(fact.v).not.toMatch(/\bAP\b|accounts payable/i);
    }
    expect(HERO_FACTS[1]?.v.toLowerCase()).toMatch(/unpaid invoice|receivable|buyers pay/);
  });

  it("keeps public marketing routes free of AP-as-product framing", () => {
    const files = [
      "src/app/(marketing)/page.tsx",
      "src/app/(marketing)/privacy/page.tsx",
      "src/components/marketing/Header.tsx",
      "src/components/marketing/Footer.tsx",
    ];
    for (const file of files) {
      const text = readFileSync(join(process.cwd(), file), "utf8");
      expect(text, file).not.toMatch(/\bAP\b/);
      expect(text, file).not.toMatch(/accounts payable/i);
      expect(text, file).not.toMatch(/reverse factor/i);
      expect(text, file).not.toMatch(/dynamic discount/i);
    }
  });
});
