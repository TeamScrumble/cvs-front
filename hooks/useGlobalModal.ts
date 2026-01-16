import { ModalContext } from '@/components/modal/ModalContext';
import { useContext } from 'react';

export const useGlobalModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("[useGlobalModal] ModalProvider missing");
  return ctx;
};

