"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/desk-ui";

export function HitlButtons({ invoiceId }: { invoiceId: string }) {
  const router = useRouter();

  async function decide(decision: "approve" | "reject") {
    await fetch(`/api/credit/${invoiceId}/hitl`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision }),
    });
    router.refresh();
  }

  return (
    <div className="flex gap-2">
      <Button type="button" onClick={() => decide("approve")}>
        Approve
      </Button>
      <Button type="button" variant="danger" onClick={() => decide("reject")}>
        Reject
      </Button>
    </div>
  );
}
