import BottomBar from "@/components/feature/product/BottomBar";
import ReviewSection from "@/components/feature/review/summary/ReviewSection";
import { colors, fonts } from "@/constants";
import { toPositiveInt } from "@/utils/index";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ReviewDetailScreen = () => {
  const { productId } = useLocalSearchParams<{
    productId: string;
  }>();
  const productIdNum = toPositiveInt(productId);

  // 유효하지 않은 id값의 경우 에러화면 띄워야함
  if (productIdNum === null) return null;

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.container}>
      <ReviewSection productId={productIdNum} infiniteScroll />
      <BottomBar productId={productIdNum} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 16,
    paddingTop: 16,
    paddingBottom: 56,
    paddingHorizontal: 20,
  },
  toggleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  toggleLabelText: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    color: colors.SLATE_500,
  },
});

export default ReviewDetailScreen;
