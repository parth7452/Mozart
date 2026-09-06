import { fail, ok } from "@/lib/http";
import { recommendForInvoice } from "@/server/credit";

export async function POST(_req: Request, ctx: { params: Promise<{ invoiceId: string }> }) {
  try {
    const { invoiceId } = await ctx.params;
    return ok({ invoice: await recommendForInvoice(invoiceId) });
  } catch (error) {
    return fail(error);
  }
}
