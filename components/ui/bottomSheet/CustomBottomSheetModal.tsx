import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProps, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback } from "react";

type Props = BottomSheetModalProps & {
  ref: React.RefObject<BottomSheetModal | null>;
  children: React.ReactNode;
  snapPoints?: (string | number)[];
  hasHandle?: boolean;
}

const CustomBottomSheetModal = ({
  ref,
  children,
  snapPoints = ["30%"],
  hasHandle = true,
  ...props
}: Props) => {

  const renderBackdrop = useCallback((backdropProps: any) => (
    <BottomSheetBackdrop
      {...backdropProps}
      pressBehavior="close"
      appearsOnIndex={0}
      disappearsOnIndex={-1}
    />
  ), []);

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={false}
      enablePanDownToClose={true}
      handleComponent={hasHandle ? undefined : null}
      {...props}
    >
      <BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView>
    </BottomSheetModal>
  );
};

export default CustomBottomSheetModal;