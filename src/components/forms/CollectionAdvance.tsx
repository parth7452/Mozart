"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/desk-ui";

export function CollectionAdvance({ id }: { id: string }) {
  const router = useRouter();
  async function send() {
    await fetch("/api/servicing/collections", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "SENT" }),
    });
    router.refresh();
  }
  return (
    <Button type="button" variant="ghost" onClick={send}>
      Mark sent
    </Button>
  );
}
