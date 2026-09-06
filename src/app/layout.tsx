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
      <body className="font-sans antialiased">
        <FundingBanner />
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
