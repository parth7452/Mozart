import { FUNDING_POLICY } from "@/domain/policy";
import { prisma } from "@/lib/prisma";
import { runAdapter } from "./clients";
import {
  recommendForInvoice,
  hitlDecide,
} from "./credit";
import {
  attachDocument,
  confirmDebtor,
  createInvoice,
  extractInvoice,
  matchInvoice,
} from "./invoices";
import { enqueueCollections } from "./servicing";
import { createClient } from "./clients";

export const DEMO_CLIENT_NAME = "Harborline Staffing LLC";
export const DEMO_INVOICE_NUMBER = "INV-1042";
export const SMB_CLIENT_NAME = "Northfork Components";
export const SMB_INVOICE_NUMBER = "INV-2208";

export async function seedDemo() {
  const existing = await prisma.client.findFirst({ where: { name: DEMO_CLIENT_NAME } });
  if (existing) {
    return demoState();
  }

  const staffing = await createClient({
    name: DEMO_CLIENT_NAME,
    legalName: "Harborline Staffing LLC",
    vertical: "staffing",
  });
  if (!staffing) throw new Error("Failed to create staffing demo client");

  await runAdapter(staffing.id, "QBO");
  await runAdapter(staffing.id, "PLAID");
  await runAdapter(staffing.id, "KYB_AML");

  const { invoice } = await createInvoice({
    clientId: staffing.id,
    invoiceNumber: DEMO_INVOICE_NUMBER,
    debtorName: "Meridian Health Systems",
    amountCents: 4_875_000,
    issueDate: "2026-08-10",
    dueDate: "2026-09-09",
  });
  if (!invoice) throw new Error("Failed to create demo invoice");

  await attachDocument({
    invoiceId: invoice.id,
    kind: "INVOICE",
    filename: "INV-1042.pdf",
    mimeType: "application/pdf",
  });
  await attachDocument({
    invoiceId: invoice.id,
    kind: "TIMESHEET",
    filename: "timesheet-week-32.csv",
    mimeType: "text/csv",
  });
  await attachDocument({
    invoiceId: invoice.id,
    kind: "VMS",
    filename: "vms-export-mh.csv",
    mimeType: "text/csv",
  });

  const smb = await createClient({
    name: SMB_CLIENT_NAME,
    legalName: "Northfork Components Inc",
    vertical: "smb_supplier",
  });
  if (!smb) throw new Error("Failed to create SMB demo client");
  await runAdapter(smb.id, "XERO");
  await runAdapter(smb.id, "PLAID");
  await runAdapter(smb.id, "KYB_AML");

  const smbInv = await createInvoice({
    clientId: smb.id,
    invoiceNumber: SMB_INVOICE_NUMBER,
    debtorName: "Keystone Fabrication",
    amountCents: 2_140_000,
    issueDate: "2026-08-08",
    dueDate: "2026-09-07",
  });
  if (!smbInv.invoice) throw new Error("Failed to create SMB invoice");
  await attachDocument({
    invoiceId: smbInv.invoice.id,
    kind: "INVOICE",
    filename: "INV-2208.pdf",
  });
  await attachDocument({
    invoiceId: smbInv.invoice.id,
    kind: "PO",
    filename: "PO-77821.pdf",
  });
  await attachDocument({
    invoiceId: smbInv.invoice.id,
    kind: "DELIVERY",
    filename: "PS-4419.pdf",
  });

  return demoState();
}

export async function demoState() {
  const client = await prisma.client.findFirst({
    where: { name: DEMO_CLIENT_NAME },
    include: { adapterRuns: true, reserve: true, ucc1: true },
  });
  const invoice = client
    ? await prisma.invoice.findFirst({
        where: { clientId: client.id, invoiceNumber: DEMO_INVOICE_NUMBER },
        include: {
          documents: true,
          extract: true,
          match: true,
          confirmation: true,
          credit: true,
        },
      })
    : null;
  const smb = await prisma.client.findFirst({
    where: { name: SMB_CLIENT_NAME },
    include: {
      invoices: {
        include: { extract: true, documents: true },
      },
    },
  });

  return {
    policy: FUNDING_POLICY,
    client,
    invoice,
    smb,
    steps: {
      seeded: Boolean(client && invoice),
      extracted: Boolean(invoice?.extract),
      matched: Boolean(invoice?.match),
      confirmed: Boolean(invoice?.confirmation),
      recommended: Boolean(invoice?.credit),
      hitlDone: invoice?.credit?.status === "APPROVED" || invoice?.credit?.status === "REJECTED",
      readyToFund: invoice?.fundingState === "READY_TO_FUND",
    },
  };
}

export async function runDemoStep(step: string) {
  const state = await demoState();
  if (!state.invoice) {
    throw new Error("Seed the demo first");
  }
  const id = state.invoice.id;

  switch (step) {
    case "extract":
      return { invoice: await extractInvoice(id), policy: FUNDING_POLICY };
    case "match":
      await extractInvoice(id);
      return { invoice: await matchInvoice(id), policy: FUNDING_POLICY };
    case "confirm":
      return { invoice: await confirmDebtor(id), policy: FUNDING_POLICY };
    case "recommend":
      await extractInvoice(id);
      await matchInvoice(id);
      await confirmDebtor(id);
      return { invoice: await recommendForInvoice(id), policy: FUNDING_POLICY };
    case "approve":
      await extractInvoice(id);
      await matchInvoice(id);
      await confirmDebtor(id);
      const recommended = await recommendForInvoice(id);
      if (recommended?.fundingState === "PENDING_HITL") {
        const decided = await hitlDecide(id, "approve");
        await enqueueCollections(id);
        return decided;
      }
      return { invoice: recommended, policy: FUNDING_POLICY, funded: false, payoutCreated: false };
    case "smb_extract": {
      const smbInvoice = state.smb?.invoices[0];
      if (!smbInvoice) throw new Error("SMB demo invoice missing");
      return { invoice: await extractInvoice(smbInvoice.id), policy: FUNDING_POLICY };
    }
    default:
      throw new Error(`Unknown demo step "${step}"`);
  }
}

/** Full demo path used by smoke tests. Always HITL, never funds. */
export async function runDemoPath() {
  await seedDemo();
  const afterExtract = await runDemoStep("extract");
  const afterMatch = await runDemoStep("match");
  const afterRecommend = await runDemoStep("recommend");
  const beforeHitlState = afterRecommend.invoice?.fundingState;
  const afterHitl = await runDemoStep("approve");
  const smb = await runDemoStep("smb_extract");

  return {
    policy: FUNDING_POLICY,
    staffingExtract: afterExtract.invoice?.extract,
    match: afterMatch.invoice?.match,
    beforeHitl: beforeHitlState,
    afterHitl: afterHitl.invoice?.fundingState,
    creditStatus: afterHitl.invoice?.credit?.status,
    funded: "funded" in afterHitl ? afterHitl.funded : false,
    payoutCreated: "payoutCreated" in afterHitl ? afterHitl.payoutCreated : false,
    smbVertical: smb.invoice?.extract?.vertical,
    smbPayload: smb.invoice?.extract?.payload,
  };
}
