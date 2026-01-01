export type Option = {
  optionId: number;
  optionText: string;
  displayOrder: number;
}

export type Aspect = {
  aspectId: number;
  aspectTitle: string;
  aspectQuestion: string;
  options: Option[];
}

export type ReportReason = {
  reasonCode: string;
  description: string;
}