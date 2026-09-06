import type { AdapterResult, KybAmlAdapter, KybInput } from "./types";

export class MockKybAmlAdapter implements KybAmlAdapter {
  readonly vendor = "kyb_aml" as const;

  async screen(input: KybInput): Promise<AdapterResult> {
    const review = /hold|watch|risk/i.test(input.legalName);
    return {
      kind: "KYB_AML",
      status: review ? "REVIEW" : "PASS",
      summary: review
        ? "Mock KYB hit a review keyword in the legal name. No vendor spend."
        : "Mock KYB/AML screen clear. No vendor API call or KYB spend.",
      payload: {
        clientId: input.clientId,
        legalName: input.legalName,
        tinMatch: true,
        ofac: "clear",
        liveCall: false,
        vendorSpendCents: 0,
      },
    };
  }
}
