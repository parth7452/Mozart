import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Sans, Instrument_Serif } from "next/font/google";
import { MarketingFooter } from "@/components/marketing/Footer";
import { MarketingHeader } from "@/components/marketing/Header";
import { META_DESCRIPTION, SITE_NAME } from "@/lib/site";

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
  title: `${SITE_NAME} — invoice factoring for staffing and suppliers`,
  description: META_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — invoice factoring for staffing and suppliers`,
    description: META_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — invoice factoring for staffing and suppliers`,
    description: META_DESCRIPTION,
  },
};

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${sans.variable} ${serif.variable} min-h-screen bg-stone font-marketing text-soot`}
    >
      <MarketingHeader />
      <main>{children}</main>
      <MarketingFooter />
    </div>
  );
}
