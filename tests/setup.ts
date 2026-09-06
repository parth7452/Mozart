import { execSync } from "node:child_process";
import path from "node:path";

process.env.DATABASE_URL ??= "file:./dev.db";
process.env.DEMO_USER_NAME ??= "Alex Chen";
process.env.DEMO_USER_ROLE ??= "credit_officer";

execSync("npx prisma db push --skip-generate", {
  cwd: path.resolve(__dirname, ".."),
  stdio: "inherit",
});
