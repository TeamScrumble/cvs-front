import { colors, fonts, icons } from "@/constants";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import Icon from "react-native-iconify";

type Props = {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  style?: ViewStyle;
  onPress: () => void;
}

const SelectTrigger = ({ label, placeholder, disabled, style, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      style={[styles.container, style]}
      activeOpacity={0.8}
    >
      <Text style={styles.label}>{label || placeholder}</Text>
      <Icon
        icon={icons.expandMore}
        size={16}
        color={colors.SLATE_500}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    borderColor: colors.SLATE_200,
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingLeft: 10,
    paddingRight: 5,
    paddingVertical: 6,
  },
  label: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    lineHeight: 12,
    color: colors.SLATE_500,
  },
});

export default SelectTrigger;