import { colors } from "@/constants";
import React from "react";
import { StyleSheet, View } from "react-native";

interface ProgressBarProps {
  value: number;
  total: number;
}

function ProgressBar({ value, total }: ProgressBarProps) {
  const ratio = value / total;
  return (
    <View style={styles.barWrapper}>
      <View style={styles.barBackground} />
      <View
        style={[
          styles.barFill,
          {
            width: `${ratio * 100}%`,
            backgroundColor: colors.YELLOW || colors.NEUTRAL_LIGHT_MEDIUM,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  barWrapper: {
    flex: 1,
    height: 8,
    position: "relative",
    justifyContent: "center",
  },
  barBackground: {
    position: "absolute",
    width: "100%",
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
  },
  barFill: {
    height: 8,
    borderRadius: 4,
    position: "absolute",
    left: 0,
  },
});

export default ProgressBar;
