import type {
  AdapterRun,
  CashApplication,
  Client,
  CollectionItem,
  CreditRecommendation,
  DebtorConfirmation,
  Document,
  ExtractResult,
  Invoice,
  MatchResult,
  ReserveAccount,
  Ucc1Filing,
} from "@prisma/client";

export type InvoiceBundle = Invoice & {
  client: Client;
  documents: Document[];
  extract: ExtractResult | null;
  match: MatchResult | null;
  confirmation: DebtorConfirmation | null;
  credit: CreditRecommendation | null;
  cashApps: CashApplication[];
  collections: CollectionItem[];
};

export type ClientBundle = Client & {
  adapterRuns: AdapterRun[];
  invoices: Invoice[];
  ucc1: Ucc1Filing | null;
  reserve: ReserveAccount | null;
};

export function jsonSafe<T>(value: T): T {
  return JSON.parse(
    JSON.stringify(value, (_k, v) => (typeof v === "bigint" ? v.toString() : v)),
  ) as T;
}

export function parseJson<T>(raw: string): T {
  return JSON.parse(raw) as T;
}
