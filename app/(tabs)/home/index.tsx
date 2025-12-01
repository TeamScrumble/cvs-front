import IconButton from "@/components/button/IconButton";
import StoreBottomSheet from "@/components/home/StoreBottomSheet";
import { colors, fonts, icons } from "@/constants";
import { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const bottomSheetRef = useRef<any>(null);

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <View style={styles.menuContainer}>
            <Text style={styles.logoText}>편:편</Text>
            <IconButton
              icon={icons.downSquare}
              size={14}
              color={colors.SUB_FONT}
              onPress={handleOpenBottomSheet}
            />
          </View>
          <View style={styles.iconContainer}>
            <IconButton icon={icons.search} />
            <IconButton icon={icons.alert} hasDot />
          </View>
        </View>
        <StoreBottomSheet bottomSheetRef={bottomSheetRef} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  logoText: {
    fontSize: 20,
    fontFamily: fonts.CHAB,
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
    gap: 8,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});
