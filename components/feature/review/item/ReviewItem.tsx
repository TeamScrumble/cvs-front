import { Review } from "@/@types/review";
import Divider from "@/components/ui/Divider";
import { colors } from "@/constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import ReviewContent from "./ReviewContent";
import ReviewHeader from "./ReviewHeader";
import ReviewStatus from "./ReviewStatus";

type Props = {
  review: Review;
  isLast?: boolean;
  addReviewLike: (reviewId: number) => void;
  deleteReviewLike: (reviewId: number) => void;
};

const ReviewItem = ({
  review,
  isLast = false,
  addReviewLike,
  deleteReviewLike,
}: Props) => {
  return (
    <View style={styles.container}>
      <ReviewHeader
        reviewId={review.reviewId}
        nickname={review.nickname}
        profileImage={review.profileImage}
        rating={review.rating}
        lastModifiedAt={review.lastModifiedAt}
        hasReceipt={review.isReceipt}
      />
      <ReviewStatus reviewScores={review.scores} />
      <ReviewContent
        content={review.content}
        likeCount={review.likeCount}
        imageUrlList={review.imgList}
        isLikeByMe={review.isLikeByMe}
        addReviewLike={() => addReviewLike(review.reviewId)}
        deleteReviewLike={() => deleteReviewLike(review.reviewId)}
      />
      {!isLast && (
        <Divider borderColor={colors.SLATE_200} style={{ marginTop: 4 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});

export default ReviewItem;
