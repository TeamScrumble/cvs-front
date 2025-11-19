import { fonts } from "@/constants";

export type FontFamilyType = typeof fonts[keyof typeof fonts];
