import { ReviewFilterMeta } from "@/app/product/[productId]/review";
import Divider from "@/components/Divider";
import DetailReviewBar from "@/components/domain/product/DetailReviewBar";
import ReviewStatus from "@/components/domain/product/ReviewStatus";
import Review from "@/components/domain/review/Review";
import ViewAllReviewButton from "@/components/domain/review/ViewAllReviewButton";
import Dropdown from "@/components/dropdown/Dropdown";
import SegmentedControl from "@/components/SegmentedControl";
import Toggle from "@/components/Toggle";
import { colors, fonts } from "@/constants";
import { DUMMY_REVIEW_LIST } from "@/constants/dummy";
import useGetReviewSummary from "@/hooks/queries/review/useGetReviewSummary";
import { toPositiveInt } from "@/utils/index";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const ReviewSection = () => {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const productIdNum = toPositiveInt(productId);
  const { data: summaryData } = useGetReviewSummary(productIdNum);

  const [meta, setMeta] = useState<ReviewFilterMeta>({
    filter: "all",
    onlyPictures: false,
    order: "recommend",
  });
  const tooltipContent = useMemo(() => {
    return "최신성, 도움돼요 수, 사진 첨부 여부를 종합 점수로 계산해 높은 순으로 정렬합니다.";
  }, []);

  // 유효하지 않은 id값의 경우 에러화면 띄워야함
  if (productIdNum === null) return null;
  return (
    <>
      {/* 후기 */}
      <DetailReviewBar
        productId={productIdNum}
        rating={summaryData?.averageRating ?? 0}
        total={summaryData?.totalCount ?? 0}
        hasButton
      />
      {/* 후기 통계 */}
      <ReviewStatus productId={productIdNum} />
      {/* 전체 / 영수증 후기 탭 */}
      <SegmentedControl
        value={meta.filter}
        onValueChange={(v) =>
          setMeta((prev) => ({ ...prev, filter: v as "all" | "receipt" }))
        }
      >
        <SegmentedControl.Item
          value="all"
          label="전체"
          count={summaryData?.totalCount ?? 0}
        />
        <SegmentedControl.Item
          value="receipt"
          label="영수증"
          count={summaryData?.receiptCount ?? 0}
        />
      </SegmentedControl>
      <View style={{ gap: 8 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* 사진 후기 토글 */}
          <View style={styles.toggleWrapper}>
            <Toggle
              value={meta.onlyPictures}
              onChange={(v) =>
                setMeta((prev) => ({ ...prev, onlyPictures: v }))
              }
            />
            <Text style={styles.toggleLabelText}>사진후기만</Text>
          </View>
          {/* 정렬 셀렉트 */}
          <Dropdown
            value={meta.order}
            placeholder=""
            onChange={(v) =>
              setMeta((prev) => ({
                ...prev,
                order: v as ReviewFilterMeta["order"],
              }))
            }
            options={[
              {
                label: "추천순",
                value: "recommend",
                tooltip: tooltipContent,
              },
              { label: "최신순", value: "latest" },
              { label: "별점 높은 순", value: "highRating" },
              { label: "별점 낮은 순", value: "lowRating" },
              { label: "도움돼요 순", value: "helpful" },
            ]}
          />
        </View>
        <Divider borderColor={colors.SLATE_200} />
      </View>
      {DUMMY_REVIEW_LIST.map((v, i) => {
        return (
          <Review
            key={`ReviewItem_${i}`}
            reviewId={v.reviewId}
            nickname={v.nickname}
            profileUrl={v.profileUrl}
            rating={v.rating}
            createdDate={v.createdDate}
            hasReceipt={v.hasReceipt}
            reviewCategoryList={v.reviewCategoryList}
            content={v.content}
            likeCount={v.likeCount}
            isLast={DUMMY_REVIEW_LIST.length - 1 === i}
          />
        );
      })}
      <ViewAllReviewButton totalReviews={summaryData?.totalCount ?? 0} />
    </>
  )
}

const styles = StyleSheet.create({
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

export default ReviewSection;