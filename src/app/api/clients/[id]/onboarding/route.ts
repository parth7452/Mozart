import type { OnboardingStatus } from "@/domain/states";
import { fail, ok, readJson } from "@/lib/http";
import { decideOnboarding } from "@/server/clients";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const body = await readJson<{ status: OnboardingStatus }>(req);
    const client = await decideOnboarding(id, body.status);
    return ok({ client });
  } catch (error) {
    return fail(error);
  }
}
