import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Sans, Instrument_Serif } from "next/font/google";
import { MarketingFooter } from "@/components/marketing/Footer";
import { MarketingHeader } from "@/components/marketing/Header";
import { MarketingHtmlZoom } from "@/components/marketing/HtmlZoom";
import { META_DESCRIPTION, META_TITLE, SITE_NAME } from "@/lib/site";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-marketing-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marketing-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: META_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: META_DESCRIPTION,
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: META_TITLE,
    description: META_DESCRIPTION,
  },
};

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${sans.variable} ${serif.variable} marketing-zoom flex min-h-screen flex-col overflow-x-clip bg-background font-marketing text-foreground`}
    >
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.classList.add("marketing-zoom");`,
        }}
      />
      <MarketingHtmlZoom />
      <MarketingHeader />
      <main className="min-w-0 flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}
