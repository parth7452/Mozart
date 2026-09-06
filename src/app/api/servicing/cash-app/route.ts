import { fail, ok, readJson } from "@/lib/http";
import { applyCashStub } from "@/server/servicing";

export async function POST(req: Request) {
  try {
    const body = await readJson<{ invoiceId: string; amountCents: number; note?: string }>(req);
    return ok(await applyCashStub(body), 201);
  } catch (error) {
    return fail(error);
  }
}
