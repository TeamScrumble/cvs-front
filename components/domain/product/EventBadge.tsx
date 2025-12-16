import { BrandType } from "@/@types/brand";
import { PlusEventType } from "@/@types/event";
import { colors, fonts } from "@/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface EventBadgeProps {
  brandType?: BrandType;
  plusEventType?: PlusEventType;
  isSaleEnd?: boolean
}

const badgeColors: Record<BrandType, Record<PlusEventType, string>> = {
  CU: {
    "1+1": colors.CU_GREEN,
    "2+1": colors.CU_PURPLE,
  },
  GS25: {
    "1+1": colors.GS_ORANGE,
    "2+1": colors.GS_GREEN,
  },
  SEVEN_ELEVEN: {
    "1+1": colors.SEVEN_ELEVEN_GREEN,
    "2+1": colors.SEVEN_ELEVEN_ORANGE,
  },
  EMART24: {
    "1+1": colors.EMART_YELLOW,
    "2+1": colors.EMART_DARK_GRAY,
  },
};

function EventBadge({ brandType = "CU", plusEventType = "1+1", isSaleEnd = false }: EventBadgeProps) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isSaleEnd ? "#1A1A1AB2" : badgeColors[brandType][plusEventType] },
      ]}
    >
      <Text style={styles.text}>{isSaleEnd ? "판매 종료" : plusEventType}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 33,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  text: {
    fontFamily: fonts.BOLD,
    fontSize: 12,
    color: colors.WHITE,
  },
});

export default EventBadge;
