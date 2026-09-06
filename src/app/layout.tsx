import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FundingBanner } from "@/components/Banner";
import { Nav } from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mozart — ops console",
  description: "Invoice factoring ops scaffold. No live funding.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <FundingBanner />
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
