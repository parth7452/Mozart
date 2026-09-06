import { fail, ok } from "@/lib/http";
import { demoState, seedDemo } from "@/server/demo";

export async function GET() {
  try {
    return ok(await demoState());
  } catch (error) {
    return fail(error, 500);
  }
}

export async function POST() {
  try {
    return ok(await seedDemo(), 201);
  } catch (error) {
    return fail(error);
  }
}
