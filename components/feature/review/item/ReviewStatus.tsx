import { Review } from "@/@types/review";
import { colors, fonts } from "@/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ReviewStatusProps {
  reviewScores: Review["scores"];
}

function ReviewStatus({ reviewScores }: ReviewStatusProps) {
  return (
    <View style={styles.container}>
      {reviewScores.map((v, i) => {
        return (
          <View key={`ReviewCategoryItem_${i}`} style={styles.itemContainer}>
            <Text style={[styles.text, { width: 60, color: colors.SLATE_500 }]}>
              {v.aspectTitle}
            </Text>
            <Text style={[styles.text, { color: colors.SLATE_800 }]}>
              {v.optionName}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    padding: 10,
    gap: 8,
    backgroundColor: colors.SLATE_TINT_5,
  },
  itemContainer: {
    flexDirection: "row",
    gap: 8,
  },
  text: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0,
  },
});

export default ReviewStatus;
