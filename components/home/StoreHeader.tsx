import IconButton from "@/components/button/IconButton";
import { colors, icons } from "@/constants";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import GS25_Logo from "@/assets/images/stores/gs25_logo.svg";
import CU_Logo from "@/assets/images/stores/cu_logo.svg";
import Seven_Logo from "@/assets/images/stores/7eleven_logo.svg";
import Emart24_Logo from "@/assets/images/stores/emart24_logo.svg";
import { Stores } from "@/@types";

const storeLogo: Record<Stores, () => React.ReactNode> = {
  gs25: () => <GS25_Logo width={76} height={24} />,
  cu: () => <CU_Logo width={105} height={22} />,
  "7eleven": () => <Seven_Logo width={95} height={20} />,
  emart24: () => <Emart24_Logo width={111} height={22} />,
}


function StoreHeader({ store }: { store: Stores }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <IconButton icon={icons.chevronLeftLine} size={24} onPress={() => router.replace("/home")} />
        {storeLogo[store]()}
      </View>
      <View style={styles.rightContainer}>
        <IconButton icon={icons.search} size={24} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 48,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.SLATE_200,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default StoreHeader;