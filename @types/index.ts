import { colors, fonts } from "@/constants";

export type FontFamilyType = (typeof fonts)[keyof typeof fonts];

export type ColorType = (typeof colors)[keyof typeof colors];

export type GlobalModalPayload = {
  title?: string;
  content: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};
