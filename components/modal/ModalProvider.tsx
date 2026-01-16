import React, { ReactNode, useEffect, useState } from 'react';
import { GlobalModalPayload } from '@/@types';
import { ModalContext } from './ModalContext';
import GlobalModal from './GlobalModal';
import { errorBus } from '@/utils/errorBus';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [payload, setPayload] = useState<GlobalModalPayload | null>(null);

  const open = (data: GlobalModalPayload) => setPayload(data);
  const close = () => setPayload(null);

  useEffect(() => {
    return errorBus.subscribe((error) => {
      open({
        title: '에러 발생',
        content: error.description + `\n에러코드 : ${error.code}`,
      });
    });
  }, []);

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      {payload && <GlobalModal payload={payload} onClose={close} />}
    </ModalContext.Provider>
  );
};
