import { MockDebtorConfirmAdapter } from "@/integrations";
import { prisma } from "@/lib/prisma";
import type { DocKind } from "@/domain/states";
import { assertVertical } from "@/domain/verticals";
import { mockExtract, scoreMatch } from "./extract-engine";
import type { InvoiceBundle } from "./serialize";
import { accountingAdapterFor } from "@/integrations";
import type { AccountingProvider } from "@/domain/states";

const debtorConfirm = new MockDebtorConfirmAdapter();

export async function listInvoices() {
  return prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      client: true,
      documents: true,
      extract: true,
      match: true,
      confirmation: true,
      credit: true,
    },
  });
}

export async function getInvoice(id: string): Promise<InvoiceBundle | null> {
  return prisma.invoice.findUnique({
    where: { id },
    include: {
      client: true,
      documents: true,
      extract: true,
      match: true,
      confirmation: true,
      credit: true,
      cashApps: true,
      collections: { orderBy: { dueAt: "asc" } },
    },
  });
}

export async function createInvoice(input: {
  clientId: string;
  invoiceNumber: string;
  debtorName: string;
  amountCents: number;
  issueDate: string;
  dueDate: string;
}) {
  const client = await prisma.client.findUnique({ where: { id: input.clientId } });
  if (!client) throw new Error("Client not found");

  const dups = await findDuplicates({
    clientId: input.clientId,
    invoiceNumber: input.invoiceNumber,
    debtorName: input.debtorName,
    amountCents: input.amountCents,
  });

  const invoice = await prisma.invoice.create({
    data: {
      clientId: input.clientId,
      invoiceNumber: input.invoiceNumber.trim(),
      debtorName: input.debtorName.trim(),
      amountCents: input.amountCents,
      issueDate: new Date(input.issueDate),
      dueDate: new Date(input.dueDate),
      status: dups.length ? "DUPLICATE" : "INGESTED",
      isDuplicate: dups.length > 0,
      duplicateOfId: dups[0]?.id ?? null,
      fundingState: dups.length ? "BLOCKED" : "NOT_READY",
    },
  });

  return { invoice: await getInvoice(invoice.id), duplicates: dups };
}

export async function attachDocument(input: {
  invoiceId: string;
  kind: DocKind;
  filename: string;
  mimeType?: string;
}) {
  await prisma.document.create({
    data: {
      invoiceId: input.invoiceId,
      kind: input.kind,
      filename: input.filename,
      mimeType: input.mimeType ?? "application/octet-stream",
      stubPath: `stub://docs/${input.invoiceId}/${input.filename}`,
    },
  });
  return getInvoice(input.invoiceId);
}

export async function findDuplicates(input: {
  clientId: string;
  invoiceNumber: string;
  debtorName: string;
  amountCents: number;
  excludeId?: string;
}) {
  return prisma.invoice.findMany({
    where: {
      AND: [
        input.excludeId ? { id: { not: input.excludeId } } : {},
        {
          OR: [
            {
              clientId: input.clientId,
              invoiceNumber: input.invoiceNumber,
            },
            {
              invoiceNumber: input.invoiceNumber,
              debtorName: input.debtorName,
            },
            {
              clientId: input.clientId,
              debtorName: input.debtorName,
              amountCents: input.amountCents,
              invoiceNumber: input.invoiceNumber,
            },
          ],
        },
      ],
    },
    select: { id: true, invoiceNumber: true, debtorName: true, amountCents: true, clientId: true },
  });
}

export async function extractInvoice(invoiceId: string) {
  const invoice = await getInvoice(invoiceId);
  if (!invoice) throw new Error("Invoice not found");
  const vertical = assertVertical(invoice.client.vertical);
  const payload = mockExtract({
    vertical,
    invoiceNumber: invoice.invoiceNumber,
    debtorName: invoice.debtorName,
    amountCents: invoice.amountCents,
    documents: invoice.documents,
  });

  await prisma.extractResult.upsert({
    where: { invoiceId },
    create: { invoiceId, vertical, payload: JSON.stringify(payload) },
    update: { vertical, payload: JSON.stringify(payload) },
  });

  if (!invoice.isDuplicate) {
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: "EXTRACTED" },
    });
  }

  return getInvoice(invoiceId);
}

export async function matchInvoice(invoiceId: string) {
  const invoice = await getInvoice(invoiceId);
  if (!invoice) throw new Error("Invoice not found");
  if (!invoice.extract) throw new Error("Extract the invoice first");
  const vertical = assertVertical(invoice.client.vertical);
  const payload = JSON.parse(invoice.extract.payload);

  let booksHit = false;
  if (invoice.client.accountingConnected && invoice.client.accountingProvider) {
    const adapter = accountingAdapterFor(invoice.client.accountingProvider as AccountingProvider);
    const books = await adapter.pullOpenInvoices(invoice.clientId);
    booksHit = books.some(
      (b) => b.invoiceNumber === invoice.invoiceNumber && b.amountCents === invoice.amountCents,
    );
  }

  const scores = scoreMatch({
    vertical,
    documents: invoice.documents,
    extract: payload,
    booksHit,
  });

  await prisma.matchResult.upsert({
    where: { invoiceId },
    create: { invoiceId, ...scores },
    update: scores,
  });

  if (!invoice.isDuplicate) {
    await prisma.invoice.update({ where: { id: invoiceId }, data: { status: "MATCHED" } });
  }

  return getInvoice(invoiceId);
}

export async function confirmDebtor(invoiceId: string) {
  const invoice = await getInvoice(invoiceId);
  if (!invoice) throw new Error("Invoice not found");
  const stub = await debtorConfirm.requestConfirmation({
    invoiceId,
    debtorName: invoice.debtorName,
    amountCents: invoice.amountCents,
  });
  await prisma.debtorConfirmation.upsert({
    where: { invoiceId },
    create: {
      invoiceId,
      status: stub.status,
      notes: stub.notes,
      stubContact: stub.contact,
    },
    update: {
      status: stub.status,
      notes: stub.notes,
      stubContact: stub.contact,
    },
  });
  if (!invoice.isDuplicate) {
    await prisma.invoice.update({ where: { id: invoiceId }, data: { status: "CONFIRMED" } });
  }
  return getInvoice(invoiceId);
}
