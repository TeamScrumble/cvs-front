import { colors } from "@/constants";
import React from "react";
import { Pressable, View, StyleSheet } from "react-native";

type ToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export default function Toggle({ value, onChange }: ToggleProps) {
  return (
    <Pressable
      onPress={() => onChange(!value)}
      style={[
        styles.container,
        value ? styles.containerOn : styles.containerOff,
      ]}
    >
      <View style={styles.circle} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 24,
    borderRadius: 12,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  containerOn: {
    backgroundColor: colors.MAIN,
    justifyContent: "flex-end",
  },
  containerOff: {
    backgroundColor: colors.SLATE_200,
    justifyContent: "flex-start",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.WHITE,
  },
});
