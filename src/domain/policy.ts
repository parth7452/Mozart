/**
 * Product policy for Phase 1. These flags are the source of truth
 * for "no live funding" and the mandatory human credit gate.
 */
export const FUNDING_POLICY = {
  liveFundingEnabled: false,
  autoFundEnabled: false,
  creditMode: "shadow" as const,
  requireHitlBeforeReadyToFund: true,
  requireAccountingAndBankBeforeFundPath: true,
  banner: "NO LIVE FUNDING — shadow credit / recommend-only. Human gate required.",
} as const;

export type CreditMode = typeof FUNDING_POLICY.creditMode;

export function assertNoLiveFunding(): void {
  if (FUNDING_POLICY.liveFundingEnabled) {
    throw new Error("Live funding is not permitted in this build.");
  }
}

export function assertNoAutoFund(): void {
  if (FUNDING_POLICY.autoFundEnabled) {
    throw new Error("Auto-fund is not permitted. Credit v1 is shadow / HITL only.");
  }
}

export function fundPathWouldOpen(input: {
  accountingConnected: boolean;
  bankConnected: boolean;
}): boolean {
  if (!FUNDING_POLICY.requireAccountingAndBankBeforeFundPath) return true;
  return input.accountingConnected && input.bankConnected;
}
