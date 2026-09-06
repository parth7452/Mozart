import { z } from "zod";
import type { Vertical } from "./verticals";

export const StaffingExtractSchema = z.object({
  invoiceNumber: z.string(),
  debtorName: z.string(),
  amountCents: z.number().int().nonnegative(),
  timesheet: z.object({
    periodStart: z.string(),
    periodEnd: z.string(),
    totalHours: z.number().nonnegative(),
    workerCount: z.number().int().nonnegative(),
    vmsReference: z.string().optional(),
    billRateCents: z.number().int().nonnegative().optional(),
  }),
});

export const SmbSupplierExtractSchema = z.object({
  invoiceNumber: z.string(),
  debtorName: z.string(),
  amountCents: z.number().int().nonnegative(),
  purchaseOrder: z.object({
    poNumber: z.string(),
    poDate: z.string().optional(),
  }),
  delivery: z.object({
    deliveryDate: z.string(),
    packingSlip: z.string().optional(),
    shipTo: z.string().optional(),
    lineCount: z.number().int().nonnegative(),
  }),
});

export type StaffingExtract = z.infer<typeof StaffingExtractSchema>;
export type SmbSupplierExtract = z.infer<typeof SmbSupplierExtractSchema>;
export type ExtractPayload = StaffingExtract | SmbSupplierExtract;

export function parseExtract(vertical: Vertical, payload: unknown): ExtractPayload {
  if (vertical === "staffing") return StaffingExtractSchema.parse(payload);
  return SmbSupplierExtractSchema.parse(payload);
}

export function extractSchemaName(vertical: Vertical): string {
  return vertical === "staffing" ? "StaffingExtractSchema" : "SmbSupplierExtractSchema";
}
