import { fail, ok, readJson } from "@/lib/http";
import { runDemoStep } from "@/server/demo";

export async function POST(req: Request) {
  try {
    const body = await readJson<{ step: string }>(req);
    return ok(await runDemoStep(body.step));
  } catch (error) {
    return fail(error);
  }
}
