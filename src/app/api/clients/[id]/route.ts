import { fail, ok } from "@/lib/http";
import { clientFundPath, getClient } from "@/server/clients";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const client = await getClient(id);
    if (!client) return fail("Client not found", 404);
    return ok({ client, fundPath: clientFundPath(client) });
  } catch (error) {
    return fail(error, 500);
  }
}
