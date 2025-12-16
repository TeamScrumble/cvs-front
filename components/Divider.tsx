import { colors } from "@/constants";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface DividerProps {
  borderStyle?: "dashed" | "solid";
  borderColor?: (typeof colors)[keyof typeof colors];
  isVertical?: boolean;
  style?: StyleProp<ViewStyle>;
}

function Divider({
  borderStyle = "solid",
  borderColor = colors.SLATE_300,
  isVertical = false,
  style,
}: DividerProps) {
  return (
    <View
      style={[
        isVertical ? styles.vertical : styles.horizontal,
        { borderStyle, borderColor },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flex: 1,
    width: "100%", // 부모 기준으로 가로 전체
    borderBottomWidth: 1,
  },
  vertical: {
    height: "100%", // 부모 기준으로 세로 전체
    borderRightWidth: 1,
  },
});

export default Divider;
