import { colors, fonts, icons } from "@/constants";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Icon from "react-native-iconify";

interface ViewAllReviewButtonProps {
  totalReviews: number;
}

function ViewAllReviewButton({ totalReviews }: ViewAllReviewButtonProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push("/product/review/2")}
    >
      <Text
        style={styles.text}
      >{`${totalReviews.toLocaleString()}개 후기 전체보기`}</Text>
      <Icon icon={icons.chevronRightLine} size={16} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    boxSizing: "border-box",
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.SLATE_800,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  text: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
  },
});

export default ViewAllReviewButton;
