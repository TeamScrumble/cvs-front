import { brands, BrandType } from "@/@types/brand";
import BrandIcon from "@/components/domain/BrandIcon";
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
                <BrandIcon brandType={key as BrandType}/>
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
