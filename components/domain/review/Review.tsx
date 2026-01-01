import Divider from "@/components/Divider";
import { colors } from "@/constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import ReviewContent from "./ReviewContent";
import ReviewHeader from "./ReviewHeader";
import ReviewStatus from "./ReviewStatus";

interface ReviewProps {
  reviewId: number;
  nickname: string;
  profileUrl: string;
  rating: number;
  createdDate: string;
  hasReceipt: boolean;
  reviewCategoryList: { label: string; value: string }[];
  content: string;
  likeCount: number;
  isLast: boolean;
}

function Review({
  reviewId,
  nickname,
  profileUrl,
  rating,
  createdDate,
  hasReceipt,
  reviewCategoryList,
  content,
  likeCount,
  isLast,
}: ReviewProps) {
  return (
    <View style={styles.container}>
      <ReviewHeader
        reviewId={reviewId}
        nickname={nickname}
        profileUrl={profileUrl}
        rating={rating}
        createdDate={createdDate}
        hasReceipt={hasReceipt}
      />
      <ReviewStatus reviewCategoryList={reviewCategoryList} />
      <ReviewContent content={content} likeCount={likeCount} />
      {!isLast && (
        <Divider borderColor={colors.SLATE_200} style={{ marginTop: 4 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});

export default Review;
