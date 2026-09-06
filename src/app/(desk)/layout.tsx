import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FundingBanner } from "@/components/Banner";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Mozart — invoice factoring ops",
  description: "US invoice factoring ops scaffold (staffing + SMB supplier). No live funding.",
  robots: { index: false, follow: false },
};

export default function DeskLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <FundingBanner />
      <Nav />
      <main>{children}</main>
    </div>
  );
}
