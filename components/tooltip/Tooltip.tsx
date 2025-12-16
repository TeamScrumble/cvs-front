import { colors } from "@/constants";
import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, PressableProps } from "react-native";

interface TooltipProps extends PressableProps {
  content: string;
  onPress?: () => void;
}

function Tooltip({ content, onPress = () => {}, ...props }: TooltipProps) {
  const [tooltipHeight, setTooltipHeight] = useState(0);

  return (
    <Pressable
      style={[styles.wrapper, { top: -(tooltipHeight + 4) }]}
      onLayout={(e) => {
        setTooltipHeight(e.nativeEvent.layout.height);
      }}
      onPress={onPress}
      {...props}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{content}</Text>
      </View>
      <View style={styles.triangle} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    position: "absolute",
    minWidth: 100,
  },
  container: {
    backgroundColor: colors.SLATE_800,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  text: {
    color: colors.WHITE,
    fontSize: 12,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: colors.SLATE_800,
  },
});

export default Tooltip;
