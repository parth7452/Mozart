import { fundPathWouldOpen } from "@/domain/policy";
import {
  ACCOUNTING_PROVIDERS,
  ADAPTER_KINDS,
  ONBOARDING_TRANSITIONS,
  assertTransition,
  type AccountingProvider,
  type AdapterKind,
  type OnboardingStatus,
} from "@/domain/states";
import { assertVertical, type Vertical } from "@/domain/verticals";
import { accountingAdapterFor, MockKybAmlAdapter, MockPlaidAdapter } from "@/integrations";
import { prisma } from "@/lib/prisma";
import type { ClientBundle } from "./serialize";

const plaid = new MockPlaidAdapter();
const kyb = new MockKybAmlAdapter();

export async function listClients() {
  return prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    include: { invoices: true, adapterRuns: true, ucc1: true, reserve: true },
  });
}

export async function getClient(id: string): Promise<ClientBundle | null> {
  return prisma.client.findUnique({
    where: { id },
    include: {
      invoices: { orderBy: { createdAt: "desc" } },
      adapterRuns: { orderBy: { createdAt: "desc" } },
      ucc1: true,
      reserve: true,
    },
  });
}

export async function createClient(input: {
  name: string;
  legalName?: string;
  vertical: string;
}) {
  const vertical = assertVertical(input.vertical);
  const client = await prisma.client.create({
    data: {
      name: input.name.trim(),
      legalName: (input.legalName ?? input.name).trim(),
      vertical,
      onboardingStatus: "DRAFT",
      reserve: { create: { heldCents: 0, releasedCents: 0, targetReservePct: 10 } },
      ucc1: { create: { status: "NOT_STARTED", jurisdiction: "DE" } },
    },
  });
  return getClient(client.id);
}

export function clientFundPath(client: {
  accountingConnected: boolean;
  bankConnected: boolean;
}) {
  const wouldOpen = fundPathWouldOpen(client);
  return {
    wouldOpen,
    liveFundingEnabled: false,
    reason: wouldOpen
      ? "Accounting + bank connected. Fund path would open here; live funding is disabled."
      : "Connect accounting (QBO / Xero / NetSuite) and bank (Plaid) before the fund path can open.",
  };
}

export async function runAdapter(clientId: string, kind: string) {
  if (!(ADAPTER_KINDS as readonly string[]).includes(kind)) {
    throw new Error(`Unknown adapter "${kind}"`);
  }
  const client = await prisma.client.findUnique({ where: { id: clientId } });
  if (!client) throw new Error("Client not found");

  const adapterKind = kind as AdapterKind;
  let result;

  if (adapterKind === "PLAID") {
    result = await plaid.connect(clientId);
    await prisma.client.update({
      where: { id: clientId },
      data: { bankConnected: result.status === "PASS", onboardingStatus: "IN_PROGRESS" },
    });
  } else if (adapterKind === "KYB_AML") {
    result = await kyb.screen({ clientId, legalName: client.legalName });
    await prisma.client.update({
      where: { id: clientId },
      data: { kybStatus: result.status, onboardingStatus: "IN_PROGRESS" },
    });
  } else {
    const provider = adapterKind as AccountingProvider;
    if (!(ACCOUNTING_PROVIDERS as readonly string[]).includes(provider)) {
      throw new Error(`Unknown accounting provider "${kind}"`);
    }
    const adapter = accountingAdapterFor(provider);
    result = await adapter.connect(clientId);
    await prisma.client.update({
      where: { id: clientId },
      data: {
        accountingConnected: result.status === "PASS",
        accountingProvider: provider,
        onboardingStatus: "IN_PROGRESS",
      },
    });
  }

  await prisma.adapterRun.create({
    data: {
      clientId,
      kind: result.kind,
      status: result.status,
      summary: result.summary,
      payload: JSON.stringify(result.payload),
    },
  });

  return { result, client: await getClient(clientId) };
}

export async function decideOnboarding(clientId: string, next: OnboardingStatus) {
  const client = await prisma.client.findUnique({ where: { id: clientId } });
  if (!client) throw new Error("Client not found");
  assertTransition(
    ONBOARDING_TRANSITIONS,
    client.onboardingStatus as OnboardingStatus,
    next,
    "onboarding",
  );
  await prisma.client.update({ where: { id: clientId }, data: { onboardingStatus: next } });
  return getClient(clientId);
}

export type SelectionFilter = {
  vertical: Vertical;
  accountingConnected: boolean;
  bankConnected: boolean;
  fundPathWouldOpen: boolean;
};

export function selectionFilter(client: {
  vertical: string;
  accountingConnected: boolean;
  bankConnected: boolean;
}): SelectionFilter {
  return {
    vertical: assertVertical(client.vertical),
    accountingConnected: client.accountingConnected,
    bankConnected: client.bankConnected,
    fundPathWouldOpen: fundPathWouldOpen(client),
  };
}
