import { fonts } from "@/constants";

export type FontFamilyType = (typeof fonts)[keyof typeof fonts];

export const STORE_LIST = ["gs25", "cu", "7eleven", "emart24"] as const;
export type Stores = (typeof STORE_LIST)[number];
export const isStore = (v: string): v is Stores => STORE_LIST.includes(v as Stores);
export const stores: Record<Stores, { name: string }> = {
  gs25: {
    name: "GS25",
  },
  cu: {
    name: "CU",
  },
  "7eleven": {
    name: "7ELEVEN",
  },
  emart24: {
    name: "emart24",
  },
};
