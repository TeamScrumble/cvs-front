import { loginProvider } from "@/constants/login";

// Common Response
export type CR<T> = {
  body: T;
  status: number;
}

export type LoginProviderKey = keyof typeof loginProvider;
export type LoginProvider = (typeof loginProvider)[LoginProviderKey];