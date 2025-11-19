import IconButton from "@/components/button/IconButton";
import TextButton from "@/components/button/TextButton";
import { colors, fonts, icons } from "@/constants";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={styles.safeAreaContainer}
      edges={["top", "left", "right"]}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.menuContainer}>
            <TextButton
              title="편:편"
              fontSize={20}
              fontFamily={fonts.CHAB}
              color={colors.MAIN}
            />
            <TextButton title="레시피" />
            <TextButton title="상품" />
          </View>
          <View style={styles.iconContainer}>
            <IconButton icon={icons.search} />
            <IconButton icon={icons.alert} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});
