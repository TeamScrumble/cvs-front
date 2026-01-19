import { colors } from "@/constants";
import React, { Ref } from "react";
import { Pressable, PressableProps, StyleSheet, View } from "react-native";
import Icon from "react-native-iconify";

interface IconButtonProps extends PressableProps {
  icon: string;
  color?: string;
  hasDot?: boolean;
  size?: number;
  ref?: Ref<View>;
}

function IconButton({
  icon,
  color = colors.MAIN_FONT,
  hasDot = false,
  size = 24,
  ref,
  ...props
}: IconButtonProps) {
  return (
    <Pressable ref={ref} style={styles.container} {...props}>
      <Icon icon={icon} size={size} color={color} />
      {hasDot && (
        <View style={[styles.dot, { backgroundColor: colors.MAIN }]} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: "auto",
  },
  dot: {
    position: "absolute",
    top: 0,
    right: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});

export default IconButton;
