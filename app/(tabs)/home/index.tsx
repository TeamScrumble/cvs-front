import { brands, BrandType } from "@/@types/brand";
import CustomBottomSheetModal from "@/components/bottomSheet/CustomBottomSheetModal";
import CustomButton from "@/components/button/CustomButton";
import IconButton from "@/components/button/IconButton";
import BrandIcon from "@/components/domain/BrandIcon";
import { colors, fonts, icons } from "@/constants";
import useBottomSheetModal from "@/hooks/useBottomSheetModal";
import { router } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-iconify";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { bottomSheetModalRef, present, dismiss } = useBottomSheetModal();

  const handlePressStore = useCallback((storeName: string) => {
    dismiss();
    router.push(`/(tabs)/home/${storeName}`);
  }, []);

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.menuContainer}>
          <Text style={styles.logoText}>편:편</Text>
          <IconButton
            icon={icons.downSquare}
            size={14}
            color={colors.SUB_FONT}
            onPress={present}
            style={{ padding: 6 }}
          />
        </View>
        <View style={styles.iconContainer}>
          <IconButton icon={icons.search} />
          <IconButton icon={icons.alert} hasDot />
        </View>
      </View>
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <CustomButton
          label="상세화면으로 이동"
          onPress={() => router.push("/product/3")}
        />
      </View>
      <CustomBottomSheetModal ref={bottomSheetModalRef} snapPoints={[258 + insets.bottom]}>
        <View style={styles.contentContainer}>
          {Object.entries(brands).map(([key, brand], index) => (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() => handlePressStore(key)}
            >
              <View style={styles.leftContainer}>
                <BrandIcon brandType={key as BrandType} />
                <Text
                  style={[styles.storeName, { fontFamily: fonts.MEDIUM }]}
                >
                  {brand.name}
                </Text>
              </View>
              <Icon
                icon={icons.chevronRightLine}
                size={20}
                color={colors.MAIN_FONT}
              />
            </TouchableOpacity>
          ))}
        </View>
      </CustomBottomSheetModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  logoText: {
    fontSize: 30,
    fontFamily: fonts.RYURUE,
    color: colors.MAIN,
  },
  headerContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
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
