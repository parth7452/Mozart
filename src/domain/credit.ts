import { FUNDING_POLICY, assertNoAutoFund } from "./policy";
import type { CreditStatus, FundingState } from "./states";

export type FraudFlag =
  | "ROUND_DOLLAR_INVOICE"
  | "NEW_DEBTOR"
  | "SUPPORT_MISMATCH"
  | "DUPLICATE_INVOICE"
  | "KYB_NOT_PASS"
  | "BOOKS_MISMATCH";

export type CreditInputs = {
  amountCents: number;
  matchOverall: number;
  invoiceToSupport: number;
  invoiceToBooks: number;
  isDuplicate: boolean;
  debtorConfirmed: boolean;
  kybStatus: string;
  knownDebtor: boolean;
};

export type CreditRecommendationDraft = {
  riskScore: number;
  dilutionBps: number;
  fraudFlags: FraudFlag[];
  recommendedAdvancePct: number;
  recommendedReservePct: number;
  rationale: string;
  status: CreditStatus;
};

export function recommendCredit(input: CreditInputs): CreditRecommendationDraft {
  assertNoAutoFund();

  const flags: FraudFlag[] = [];
  if (input.amountCents % 10000 === 0) flags.push("ROUND_DOLLAR_INVOICE");
  if (!input.knownDebtor) flags.push("NEW_DEBTOR");
  if (input.invoiceToSupport < 70) flags.push("SUPPORT_MISMATCH");
  if (input.invoiceToBooks < 70) flags.push("BOOKS_MISMATCH");
  if (input.isDuplicate) flags.push("DUPLICATE_INVOICE");
  if (input.kybStatus !== "PASS") flags.push("KYB_NOT_PASS");

  let risk = 20;
  risk += Math.max(0, 85 - input.matchOverall);
  risk += flags.length * 8;
  if (!input.debtorConfirmed) risk += 10;
  risk = clamp(risk, 5, 95);

  const dilutionBps = 80 + flags.length * 40 + Math.round((100 - input.matchOverall) * 2);
  let advance = 85 - Math.round(risk / 4) - flags.length * 3;
  advance = clamp(advance, 50, 85);
  const reserve = clamp(100 - advance - 5, 10, 35);

  const rationale = [
    `Shadow score ${risk}/100 from match ${input.matchOverall} and ${flags.length} flag(s).`,
    input.debtorConfirmed ? "Debtor confirmation present (stub)." : "Debtor confirmation not complete.",
    `Recommend ${advance}% advance / ${reserve}% reserve. Dilution ~${dilutionBps} bps.`,
    "Credit v1 is recommend-only. A credit officer must approve before ready-to-fund.",
  ].join(" ");

  return {
    riskScore: risk,
    dilutionBps,
    fraudFlags: flags,
    recommendedAdvancePct: advance,
    recommendedReservePct: reserve,
    rationale,
    status: FUNDING_POLICY.creditMode === "shadow" ? "SHADOW" : "PENDING_HITL",
  };
}

export function fundingStateAfterRecommend(isDuplicate: boolean): FundingState {
  assertNoAutoFund();
  if (isDuplicate) return "BLOCKED";
  return "PENDING_HITL";
}

export function fundingStateAfterHitl(decision: "approve" | "reject"): FundingState {
  assertNoAutoFund();
  if (decision === "reject") return "BLOCKED";
  return "READY_TO_FUND";
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
