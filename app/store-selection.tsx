import { brands, BrandType } from "@/@types/brand";
import Seven_Icon from "@/assets/images/stores/7eleven_icon.svg";
import CU_Icon from "@/assets/images/stores/cu_icon.svg";
import Emart24_Icon from "@/assets/images/stores/emart24_icon.svg";
import GS25_Icon from "@/assets/images/stores/gs25_icon.svg";
import { colors, fontMap, icons } from "@/constants";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Iconify } from "react-native-iconify";

const brandIcon: Record<BrandType, () => React.ReactNode> = {
  GS25: () => <GS25_Icon width={16} height={16} />,
  CU: () => <CU_Icon width={16} height={16} />,
  SEVEN_ELEVEN: () => <Seven_Icon width={16} height={16} />,
  EMART24: () => <Emart24_Icon width={16} height={16} />,
};

export default function StoreSelectionScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [300], []);

  useEffect(() => {
    // 스크린이 마운트될 떄, 바텀시트를 펼침.
    // 부드러운 애니메이션을 위해서 딜레이 적용
    setTimeout(() => {
      bottomSheetRef.current?.expand();
    }, 100);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  const handleClose = () => {
    router.back();
  };

  const handlePressStore = (storeName: string) => {
    // 바텀시트가 열린 화면을 별도의 스크린으로 처리했기 때문에
    // router.push가 아닌 replace를 사용
    router.replace(`/(tabs)/home/${storeName}`);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        onClose={handleClose}
        handleIndicatorStyle={{ backgroundColor: colors.GRAY }}
      >
        <BottomSheetView style={styles.contentContainer}>
          {Object.entries(brands).map(([key, brand], index) => (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() => handlePressStore(key)}
            >
              <View style={styles.leftContainer}>
                {brandIcon[key as BrandType]()}
                <Text
                  style={[styles.storeName, { fontFamily: fontMap.medium }]}
                >
                  {brand.name}
                </Text>
              </View>
              <Iconify
                icon={icons.chevronRightLine}
                size={20}
                color={colors.MAIN_FONT}
              />
            </TouchableOpacity>
          ))}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
    gap: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  storeName: {
    fontSize: 16,
    color: colors.SLATE_600,
    fontWeight: "500",
  },
});
