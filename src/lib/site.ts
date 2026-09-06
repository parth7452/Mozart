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

export const ONE_LINER =
  "AI-native invoice factoring — AR cash for staffing firms and SMB suppliers to enterprise and government.";

export const META_DESCRIPTION =
  "Mozart is a research-stage, AI-native US invoice factoring product for staffing owners/CFOs and SMB suppliers. This site does not offer live funding.";
