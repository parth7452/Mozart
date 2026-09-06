import type { AccountingProvider } from "@/domain/states";
import type { AccountingAdapter, AdapterResult, StubBooksInvoice } from "./types";

export class MockAccountingAdapter implements AccountingAdapter {
  constructor(readonly provider: AccountingProvider) {}

  async connect(clientId: string): Promise<AdapterResult> {
    return {
      kind: this.provider,
      status: "PASS",
      summary: `Mock ${this.provider} company file connected. No live OAuth.`,
      payload: {
        clientId,
        realmId: `realm_${this.provider.toLowerCase()}_${clientId.slice(0, 6)}`,
        company: "Sandbox Company",
        liveCall: false,
      },
    };
  }

  async pullOpenInvoices(clientId: string): Promise<StubBooksInvoice[]> {
    void clientId;
    return [
      {
        invoiceNumber: "INV-1042",
        debtorName: "Meridian Health Systems",
        amountCents: 4875000,
      },
    ];
  }
}

export function accountingAdapterFor(provider: AccountingProvider): AccountingAdapter {
  return new MockAccountingAdapter(provider);
}
