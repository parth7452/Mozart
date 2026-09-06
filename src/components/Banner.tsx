import { FUNDING_POLICY } from "@/domain/policy";

export function FundingBanner() {
  return (
    <div className="bg-crimson text-cream px-4 py-2 text-center text-[13px] font-medium tracking-wide">
      {FUNDING_POLICY.banner}
    </div>
  );
}
