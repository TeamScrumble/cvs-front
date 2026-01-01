import { colors, fonts, icons } from "@/constants";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-iconify";

interface DetailReviewBarProps {
  productId: number;
  rating: number; // 별점
  total: number; // 총 후기 갯수
  hasButton?: boolean;
}

function DetailReviewBar({
  productId,
  rating,
  total,
  hasButton = false,
}: DetailReviewBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={[styles.text, { fontSize: 14 }]}>후기</Text>
        <Icon icon={icons.filledStar} size={14} color={colors.YELLOW} />
        <Text style={[styles.text, { fontSize: 16 }]}>{rating}</Text>
        <Text
          style={[styles.text, { fontSize: 16 }]}
        >{`(${total.toLocaleString()})`}</Text>
      </View>
      {hasButton && (
        <Pressable style={styles.buttonContainer} onPress={() => router.push(`/product/${productId}/review`)}>
          <Text style={styles.buttonLabel}>더보기</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  summaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  text: {
    fontFamily: fonts.MEDIUM,
    color: colors.SLATE_800,
  },
  buttonContainer: {},
  buttonLabel: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    color: colors.SLATE_500,
    textDecorationLine: "underline",
  },
});

export default DetailReviewBar;
