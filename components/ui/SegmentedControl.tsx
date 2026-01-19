import { colors, fonts } from "@/constants";
import React, { createContext, ReactNode, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SegmentedControlContext = createContext<SegmentControlProps | null>(null);

interface SegmentControlProps {
  value: string;
  onValueChange: (value: string) => void;
  children?: ReactNode;
}

function SegmentedControl({
  value,
  onValueChange,
  children,
}: SegmentControlProps) {
  return (
    <SegmentedControlContext.Provider value={{ value, onValueChange }}>
      <View style={styles.container}>{children}</View>
    </SegmentedControlContext.Provider>
  );
}

interface ItemProps {
  value: string;
  label: string;
  count: number;
}

function Item({ value, label, count }: ItemProps) {
  const ctx = useContext(SegmentedControlContext);

  if (!ctx) {
    throw new Error(
      "SegmentedControl.Item must be used inside SegmentedControl"
    );
  }

  const selected = ctx.value === value;

  return (
    <TouchableOpacity
      onPress={() => ctx.onValueChange(value)}
      style={[styles.item, selected && styles.itemSelected]}
    >
      <Text style={[styles.label, selected && styles.selectedText]}>
        {label}
      </Text>
      <Text style={[styles.count, selected && styles.selectedText]}>
        {count.toLocaleString()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SLATE_TINT_5,
    borderRadius: 4,
    flexDirection: "row",
    padding: 4,
  },
  item: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  itemSelected: {
    backgroundColor: colors.WHITE,
  },
  label: {
    fontFamily: fonts.BOLD,
    fontSize: 12,
    color: colors.SLATE_500,
  },
  count: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    color: colors.SLATE_500,
  },
  selectedText: {
    color: colors.SLATE_800,
  },
});

SegmentedControl.Item = Item;
export default SegmentedControl;
