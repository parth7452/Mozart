import { FUNDING_POLICY } from "@/domain/policy";
import { ok } from "@/lib/http";

export async function GET() {
  return ok({
    ok: true,
    service: "mozart",
    policy: FUNDING_POLICY,
  });
}
