import { fail, ok } from "@/lib/http";
import { runAdapter } from "@/server/clients";

export async function POST(
  _req: Request,
  ctx: { params: Promise<{ id: string; kind: string }> },
) {
  try {
    const { id, kind } = await ctx.params;
    const out = await runAdapter(id, kind.toUpperCase());
    return ok(out);
  } catch (error) {
    return fail(error);
  }
}
