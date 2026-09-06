import {
  fundingStateAfterHitl,
  fundingStateAfterRecommend,
  recommendCredit,
} from "@/domain/credit";
import { FUNDING_POLICY, assertNoAutoFund, assertNoLiveFunding } from "@/domain/policy";
import { canDecideCredit, getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getInvoice } from "./invoices";

export async function recommendForInvoice(invoiceId: string) {
  assertNoAutoFund();
  const invoice = await getInvoice(invoiceId);
  if (!invoice) throw new Error("Invoice not found");
  if (!invoice.match) throw new Error("Match the invoice before credit");

  const knownDebtor = await prisma.invoice.count({
    where: { debtorName: invoice.debtorName, id: { not: invoiceId } },
  });

  const draft = recommendCredit({
    amountCents: invoice.amountCents,
    matchOverall: invoice.match.overall,
    invoiceToSupport: invoice.match.invoiceToSupport,
    invoiceToBooks: invoice.match.invoiceToBooks,
    isDuplicate: invoice.isDuplicate,
    debtorConfirmed: invoice.confirmation?.status === "CONFIRMED" || invoice.confirmation?.status === "STUB",
    kybStatus: invoice.client.kybStatus,
    knownDebtor: knownDebtor > 0,
  });

  const fundingState = fundingStateAfterRecommend(invoice.isDuplicate);

  await prisma.creditRecommendation.upsert({
    where: { invoiceId },
    create: {
      invoiceId,
      riskScore: draft.riskScore,
      dilutionBps: draft.dilutionBps,
      fraudFlags: JSON.stringify(draft.fraudFlags),
      recommendedAdvancePct: draft.recommendedAdvancePct,
      recommendedReservePct: draft.recommendedReservePct,
      rationale: draft.rationale,
      status: invoice.isDuplicate ? "REJECTED" : "PENDING_HITL",
    },
    update: {
      riskScore: draft.riskScore,
      dilutionBps: draft.dilutionBps,
      fraudFlags: JSON.stringify(draft.fraudFlags),
      recommendedAdvancePct: draft.recommendedAdvancePct,
      recommendedReservePct: draft.recommendedReservePct,
      rationale: draft.rationale,
      status: invoice.isDuplicate ? "REJECTED" : "PENDING_HITL",
      decidedBy: null,
      decidedAt: null,
    },
  });

  await prisma.invoice.update({
    where: { id: invoiceId },
    data: { fundingState },
  });

  return getInvoice(invoiceId);
}

export async function hitlDecide(invoiceId: string, decision: "approve" | "reject") {
  assertNoAutoFund();
  assertNoLiveFunding();
  const session = getSession();
  if (!canDecideCredit(session)) {
    throw new Error("HITL credit decision requires credit_officer or ops (auth stub).");
  }

  const invoice = await getInvoice(invoiceId);
  if (!invoice?.credit) throw new Error("No credit recommendation to decide");
  if (invoice.fundingState !== "PENDING_HITL") {
    throw new Error(`HITL only applies in PENDING_HITL (currently ${invoice.fundingState})`);
  }

  const fundingState = fundingStateAfterHitl(decision);
  if (fundingState === "READY_TO_FUND") {
    assertNoLiveFunding();
  }

  await prisma.creditRecommendation.update({
    where: { invoiceId },
    data: {
      status: decision === "approve" ? "APPROVED" : "REJECTED",
      decidedBy: session.name,
      decidedAt: new Date(),
    },
  });

  await prisma.invoice.update({
    where: { id: invoiceId },
    data: { fundingState },
  });

  if (decision === "approve") {
    const reserveCents = Math.round(
      (invoice.amountCents * invoice.credit.recommendedReservePct) / 100,
    );
    await prisma.reserveAccount.upsert({
      where: { clientId: invoice.clientId },
      create: {
        clientId: invoice.clientId,
        heldCents: reserveCents,
        releasedCents: 0,
        targetReservePct: invoice.credit.recommendedReservePct,
      },
      update: {
        heldCents: { increment: reserveCents },
        targetReservePct: invoice.credit.recommendedReservePct,
      },
    });
  }

  return {
    invoice: await getInvoice(invoiceId),
    policy: FUNDING_POLICY,
    funded: false,
    payoutCreated: false,
  };
}

export async function listCreditQueue() {
  return prisma.invoice.findMany({
    where: { fundingState: { in: ["PENDING_HITL", "READY_TO_FUND", "BLOCKED"] } },
    orderBy: { updatedAt: "desc" },
    include: { client: true, credit: true, match: true },
  });
}
