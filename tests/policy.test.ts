import { describe, expect, it } from "vitest";
import {
  FUNDING_POLICY,
  assertNoAutoFund,
  assertNoLiveFunding,
  fundPathWouldOpen,
} from "@/domain/policy";
import { recommendCredit, fundingStateAfterRecommend } from "@/domain/credit";
import { canTransition, FUNDING_TRANSITIONS, ONBOARDING_TRANSITIONS } from "@/domain/states";

describe("policy", () => {
  it("forbids live funding and auto-fund", () => {
    expect(FUNDING_POLICY.liveFundingEnabled).toBe(false);
    expect(FUNDING_POLICY.autoFundEnabled).toBe(false);
    expect(() => assertNoLiveFunding()).not.toThrow();
    expect(() => assertNoAutoFund()).not.toThrow();
  });

  it("opens fund path only after accounting + bank", () => {
    expect(fundPathWouldOpen({ accountingConnected: false, bankConnected: true })).toBe(false);
    expect(fundPathWouldOpen({ accountingConnected: true, bankConnected: false })).toBe(false);
    expect(fundPathWouldOpen({ accountingConnected: true, bankConnected: true })).toBe(true);
  });

  it("never recommends a funded state", () => {
    const rec = recommendCredit({
      amountCents: 10000,
      matchOverall: 90,
      invoiceToSupport: 90,
      invoiceToBooks: 90,
      isDuplicate: false,
      debtorConfirmed: true,
      kybStatus: "PASS",
      knownDebtor: true,
    });
    expect(rec.status).toBe("SHADOW");
    expect(fundingStateAfterRecommend(false)).toBe("PENDING_HITL");
    expect(canTransition(FUNDING_TRANSITIONS, "PENDING_HITL", "READY_TO_FUND")).toBe(true);
    expect(canTransition(ONBOARDING_TRANSITIONS, "IN_PROGRESS", "PASS")).toBe(true);
  });
});
