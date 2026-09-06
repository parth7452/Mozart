import { fail, ok } from "@/lib/http";
import { getServicingSnapshot } from "@/server/servicing";

export async function GET() {
  try {
    return ok(await getServicingSnapshot());
  } catch (error) {
    return fail(error, 500);
  }
}
