import { loginProvider } from "@/constants/login";

// Common Response
export type CR<T> = {
  body: T;
  status: number;
}

export type ErrorPayload = {
  code: string;
  description: string;
}

export type ErrorResponse = {
  error: ErrorPayload;
  status: number;
}

export type ErrorListener = (payload: ErrorPayload) => void;

export type LoginProviderKey = keyof typeof loginProvider;
export type LoginProvider = (typeof loginProvider)[LoginProviderKey];