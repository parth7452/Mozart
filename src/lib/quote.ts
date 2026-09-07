import { z } from "zod";
import { founderEmail } from "@/lib/site";

export const VERTICAL_OPTIONS = [
  { value: "staffing", label: "Staffing" },
  { value: "supplier", label: "Supplier to enterprise or government" },
  { value: "other", label: "Other" },
] as const;

export const VOLUME_BANDS = [
  { value: "under_50k", label: "Under $50k / month" },
  { value: "50_150k", label: "$50k–$150k / month" },
  { value: "150_500k", label: "$150k–$500k / month" },
  { value: "500k_1m", label: "$500k–$1M / month" },
  { value: "1m_plus", label: "$1M+ / month" },
] as const;

export const TERMS_OPTIONS = [
  { value: "net_15", label: "Net 15" },
  { value: "net_30", label: "Net 30" },
  { value: "net_45", label: "Net 45" },
  { value: "net_60", label: "Net 60" },
  { value: "net_90", label: "Net 90+" },
  { value: "other", label: "Other / mixed" },
] as const;

export const DAYS_TO_PAY = [
  { value: "0_30", label: "0–30 days" },
  { value: "31_45", label: "31–45 days" },
  { value: "46_60", label: "46–60 days" },
  { value: "61_90", label: "61–90 days" },
  { value: "90_plus", label: "90+ days" },
] as const;

export const PLEDGED_OPTIONS = [
  { value: "no", label: "No — invoices are not pledged" },
  { value: "yes", label: "Yes — already pledged or on another facility" },
] as const;

export const QuoteSchema = z.object({
  company: z.string().trim().min(2, "Company name is required").max(200),
  vertical: z.enum(["staffing", "supplier", "other"], {
    required_error: "Choose a vertical",
  }),
  monthlyVolume: z.enum(["under_50k", "50_150k", "150_500k", "500k_1m", "1m_plus"], {
    required_error: "Choose monthly invoice volume",
  }),
  topCustomers: z.string().trim().min(2, "List your top customers").max(500),
  currentTerms: z.enum(["net_15", "net_30", "net_45", "net_60", "net_90", "other"], {
    required_error: "Choose current terms",
  }),
  avgDaysToPay: z.enum(["0_30", "31_45", "46_60", "61_90", "90_plus"], {
    required_error: "Choose average days-to-pay",
  }),
  pledged: z.enum(["yes", "no"], { required_error: "Say whether invoices are pledged" }),
  email: z.string().trim().email("A valid work email is required"),
  phone: z.string().trim().min(7, "Phone is required").max(40),
});

export type QuoteInput = z.infer<typeof QuoteSchema>;

function labelOf<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

export function formatQuoteEmail(input: QuoteInput): { subject: string; text: string } {
  const subject = `Quote request — ${input.company}`;
  const text = [
    "Mozart quote request (emailed lead — not a credit decision)",
    "",
    `Company: ${input.company}`,
    `Vertical: ${labelOf(VERTICAL_OPTIONS, input.vertical)}`,
    `Monthly invoice volume: ${labelOf(VOLUME_BANDS, input.monthlyVolume)}`,
    `Top 3 customers: ${input.topCustomers}`,
    `Current terms: ${labelOf(TERMS_OPTIONS, input.currentTerms)}`,
    `Avg days-to-pay: ${labelOf(DAYS_TO_PAY, input.avgDaysToPay)}`,
    `Already pledged: ${labelOf(PLEDGED_OPTIONS, input.pledged)}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
  ].join("\n");
  return { subject, text };
}

export function quoteMailto(input: QuoteInput): string {
  const { subject, text } = formatQuoteEmail(input);
  return `mailto:${founderEmail()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
}

export type QuoteDelivery =
  | { channel: "resend" }
  | { channel: "formspree" }
  | { channel: "mailto"; mailto: string };

export async function deliverQuote(input: QuoteInput): Promise<QuoteDelivery> {
  const { subject, text } = formatQuoteEmail(input);
  const to = founderEmail();

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    const from = process.env.RESEND_FROM?.trim() || "Mozart Quotes <onboarding@resend.dev>";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, reply_to: input.email, subject, text }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(detail || "Resend delivery failed");
    }
    return { channel: "resend" };
  }

  const formId = process.env.FORMSPREE_FORM_ID?.trim();
  if (formId) {
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...input,
        _subject: subject,
        message: text,
        email: input.email,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(detail || "Formspree delivery failed");
    }
    return { channel: "formspree" };
  }

  return { channel: "mailto", mailto: quoteMailto(input) };
}
