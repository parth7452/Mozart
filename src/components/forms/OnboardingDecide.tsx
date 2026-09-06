"use client";

import { useRouter } from "next/navigation";
import { ONBOARDING_TRANSITIONS, type OnboardingStatus } from "@/domain/states";
import { Button, Card } from "@/components/ui";

export function OnboardingDecide({
  clientId,
  current,
}: {
  clientId: string;
  current: string;
}) {
  const router = useRouter();
  const next = ONBOARDING_TRANSITIONS[current as OnboardingStatus] ?? [];

  async function decide(status: string) {
    await fetch(`/api/clients/${clientId}/onboarding`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  }

  return (
    <Card>
      <h2 className="mb-2 font-serif text-xl">Status machine</h2>
      <p className="mb-3 text-sm text-ink/60">
        Current: <span className="font-medium">{current}</span>. Transitions: PASS | REVIEW | FAIL
        (from in-progress).
      </p>
      <div className="flex flex-wrap gap-2">
        {next.map((s) => (
          <Button key={s} type="button" variant="ghost" onClick={() => decide(s)}>
            → {s}
          </Button>
        ))}
      </div>
    </Card>
  );
}
