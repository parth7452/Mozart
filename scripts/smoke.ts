/**
 * Smoke: demo path through the service layer (no browser).
 * Asserts dual-path extract, HITL gate, and no live funding.
 */
import { execSync } from "node:child_process";
import { FUNDING_POLICY } from "../src/domain/policy";
import { parseExtract } from "../src/domain/extract";
import { prisma } from "../src/lib/prisma";
import { runDemoPath } from "../src/server/demo";

function assert(cond: unknown, message: string): asserts cond {
  if (!cond) throw new Error(message);
}

async function main() {
  execSync("npx prisma db push --skip-generate --accept-data-loss", { stdio: "inherit" });
  await prisma.client.deleteMany();

  const result = await runDemoPath();

  assert(!FUNDING_POLICY.liveFundingEnabled, "live funding must be off");
  assert(!FUNDING_POLICY.autoFundEnabled, "auto-fund must be off");
  assert(result.funded === false, "demo path must not fund");
  assert(result.payoutCreated === false, "demo path must not create payouts");
  assert(result.staffingExtract?.vertical === "staffing", "staffing extract missing");
  const staffing = parseExtract("staffing", JSON.parse(result.staffingExtract.payload));
  assert("timesheet" in staffing, "staffing schema");
  assert(result.match && result.match.overall > 0, "match scores missing");
  assert(result.beforeHitl === "PENDING_HITL", `expected PENDING_HITL, got ${result.beforeHitl}`);
  assert(result.afterHitl === "READY_TO_FUND", `expected READY_TO_FUND after HITL, got ${result.afterHitl}`);
  assert(result.creditStatus === "APPROVED", "HITL approve missing");
  assert(result.smbVertical === "smb_supplier", "SMB extract missing");
  const smb = parseExtract("smb_supplier", JSON.parse(result.smbPayload ?? "{}"));
  assert("purchaseOrder" in smb, "SMB schema");

  console.log("SMOKE OK");
  console.log("  staffing extract:", staffing.invoiceNumber, "hours", staffing.timesheet.totalHours);
  console.log("  match overall:", result.match?.overall);
  console.log("  before HITL:", result.beforeHitl, "→ after:", result.afterHitl);
  console.log("  smb PO:", smb.purchaseOrder.poNumber);
  console.log("  funded / payout:", result.funded, result.payoutCreated);
}

main()
  .catch((err) => {
    console.error("SMOKE FAIL", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
