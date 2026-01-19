import { GlobalModalPayload } from '@/@types';
import { createContext } from 'react';

type ModalContextType = {
  open: (payload: GlobalModalPayload) => void;
  close: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);