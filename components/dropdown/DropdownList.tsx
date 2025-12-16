import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ViewStyle,
  LayoutRectangle,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { DropdownOption } from "./Dropdown";
import { colors, fonts } from "@/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TooltipWithIcon from "../tooltip/TooltipWithIcon";

interface Props<T> {
  visible: boolean;
  options: DropdownOption<T>[];
  value: T | null;

  dropdownStyle?: ViewStyle;
  optionStyle?: ViewStyle;

  triggerLayout: LayoutRectangle | null;
  width: number;
  maxHeight: number;

  onSelect: (value: T) => void;
  onClose: () => void;
}

export default function DropdownList<T>({
  visible,
  options,
  value,
  dropdownStyle,
  optionStyle,
  triggerLayout,
  width,
  maxHeight,
  onSelect,
  onClose,
}: Props<T>) {
  const insets = useSafeAreaInsets();

  if (!visible || !triggerLayout) return null;

  const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
  const { x, y, width: triggerWidth, height: triggerHeight } = triggerLayout;

  const spaceBelow = windowHeight - (y + triggerHeight + insets.bottom);
  const isOpenUpwards = spaceBelow < maxHeight;

  // Trigger 너비와 Content 너비 분리 및 자동 정렬
  // 화면 오른쪽 끝에 가까우면(오른쪽 공간 부족), Trigger의 오른쪽 끝에 맞춤
  const isOverflowRight = x + width > windowWidth - 10;

  const horizontalPosition = isOverflowRight
    ? triggerWidth - width // Trigger 오른쪽 끝 정렬
    : 0; // Trigger 왼쪽 정렬

  const positionStyle = isOpenUpwards
    ? {
      bottom: triggerHeight + 4,
      left: horizontalPosition,
      width: width,
    }
    : {
      top: triggerHeight + 4,
      left: horizontalPosition,
      width: width,
    };

  return (
    <>
      {/* Backdrop */}
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={onClose}
        pointerEvents="auto"
      />

      {/* Option List */}
      <View
        style={[
          styles.dropdown,
          dropdownStyle,
          positionStyle
        ]}
        pointerEvents="box-none"
      >
        {options.map((opt) => (
          <TouchableOpacity
            key={String(opt.value)}
            onPress={() => onSelect(opt.value)}
            style={[styles.item, opt.value === value && styles.selectedItem, optionStyle]}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.itemText,
                opt.value === value && styles.selectedItemText,
              ]}
            >
              {opt.label}
            </Text>
            {opt.tooltip && (
              <TooltipWithIcon content={opt.tooltip} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    zIndex: 1001,
    padding: 10,
    backgroundColor: colors.WHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.SLATE_200,
    filter: [
      {
        dropShadow: {
          offsetX: 0,
          offsetY: 0,
          standardDeviation: 1,
          color: "rgba(75,81,91,0.2)",
        },
      },
      {
        dropShadow: {
          offsetX: 0,
          offsetY: 0,
          color: "rgba(75,81,91,0.03)",
        },
      },
      {
        dropShadow: {
          offsetX: 0,
          offsetY: 10,
          standardDeviation: 14,
          color: "rgba(0,0,0,0.06)",
        },
      },
      {
        dropShadow: {
          offsetX: 0,
          offsetY: 14,
          standardDeviation: 32,
          color: "rgba(75,81,91,0.12)",
        },
      },
    ],
    overflow: "visible",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
  },
  selectedItem: {
    backgroundColor: colors.SLATE_50,
  },
  itemText: {
    flex: 1,
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    lineHeight: 12,
    color: colors.SLATE_500,
  },
  selectedItemText: {
    color: colors.SLATE_800,
  },
});
