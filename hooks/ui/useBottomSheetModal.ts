import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const useBottomSheetModal = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const present = () => bottomSheetModalRef.current?.present();
  const dismiss = () => bottomSheetModalRef.current?.dismiss();

  return {
    bottomSheetModalRef,
    present,
    dismiss,
  };
};

export default useBottomSheetModal;
