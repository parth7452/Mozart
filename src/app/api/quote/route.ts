import { deliverQuote, QuoteSchema } from "@/lib/quote";
import { fail, ok, readJson } from "@/lib/http";

export async function POST(req: Request) {
  try {
    const body = await readJson<unknown>(req);
    const parsed = QuoteSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Invalid quote request";
      return fail(new Error(message), 400);
    }
    const delivery = await deliverQuote(parsed.data);
    return ok({ ok: true, delivery });
  } catch (error) {
    return fail(error, 502);
  }
}
