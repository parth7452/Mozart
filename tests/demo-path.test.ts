import { beforeEach, describe, expect, it } from "vitest";
import { FUNDING_POLICY } from "@/domain/policy";
import { parseExtract } from "@/domain/extract";
import { prisma } from "@/lib/prisma";
import { runDemoPath, seedDemo, DEMO_INVOICE_NUMBER } from "@/server/demo";
import { recommendForInvoice, hitlDecide } from "@/server/credit";
import { createInvoice } from "@/server/invoices";

describe("demo path", () => {
  beforeEach(async () => {
    await prisma.client.deleteMany();
  });

  it("walks fake invoice → extract → HITL and never auto-funds", async () => {
    const result = await runDemoPath();

    expect(FUNDING_POLICY.liveFundingEnabled).toBe(false);
    expect(FUNDING_POLICY.autoFundEnabled).toBe(false);
    expect(result.funded).toBe(false);
    expect(result.payoutCreated).toBe(false);

    expect(result.staffingExtract?.vertical).toBe("staffing");
    const staffing = parseExtract("staffing", JSON.parse(result.staffingExtract!.payload));
    expect(staffing).toMatchObject({
      invoiceNumber: DEMO_INVOICE_NUMBER,
      timesheet: { workerCount: 8, vmsReference: "MH-VMS-8831" },
    });

    expect(result.match?.overall).toBeGreaterThan(70);
    expect(result.beforeHitl).toBe("PENDING_HITL");
    expect(result.afterHitl).toBe("READY_TO_FUND");
    expect(result.creditStatus).toBe("APPROVED");

    expect(result.smbVertical).toBe("smb_supplier");
    const smb = parseExtract("smb_supplier", JSON.parse(result.smbPayload!));
    expect(smb).toMatchObject({
      purchaseOrder: { poNumber: "PO-77821" },
      delivery: { packingSlip: "PS-4419" },
    });
  });

  it("blocks ready-to-fund without HITL and flags duplicates", async () => {
    await seedDemo();
    const staffing = await prisma.client.findFirst({ where: { vertical: "staffing" } });
    expect(staffing).toBeTruthy();

    const first = await prisma.invoice.findFirst({
      where: { invoiceNumber: DEMO_INVOICE_NUMBER },
    });
    expect(first).toBeTruthy();

    const dup = await createInvoice({
      clientId: staffing!.id,
      invoiceNumber: DEMO_INVOICE_NUMBER,
      debtorName: "Meridian Health Systems",
      amountCents: 4_875_000,
      issueDate: "2026-08-10",
      dueDate: "2026-09-09",
    });
    expect(dup.invoice?.isDuplicate).toBe(true);
    expect(dup.invoice?.fundingState).toBe("BLOCKED");
    expect(dup.duplicates.length).toBeGreaterThan(0);

    await prisma.invoice.update({
      where: { id: first!.id },
      data: { fundingState: "NOT_READY" },
    });
    await expect(hitlDecide(first!.id, "approve")).rejects.toThrow(/PENDING_HITL/);
  });

  it("keeps credit recommend-only until a human decides", async () => {
    await seedDemo();
    const invoice = await prisma.invoice.findFirst({
      where: { invoiceNumber: DEMO_INVOICE_NUMBER },
    });
    const { extractInvoice, matchInvoice, confirmDebtor } = await import("@/server/invoices");
    await extractInvoice(invoice!.id);
    await matchInvoice(invoice!.id);
    await confirmDebtor(invoice!.id);
    const rec = await recommendForInvoice(invoice!.id);
    expect(rec?.fundingState).toBe("PENDING_HITL");
    expect(rec?.credit?.status).toBe("PENDING_HITL");
    expect(rec?.fundingState).not.toBe("READY_TO_FUND");
  });
});
