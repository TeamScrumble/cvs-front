import React, { Ref } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  View,
} from "react-native";
import Icon from "react-native-iconify";
import { icons, colors, fonts } from "@/constants";

interface DropdownTriggerProps {
  label: string;
  placeholder: string;
  disabled: boolean;
  isOpen: boolean;
  style?: ViewStyle;
  ref?: Ref<View>;

  onPress: () => void;
}

export default function DropdownTrigger({
  label,
  placeholder,
  disabled,
  isOpen,
  style,
  ref,
  onPress,
}: DropdownTriggerProps) {
  return (
    <TouchableOpacity
      ref={ref}
      onPress={() => !disabled && onPress()}
      style={[styles.trigger, style]}
      activeOpacity={0.8}
    >
      <Text style={styles.label}>{label || placeholder}</Text>
      <Icon
        icon={isOpen ? icons.expandLess : icons.expandMore}
        size={16}
        color={colors.SLATE_500}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  trigger: {
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
