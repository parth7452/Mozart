export const VERTICALS = ["staffing", "smb_supplier"] as const;
export type Vertical = (typeof VERTICALS)[number];

export function isVertical(value: string): value is Vertical {
  return (VERTICALS as readonly string[]).includes(value);
}

export function assertVertical(value: string): Vertical {
  if (!isVertical(value)) {
    throw new Error(`Unknown vertical "${value}". Dual-path v1 is staffing | smb_supplier.`);
  }
  return value;
}

export const VERTICAL_LABEL: Record<Vertical, string> = {
  staffing: "Staffing",
  smb_supplier: "SMB supplier",
};

export const VERTICAL_SUPPORT_DOCS: Record<Vertical, string[]> = {
  staffing: ["TIMESHEET", "VMS"],
  smb_supplier: ["PO", "DELIVERY"],
};
