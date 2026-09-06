export const ONBOARDING_STATUSES = ["DRAFT", "IN_PROGRESS", "PASS", "REVIEW", "FAIL"] as const;
export type OnboardingStatus = (typeof ONBOARDING_STATUSES)[number];

export const CHECK_STATUSES = ["PENDING", "PASS", "REVIEW", "FAIL"] as const;
export type CheckStatus = (typeof CHECK_STATUSES)[number];

export const INVOICE_STATUSES = [
  "INGESTED",
  "EXTRACTED",
  "MATCHED",
  "CONFIRMED",
  "DUPLICATE",
  "REJECTED",
] as const;
export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

export const FUNDING_STATES = ["NOT_READY", "PENDING_HITL", "READY_TO_FUND", "BLOCKED"] as const;
export type FundingState = (typeof FUNDING_STATES)[number];

export const CREDIT_STATUSES = ["SHADOW", "PENDING_HITL", "APPROVED", "REJECTED"] as const;
export type CreditStatus = (typeof CREDIT_STATUSES)[number];

export const ADAPTER_KINDS = ["PLAID", "QBO", "XERO", "NETSUITE", "KYB_AML"] as const;
export type AdapterKind = (typeof ADAPTER_KINDS)[number];

export const ACCOUNTING_PROVIDERS = ["QBO", "XERO", "NETSUITE"] as const;
export type AccountingProvider = (typeof ACCOUNTING_PROVIDERS)[number];

export const DOC_KINDS = ["INVOICE", "TIMESHEET", "VMS", "PO", "DELIVERY", "OTHER"] as const;
export type DocKind = (typeof DOC_KINDS)[number];

export const DEBTOR_CONFIRM_STATUSES = ["PENDING", "CONFIRMED", "DISPUTED", "STUB"] as const;
export type DebtorConfirmStatus = (typeof DEBTOR_CONFIRM_STATUSES)[number];

export const COLLECTION_CADENCES = ["DAY_0", "DAY_7", "DAY_15", "DAY_30", "DAY_45"] as const;
export type CollectionCadence = (typeof COLLECTION_CADENCES)[number];

export const COLLECTION_STATUSES = ["QUEUED", "SENT", "RESPONDED", "CLOSED"] as const;
export type CollectionStatus = (typeof COLLECTION_STATUSES)[number];

export const UCC1_STATUSES = [
  "NOT_STARTED",
  "DRAFTED",
  "FILED",
  "PERFECTED",
  "LAPSED",
  "TERMINATED",
] as const;
export type Ucc1Status = (typeof UCC1_STATUSES)[number];

export const ONBOARDING_TRANSITIONS: Record<OnboardingStatus, OnboardingStatus[]> = {
  DRAFT: ["IN_PROGRESS", "FAIL"],
  IN_PROGRESS: ["PASS", "REVIEW", "FAIL"],
  PASS: ["REVIEW"],
  REVIEW: ["PASS", "FAIL"],
  FAIL: ["REVIEW"],
};

export const FUNDING_TRANSITIONS: Record<FundingState, FundingState[]> = {
  NOT_READY: ["PENDING_HITL", "BLOCKED"],
  PENDING_HITL: ["READY_TO_FUND", "BLOCKED", "NOT_READY"],
  READY_TO_FUND: ["BLOCKED"],
  BLOCKED: ["NOT_READY", "PENDING_HITL"],
};

export const UCC1_TRANSITIONS: Record<Ucc1Status, Ucc1Status[]> = {
  NOT_STARTED: ["DRAFTED"],
  DRAFTED: ["FILED", "NOT_STARTED"],
  FILED: ["PERFECTED", "LAPSED"],
  PERFECTED: ["LAPSED", "TERMINATED"],
  LAPSED: ["FILED", "TERMINATED"],
  TERMINATED: [],
};

export function canTransition<T extends string>(
  map: Record<T, T[]>,
  from: T,
  to: T,
): boolean {
  return map[from]?.includes(to) ?? false;
}

export function assertTransition<T extends string>(
  map: Record<T, T[]>,
  from: T,
  to: T,
  label: string,
): void {
  if (!canTransition(map, from, to)) {
    throw new Error(`Invalid ${label} transition ${from} → ${to}`);
  }
}
