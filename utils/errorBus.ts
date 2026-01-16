import { ErrorListener, ErrorPayload } from "@/@types/dto";

const listeners = new Set<ErrorListener>();

export const errorBus = {
  emit(payload: ErrorPayload) {
    listeners.forEach((l) => l(payload));
  },
  subscribe(listener: ErrorListener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener)
      return;
    };
  },
};
