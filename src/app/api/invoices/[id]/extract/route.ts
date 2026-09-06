import { fail, ok } from "@/lib/http";
import { extractInvoice } from "@/server/invoices";

export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    return ok({ invoice: await extractInvoice(id) });
  } catch (error) {
    return fail(error);
  }
}
