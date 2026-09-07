import { afterEach, describe, expect, it, vi } from "vitest";
import { deliverQuote, formatQuoteEmail, QuoteSchema } from "@/lib/quote";

const sample = {
  company: "Harborline Staffing",
  vertical: "staffing" as const,
  monthlyVolume: "150_500k" as const,
  topCustomers: "Mercy Hospital, North Warehouse, City Transit",
  currentTerms: "net_45" as const,
  avgDaysToPay: "46_60" as const,
  pledged: "no" as const,
  email: "ops@harborline.example",
  phone: "555-0100",
};

describe("quote request", () => {
  const saved = {
    resend: process.env.RESEND_API_KEY,
    formspree: process.env.FORMSPREE_FORM_ID,
  };

  afterEach(() => {
    if (saved.resend === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = saved.resend;
    if (saved.formspree === undefined) delete process.env.FORMSPREE_FORM_ID;
    else process.env.FORMSPREE_FORM_ID = saved.formspree;
    vi.unstubAllGlobals();
  });

  it("requires the lead-gen fields", () => {
    expect(QuoteSchema.safeParse({}).success).toBe(false);
    expect(QuoteSchema.safeParse(sample).success).toBe(true);
    expect(QuoteSchema.safeParse({ ...sample, email: "not-an-email" }).success).toBe(false);
  });

  it("formats an emailed lead, not a CRM record", () => {
    const { subject, text } = formatQuoteEmail(sample);
    expect(subject).toBe("Quote request — Harborline Staffing");
    expect(text).toContain("emailed lead — not a credit decision");
    expect(text).toContain("Staffing");
    expect(text).toContain("Mercy Hospital");
  });

  it("falls back to mailto when no email provider is configured", async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.FORMSPREE_FORM_ID;
    const delivery = await deliverQuote(sample);
    expect(delivery.channel).toBe("mailto");
    if (delivery.channel === "mailto") {
      expect(delivery.mailto).toContain("mailto:parth@mozart.financial");
      expect(delivery.mailto).toContain("Harborline");
    }
  });

  it("posts to Resend when an API key is present", async () => {
    process.env.RESEND_API_KEY = "re_test";
    delete process.env.FORMSPREE_FORM_ID;
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, text: async () => "" });
    vi.stubGlobal("fetch", fetchMock);
    await expect(deliverQuote(sample)).resolves.toEqual({ channel: "resend" });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({ method: "POST" }),
    );
  });
});
