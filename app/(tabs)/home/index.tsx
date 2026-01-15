import CustomButton from "@/components/button/CustomButton";
import IconButton from "@/components/button/IconButton";
import { colors, fonts, icons } from "@/constants";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const handleOpenBottomSheet = () => {
    router.push("/store-selection");
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
});
