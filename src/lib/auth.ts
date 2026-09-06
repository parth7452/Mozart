export type Role = "analyst" | "credit_officer" | "ops";

export type Session = {
  userId: string;
  name: string;
  role: Role;
  stub: true;
};

const ROLES: Role[] = ["analyst", "credit_officer", "ops"];

function asRole(value: string | undefined): Role {
  if (value && (ROLES as string[]).includes(value)) return value as Role;
  return "credit_officer";
}

/** Auth is a stub. Replace with a real session provider later. */
export function getSession(): Session {
  return {
    userId: "user_demo",
    name: process.env.DEMO_USER_NAME ?? "Alex Chen",
    role: asRole(process.env.DEMO_USER_ROLE),
    stub: true,
  };
}

export function canDecideCredit(session: Session): boolean {
  return session.role === "credit_officer" || session.role === "ops";
}
