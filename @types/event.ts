export const plusEvents = ["1+1", "2+1"] as const;

export type PlusEventType = typeof plusEvents[number];