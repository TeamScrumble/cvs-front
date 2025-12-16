export const BRAND_LIST = ["GS25", "CU", "SEVEN_ELEVEN", "EMART24"] as const;

export const brands: Record<typeof BRAND_LIST[number], { name: string }> = {
  GS25: { name: "GS25" },
  CU: { name: "CU" },
  SEVEN_ELEVEN: { name: "7ELEVEN" },
  EMART24: { name: "emart24" },
} as const;

export type BrandType = typeof BRAND_LIST[number];

const brandSet = new Set<BrandType>(BRAND_LIST);

export const isBrand = (v: unknown): v is BrandType =>
  typeof v === "string" && brandSet.has(v as BrandType);
