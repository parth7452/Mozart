import { fail, ok } from "@/lib/http";
import { listCreditQueue } from "@/server/credit";

export async function GET() {
  try {
    return ok({ invoices: await listCreditQueue() });
  } catch (error) {
    return fail(error, 500);
  }
}
