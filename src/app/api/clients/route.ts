import { fail, ok, readJson } from "@/lib/http";
import { createClient, listClients } from "@/server/clients";

export async function GET() {
  try {
    return ok({ clients: await listClients() });
  } catch (error) {
    return fail(error, 500);
  }
}

export async function POST(req: Request) {
  try {
    const body = await readJson<{ name: string; legalName?: string; vertical: string }>(req);
    if (!body.name || !body.vertical) return fail("name and vertical are required");
    const client = await createClient(body);
    return ok({ client }, 201);
  } catch (error) {
    return fail(error);
  }
}
