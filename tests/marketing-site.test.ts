import { afterEach, describe, expect, it } from "vitest";
import {
  DEFAULT_FOUNDER_EMAIL,
  founderCtaHref,
  founderCtaLabel,
  founderEmail,
  founderMailto,
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
});
