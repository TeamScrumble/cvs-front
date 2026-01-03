import { Review } from "@/@types/review";
import React from "react";
import { StyleSheet, View } from "react-native";
import ReviewContent from "./ReviewContent";
import ReviewHeader from "./ReviewHeader";
import ReviewStatus from "./ReviewStatus";
import Divider from "@/components/Divider";
import { colors } from "@/constants";

type Props = {
  review: Review;
  isLast?: boolean;
}

const ReviewItem = ({
  review, isLast = false
}: Props) => {
  return (
    <View style={styles.container}>
      <ReviewHeader
        reviewId={review.reviewId}
        nickname={review.nickname}
        profileImage={review.profileImage}
        rating={review.rating}
        lastModifiedAt={review.lastModifiedAt}
        hasReceipt={false}
      />
      <ReviewStatus reviewScores={review.scores} />
      <ReviewContent content={review.content} likeCount={review.likeCount} />
      {!isLast && <Divider borderColor={colors.SLATE_200} style={{ marginTop: 4 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});

export default ReviewItem;
