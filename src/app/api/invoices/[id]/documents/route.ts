import type { DocKind } from "@/domain/states";
import { fail, ok, readJson } from "@/lib/http";
import { attachDocument } from "@/server/invoices";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const body = await readJson<{ kind: DocKind; filename: string; mimeType?: string }>(req);
    const invoice = await attachDocument({ invoiceId: id, ...body });
    return ok({ invoice }, 201);
  } catch (error) {
    return fail(error);
  }
}
