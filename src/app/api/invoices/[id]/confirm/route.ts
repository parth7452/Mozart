import { fail, ok } from "@/lib/http";
import { confirmDebtor } from "@/server/invoices";

export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    return ok({ invoice: await confirmDebtor(id) });
  } catch (error) {
    return fail(error);
  }
}
