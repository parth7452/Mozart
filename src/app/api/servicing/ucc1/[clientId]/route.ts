import type { Ucc1Status } from "@/domain/states";
import { fail, ok, readJson } from "@/lib/http";
import { transitionUcc1 } from "@/server/servicing";

export async function POST(req: Request, ctx: { params: Promise<{ clientId: string }> }) {
  try {
    const { clientId } = await ctx.params;
    const body = await readJson<{ status: Ucc1Status }>(req);
    return ok({ filing: await transitionUcc1(clientId, body.status) });
  } catch (error) {
    return fail(error);
  }
}
