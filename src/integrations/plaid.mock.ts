import type { AdapterResult, BankLinkAdapter } from "./types";

export class MockPlaidAdapter implements BankLinkAdapter {
  readonly vendor = "plaid" as const;

  async connect(clientId: string): Promise<AdapterResult> {
    return {
      kind: "PLAID",
      status: "PASS",
      summary: "Mock Plaid Item linked. Balances and transactions are synthetic.",
      payload: {
        clientId,
        itemId: `plaid_item_${clientId.slice(0, 8)}`,
        institution: "First National Sandbox",
        accounts: [
          { id: "acc_operating", name: "Operating", mask: "4412", type: "depository" },
        ],
        liveCall: false,
      },
    };
  }

  async getConnection(clientId: string): Promise<AdapterResult> {
    return this.connect(clientId);
  }
}
