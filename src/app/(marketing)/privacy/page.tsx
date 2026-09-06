import type { Metadata } from "next";
import { founderEmail, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${SITE_NAME} treats information on this research-stage site. We do not run a funding application here.`,
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brass">Legal-lite</p>
      <h1 className="mt-4 font-serif text-4xl tracking-tight">Privacy</h1>
      <p className="mt-6 text-[15px] leading-relaxed text-soot/75">
        This is a public marketing and early-access site for a research-stage
        invoice factoring project. It is not a funding portal and it is not
        built to collect invoices, bank credentials, or credit-file data.
      </p>

      <h2 className="mt-12 font-serif text-2xl tracking-tight">What we collect</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-soot/75">
        <li>
          If you email the founder, we see whatever you put in that message
          (typically your name, address, and what you chose to write).
        </li>
        <li>
          If a Cal.com (or similar) booking link is configured, that provider
          processes the scheduling data under their own terms. We only see what
          they pass through on the booking.
        </li>
        <li>
          Hosting (Vercel) and DNS may log standard request metadata — IP,
          user-agent, path — as part of running a website. We do not sell that.
        </li>
      </ul>

      <h2 className="mt-12 font-serif text-2xl tracking-tight">What we do not collect here</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-soot/75">
        <li>No invoice upload, accounting login, or bank-link flow on this site.</li>
        <li>No customer logo wall, tracking pixels we control, or invented analytics claims.</li>
        <li>No account creation. There is nothing to delete because there is no product login.</li>
      </ul>

      <h2 className="mt-12 font-serif text-2xl tracking-tight">Contact</h2>
      <p className="mt-4 text-[15px] leading-relaxed text-soot/75">
        Questions:{" "}
        <a className="underline decoration-hairline underline-offset-4" href={`mailto:${founderEmail()}`}>
          {founderEmail()}
        </a>
        . If we later add a real application or production analytics, this page
        will change before we ask for more than a conversation.
      </p>
    </article>
  );
}
