"use client";

import { useRouter } from "next/navigation";
import { UCC1_TRANSITIONS, type Ucc1Status } from "@/domain/states";
import { Button } from "@/components/desk-ui";

export function Ucc1Advance({ clientId, current }: { clientId: string; current: string }) {
  const router = useRouter();
  const next = UCC1_TRANSITIONS[current as Ucc1Status] ?? [];

  async function go(status: string) {
    await fetch(`/api/servicing/ucc1/${clientId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-1">
      {next.map((s) => (
        <Button key={s} type="button" variant="ghost" onClick={() => go(s)}>
          → {s}
        </Button>
      ))}
    </div>
  );
}
