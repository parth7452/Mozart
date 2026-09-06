import { seedDemo } from "../src/server/demo";

async function main() {
  const state = await seedDemo();
  console.log("Seeded Mozart demo:");
  console.log("  staffing client:", state.client?.id, state.client?.name);
  console.log("  invoice:", state.invoice?.id, state.invoice?.invoiceNumber);
  console.log("  smb client:", state.smb?.id, state.smb?.name);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
