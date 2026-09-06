import { fail, ok } from "@/lib/http";
import { findDuplicates, getInvoice } from "@/server/invoices";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const invoice = await getInvoice(id);
    if (!invoice) return fail("Invoice not found", 404);
    const duplicates = await findDuplicates({
      clientId: invoice.clientId,
      invoiceNumber: invoice.invoiceNumber,
      debtorName: invoice.debtorName,
      amountCents: invoice.amountCents,
      excludeId: invoice.id,
    });
    return ok({ invoice, duplicates });
  } catch (error) {
    return fail(error, 500);
  }
}
