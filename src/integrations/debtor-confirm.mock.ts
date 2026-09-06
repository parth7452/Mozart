import type { DebtorConfirmAdapter } from "./types";

export class MockDebtorConfirmAdapter implements DebtorConfirmAdapter {
  async requestConfirmation(input: {
    invoiceId: string;
    debtorName: string;
    amountCents: number;
  }) {
    return {
      status: "STUB" as const,
      contact: `ap@${slug(input.debtorName)}.example`,
      notes: `Stub notice queued for ${input.debtorName} on invoice ${input.invoiceId} (${input.amountCents} cents). No email sent.`,
    };
  }
}

function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 18) || "debtor";
}
