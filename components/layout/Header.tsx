import { BrandType } from "@/@types/brand";
import Seven_Logo from "@/assets/images/stores/7eleven_logo.svg";
import CU_Logo from "@/assets/images/stores/cu_logo.svg";
import Emart24_Logo from "@/assets/images/stores/emart24_logo.svg";
import GS25_Logo from "@/assets/images/stores/gs25_logo.svg";
import IconButton from "@/components/ui/button/IconButton";
import { colors, icons } from "@/constants";
import { StyleSheet, View } from "react-native";

interface HeaderProps {
  handlePressBackButton: () => void;
  handlePressSearchIcon?: (() => void) | undefined;
  brandType?: BrandType;
}

const brandLogo: Record<BrandType, () => React.ReactNode> = {
  GS25: () => <GS25_Logo width={76} height={24} />,
  CU: () => <CU_Logo width={105} height={22} />,
  SEVEN_ELEVEN: () => <Seven_Logo width={95} height={20} />,
  EMART24: () => <Emart24_Logo width={111} height={22} />,
};

function Header({
  brandType,
  handlePressBackButton,
  handlePressSearchIcon = () => { },
}: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <IconButton
          icon={icons.chevronLeftLine}
          size={24}
          onPress={handlePressBackButton}
        />
        {brandType && brandLogo[brandType]()}
      </View>
      <View style={styles.rightContainer}>
        <IconButton
          icon={icons.search}
          size={24}
          onPress={handlePressSearchIcon}
        />
      </View>
    </View>
  );
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

export default Header;
