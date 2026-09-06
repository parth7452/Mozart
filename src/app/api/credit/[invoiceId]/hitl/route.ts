import { fail, ok, readJson } from "@/lib/http";
import { hitlDecide } from "@/server/credit";

export async function POST(req: Request, ctx: { params: Promise<{ invoiceId: string }> }) {
  try {
    const { invoiceId } = await ctx.params;
    const body = await readJson<{ decision: "approve" | "reject" }>(req);
    if (body.decision !== "approve" && body.decision !== "reject") {
      return fail("decision must be approve or reject");
    }
    return ok(await hitlDecide(invoiceId, body.decision));
  } catch (error) {
    return fail(error);
  }
}
