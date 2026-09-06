import { fail, ok, readJson } from "@/lib/http";
import { createInvoice, listInvoices } from "@/server/invoices";

export async function GET() {
  try {
    return ok({ invoices: await listInvoices() });
  } catch (error) {
    return fail(error, 500);
  }
}

export async function POST(req: Request) {
  try {
    const body = await readJson<{
      clientId: string;
      invoiceNumber: string;
      debtorName: string;
      amountCents: number;
      issueDate: string;
      dueDate: string;
    }>(req);
    const out = await createInvoice(body);
    return ok(out, 201);
  } catch (error) {
    return fail(error);
  }
}
