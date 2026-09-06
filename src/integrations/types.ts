import type { AccountingProvider, AdapterKind, CheckStatus } from "@/domain/states";

/**
 * Integration seams. Phase 1 ships mocks only — no live vendor calls,
 * no KYB spend, no ACH. Replace mock classes, keep these contracts.
 */
export type AdapterResult = {
  kind: AdapterKind;
  status: CheckStatus;
  summary: string;
  payload: Record<string, unknown>;
};

export type BankLinkAdapter = {
  readonly vendor: "plaid";
  connect(clientId: string): Promise<AdapterResult>;
  getConnection(clientId: string): Promise<AdapterResult>;
};

export type AccountingAdapter = {
  readonly provider: AccountingProvider;
  connect(clientId: string): Promise<AdapterResult>;
  pullOpenInvoices(clientId: string): Promise<StubBooksInvoice[]>;
};

export type KybInput = {
  clientId: string;
  legalName: string;
};

export type KybAmlAdapter = {
  readonly vendor: "kyb_aml";
  screen(input: KybInput): Promise<AdapterResult>;
};

export type StubBooksInvoice = {
  invoiceNumber: string;
  debtorName: string;
  amountCents: number;
};

export type DebtorConfirmAdapter = {
  requestConfirmation(input: {
    invoiceId: string;
    debtorName: string;
    amountCents: number;
  }): Promise<{ status: "STUB" | "PENDING"; contact: string; notes: string }>;
};
