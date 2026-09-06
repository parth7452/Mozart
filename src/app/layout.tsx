import type { Metadata } from "next";
import type { ReactNode } from "react";
import { META_DESCRIPTION, SITE_NAME, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE_NAME} — AI-native invoice factoring`,
    template: `%s · ${SITE_NAME}`,
  },
  description: META_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "invoice factoring",
    "accounts receivable",
    "staffing payroll",
    "SMB suppliers",
    "AR finance",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
