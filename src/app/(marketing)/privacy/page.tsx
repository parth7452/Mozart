import type { Metadata } from "next";
import { founderEmail, SITE_NAME } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${SITE_NAME} treats information you send from the public site, including terms requests.`,
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-24 lg:px-8">
      <Badge variant="secondary">Legal-lite</Badge>
      <h1 className="mt-4 font-serif text-[2rem] font-normal tracking-tight sm:text-4xl">Privacy</h1>
      <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
        This is the public marketing site for Mozart, an invoice-factoring arranger for staffing
        firms and suppliers. The terms-request form emails the public inbox. It is not a partner
        underwriting system and it does not collect bank credentials.
      </p>

      <Separator className="my-10" />

      <h2 className="font-serif text-2xl font-normal tracking-tight">What we collect</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted-foreground">
        <li>
          If you submit a terms request, we receive the fields on that form: company, vertical,
          invoice-volume band, top customers, payment terms, days-to-pay, whether invoices are
          pledged, email, and phone. That message is emailed to{" "}
          <a className="break-all underline underline-offset-4 hover:text-foreground" href={`mailto:${founderEmail()}`}>
            {founderEmail()}
          </a>
          .
        </li>
        <li>
          If you email the public inbox, we see whatever you put in that message (typically your
          name, address, and what you chose to write).
        </li>
        <li>
          If a Calendly (or similar) booking link is configured, that provider processes the
          scheduling data under their own terms. We only see what they pass through on the
          booking.
        </li>
        <li>
          Hosting (Vercel) and DNS may log standard request metadata — IP, user-agent, path —
          as part of running a website. We do not sell that.
        </li>
      </ul>

      <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">What we do not collect here</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted-foreground">
        <li>No invoice-file upload, accounting login, or bank-link flow on this site.</li>
        <li>No customer logo wall, tracking pixels we control, or invented analytics claims.</li>
        <li>No product account creation on the public site.</li>
      </ul>

      <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">Contact</h2>
      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
        Questions:{" "}
        <a className="break-all underline underline-offset-4 hover:text-foreground" href={`mailto:${founderEmail()}`}>
          {founderEmail()}
        </a>
        . If we later add a partner application or production analytics, this page will change
        before we ask for more than a conversation or a terms request.
      </p>
    </article>
  );
}
