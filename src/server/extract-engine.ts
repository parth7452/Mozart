import { parseExtract, type ExtractPayload } from "@/domain/extract";
import type { DocKind } from "@/domain/states";
import type { Vertical } from "@/domain/verticals";

export type IngestDoc = { kind: DocKind; filename: string };

export function mockExtract(input: {
  vertical: Vertical;
  invoiceNumber: string;
  debtorName: string;
  amountCents: number;
  documents: IngestDoc[];
}): ExtractPayload {
  if (input.vertical === "staffing") {
    const vms = input.documents.find((d) => d.kind === "VMS");
    return parseExtract("staffing", {
      invoiceNumber: input.invoiceNumber,
      debtorName: input.debtorName,
      amountCents: input.amountCents,
      timesheet: {
        periodStart: "2026-08-03",
        periodEnd: "2026-08-09",
        totalHours: 320,
        workerCount: 8,
        vmsReference: vms ? "MH-VMS-8831" : "UNMATCHED",
        billRateCents: 15234,
      },
    });
  }

  const po = input.documents.find((d) => d.kind === "PO");
  return parseExtract("smb_supplier", {
    invoiceNumber: input.invoiceNumber,
    debtorName: input.debtorName,
    amountCents: input.amountCents,
    purchaseOrder: {
      poNumber: po ? "PO-77821" : "MISSING",
      poDate: "2026-07-28",
    },
    delivery: {
      deliveryDate: "2026-08-06",
      packingSlip: "PS-4419",
      shipTo: "Northfork DC — Allentown, PA",
      lineCount: 14,
    },
  });
}

export function scoreMatch(input: {
  vertical: Vertical;
  documents: IngestDoc[];
  extract: ExtractPayload;
  booksHit: boolean;
}): { invoiceToSupport: number; invoiceToBooks: number; overall: number; notes: string } {
  const needed = input.vertical === "staffing" ? (["TIMESHEET", "VMS"] as DocKind[]) : (["PO", "DELIVERY"] as DocKind[]);
  const present = needed.filter((k) => input.documents.some((d) => d.kind === k)).length;
  let support = 55 + present * 20;
  if (input.vertical === "staffing" && "timesheet" in input.extract) {
    if (input.extract.timesheet.vmsReference === "UNMATCHED") support -= 15;
  }
  if (input.vertical === "smb_supplier" && "purchaseOrder" in input.extract) {
    if (input.extract.purchaseOrder.poNumber === "MISSING") support -= 15;
  }
  support = Math.min(98, Math.max(40, support));
  const books = input.booksHit ? 88 : 62;
  const overall = Math.round(support * 0.6 + books * 0.4);
  const notes = `${present}/${needed.length} vertical support docs. Books ${input.booksHit ? "hit" : "miss"} on mock pull.`;
  return { invoiceToSupport: support, invoiceToBooks: books, overall, notes };
}
