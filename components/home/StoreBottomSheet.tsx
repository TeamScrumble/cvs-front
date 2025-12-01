import { colors, fontMap, icons, stores, Stores } from "@/constants";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Iconify } from "react-native-iconify";
import GS25_Icon from "@/assets/images/stores/gs25_icon.svg";
import CU_Icon from "@/assets/images/stores/cu_icon.svg";
import Seven_Icon from "@/assets/images/stores/7eleven_icon.svg";
import Emart24_Icon from "@/assets/images/stores/emart24_icon.svg";

interface StoreBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const storeIcon: Record<Stores, () => React.ReactNode> = {
  gs25: () => <GS25_Icon width={16} height={16} />,
  cu: () => <CU_Icon width={16} height={16} />,
  "7eleven": () => <Seven_Icon width={16} height={16} />,
  emart24: () => <Emart24_Icon width={16} height={16} />,
}

export default function StoreBottomSheet({ bottomSheetRef }: StoreBottomSheetProps) {
  const snapPoints = useMemo(() => [254], []);

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

  const handlePressStore = (storeName: string) => {
    router.push(`/home/${storeName}`);
    bottomSheetRef.current?.close();
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      handleIndicatorStyle={{ backgroundColor: colors.GRAY }}
    >
      <BottomSheetView style={styles.contentContainer}>
        {Object.entries(stores).map(([key, store], index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={() => handlePressStore(key)}
          >
            <View style={styles.leftContainer}>
              {storeIcon[key as Stores]()}
              <Text style={[styles.storeName, { fontFamily: fontMap.medium }]}>{store.name}</Text>
            </View>
            <Iconify icon={icons.chevronRightLine} size={20} color={colors.MAIN_FONT} />
          </TouchableOpacity>
        ))}
      </BottomSheetView>
    </BottomSheet>
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
