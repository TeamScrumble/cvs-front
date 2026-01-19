import IconButton from "@/components/ui/button/IconButton";
import { colors, fonts, icons } from "@/constants";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function ReviewDetailHeader() {
  return (
    <View style={styles.container}>
      <IconButton
        icon={icons.chevronLeftLine}
        size={24}
        color={colors.SLATE_800}
        onPress={() => router.back()}
      />
      <Text style={styles.text}>상품 후기 더보기</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text: {
    fontFamily: fonts.BOLD,
    fontSize: 18,
    letterSpacing: -0.25,
  },
});

export default ReviewDetailHeader;
