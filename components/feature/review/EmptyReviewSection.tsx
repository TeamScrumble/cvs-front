import { colors, fonts } from "@/constants";
import { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";

const EmptyReviewSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>후기</Text>
      <View style={styles.wrapper}>
        <Text style={styles.contentText}>등록된 후기가 없습니다.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  wrapper: {
    paddingVertical: 60,
    alignItems: "center",
  },
  labelText: {
    fontFamily: fonts.MEDIUM,
    fontSize: 14,
    lineHeight: 14,
    color: colors.SLATE_800,
  },
  contentText: {
    fontFamily: fonts.BOLD,
    fontSize: 12,
    lineHeight: 12,
    color: colors.SLATE_800,
  }
});

export default memo(EmptyReviewSection);
