import {
  COLLECTION_CADENCES,
  UCC1_TRANSITIONS,
  assertTransition,
  type CollectionCadence,
  type CollectionStatus,
  type Ucc1Status,
} from "@/domain/states";
import { FUNDING_POLICY, assertNoLiveFunding } from "@/domain/policy";
import { prisma } from "@/lib/prisma";
import { getInvoice } from "./invoices";

export async function getServicingSnapshot() {
  const [reserves, collections, cashApps, filings, invoices] = await Promise.all([
    prisma.reserveAccount.findMany({ include: { client: true } }),
    prisma.collectionItem.findMany({
      orderBy: { dueAt: "asc" },
      include: { invoice: { include: { client: true } } },
    }),
    prisma.cashApplication.findMany({
      orderBy: { appliedAt: "desc" },
      include: { invoice: { include: { client: true } } },
    }),
    prisma.ucc1Filing.findMany({ include: { client: true } }),
    prisma.invoice.findMany({ include: { client: true, credit: true } }),
  ]);
  return { reserves, collections, cashApps, filings, invoices, policy: FUNDING_POLICY };
}

export async function applyCashStub(input: {
  invoiceId: string;
  amountCents: number;
  note?: string;
}) {
  assertNoLiveFunding();
  const invoice = await getInvoice(input.invoiceId);
  if (!invoice) throw new Error("Invoice not found");

  const app = await prisma.cashApplication.create({
    data: {
      invoiceId: input.invoiceId,
      amountCents: input.amountCents,
      source: "STUB",
      note: input.note ?? "Cash application stub. No lockbox or ACH.",
    },
  });

  if (invoice.credit && input.amountCents >= invoice.amountCents) {
    const reserveSlice = Math.round(
      (invoice.amountCents * invoice.credit.recommendedReservePct) / 100,
    );
    await prisma.reserveAccount.updateMany({
      where: { clientId: invoice.clientId, heldCents: { gte: reserveSlice } },
      data: {
        heldCents: { decrement: reserveSlice },
        releasedCents: { increment: reserveSlice },
      },
    });
  }

  return { application: app, liveMoneyMoved: false };
}

export async function enqueueCollections(invoiceId: string) {
  const invoice = await getInvoice(invoiceId);
  if (!invoice) throw new Error("Invoice not found");

  const existing = await prisma.collectionItem.count({ where: { invoiceId } });
  if (existing > 0) return prisma.collectionItem.findMany({ where: { invoiceId } });

  const start = invoice.dueDate;
  const offsets: Record<CollectionCadence, number> = {
    DAY_0: 0,
    DAY_7: 7,
    DAY_15: 15,
    DAY_30: 30,
    DAY_45: 45,
  };

  await prisma.collectionItem.createMany({
    data: COLLECTION_CADENCES.map((cadence) => ({
      invoiceId,
      cadence,
      dueAt: addDays(start, offsets[cadence]),
      status: "QUEUED",
      note: "Collection cadence stub. No notices sent.",
    })),
  });

  return prisma.collectionItem.findMany({ where: { invoiceId }, orderBy: { dueAt: "asc" } });
}

export async function advanceCollection(id: string, status: CollectionStatus) {
  return prisma.collectionItem.update({ where: { id }, data: { status } });
}

export async function transitionUcc1(clientId: string, next: Ucc1Status) {
  const filing = await prisma.ucc1Filing.findUnique({ where: { clientId } });
  if (!filing) throw new Error("UCC-1 record missing");
  assertTransition(UCC1_TRANSITIONS, filing.status as Ucc1Status, next, "UCC-1");
  return prisma.ucc1Filing.update({
    where: { clientId },
    data: {
      status: next,
      filedAt: next === "FILED" || next === "PERFECTED" ? new Date() : filing.filedAt,
      notes: "UCC-1 filing stub. No SOS transmission.",
    },
  });
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}
