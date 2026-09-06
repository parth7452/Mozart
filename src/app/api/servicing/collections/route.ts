import { fail, ok, readJson } from "@/lib/http";
import { advanceCollection, enqueueCollections } from "@/server/servicing";
import type { CollectionStatus } from "@/domain/states";

export async function POST(req: Request) {
  try {
    const body = await readJson<{ invoiceId: string }>(req);
    return ok({ items: await enqueueCollections(body.invoiceId) }, 201);
  } catch (error) {
    return fail(error);
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await readJson<{ id: string; status: CollectionStatus }>(req);
    return ok({ item: await advanceCollection(body.id, body.status) });
  } catch (error) {
    return fail(error);
  }
}
