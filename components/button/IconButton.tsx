import { colors } from "@/constants";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-iconify";

interface IconButtonProps {
  icon: string;
  hasDot?: boolean;
  size?: number;
  onPress?: () => void;
}

function IconButton({ icon, hasDot = false, size = 24, onPress = () => {} }: IconButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <Icon icon={icon} size={size} />
      {hasDot && <View style={[styles.dot, { backgroundColor: colors.MAIN }]} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dot: {
    position: "absolute",
    top: 0,
    right: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
  }
});

export default IconButton;
