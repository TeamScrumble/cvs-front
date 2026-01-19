import { ReviewFilter } from "@/@types/review";
import DetailReviewBar from "@/components/domain/product/DetailReviewBar";
import ReviewStatus from "@/components/domain/product/ReviewStatus";
import ReviewItem from "@/components/feature/review/item/ReviewItem";
import ViewAllReviewButton from "@/components/feature/review/ViewAllReviewButton";
import SelectBottomSheet from "@/components/ui/bottomSheet/SelectBottomSheet";
import Divider from "@/components/ui/Divider";
import SegmentedControl from "@/components/ui/SegmentedControl";
import Toggle from "@/components/ui/Toggle";
import { colors, fonts } from "@/constants";
import { REVIEW_ORDER_OPTIONS, REVIEW_SORT_TYPE } from "@/constants/review";
import useAddReviewLike from "@/hooks/queries/review/useAddReviewLike";
import useDeleteReviewLike from "@/hooks/queries/review/useDeleteReviewLike";
import useGetInfiniteReviews from "@/hooks/queries/review/useGetInfiniteReviews";
import useGetReviewSummary from "@/hooks/queries/review/useGetReviewSummary";
import { useScrollToTop } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Footer from "../../../layout/Footer";
import EmptyReviewSection from "../EmptyReviewSection";
import ReviewItemSkeleton from "../ReviewItemSkeleton";

type Props = {
  productId: number;
  HeaderComponent?: React.ReactNode;
  FooterComponent?: React.ReactNode;
  infiniteScroll?: boolean;
};

const ReviewSection = ({
  productId,
  infiniteScroll = false,
  HeaderComponent,
  FooterComponent,
}: Props) => {
  const [filter, setFilter] = useState<ReviewFilter>({
    receiptOnly: false,
    imageOnly: false,
    sort: REVIEW_SORT_TYPE.RECOMMENDED,
  });
  const { data: summary } = useGetReviewSummary(productId);
  const {
    data: reviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useGetInfiniteReviews(productId, filter);
  const addReviewLike = useAddReviewLike(productId, filter);
  const deleteReviewLike = useDeleteReviewLike(productId, filter);

  const ref = useRef<FlatList | null>(null);

  const [isRefreshing, setIsRefreshing] = useState(false);

  useScrollToTop(ref);

  const handleEndReached = useCallback(() => {
    if (!infiniteScroll) return;
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(async () => {
    if (!infiniteScroll) return;
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  return (
    <>
      <FlatList
        ref={ref}
        ListHeaderComponent={
          <View style={{ gap: 16 }}>
            {HeaderComponent}
            {summary?.totalCount > 0 && (
              <>
                {/* 후기 */}
                <DetailReviewBar
                  productId={productId}
                  rating={summary?.averageRating ?? 0}
                  total={summary?.totalCount ?? 0}
                  hasButton={!infiniteScroll && (summary?.totalCount ?? 0) > 0}
                />
                {/* 후기 통계 */}
                <ReviewStatus productId={productId} />
                {/* 전체 / 영수증 후기 탭 */}
                <SegmentedControl
                  value={filter.receiptOnly ? "receipt" : "all"}
                  onValueChange={(v) =>
                    setFilter((prev) => ({
                      ...prev,
                      receiptOnly: v === "receipt",
                    }))
                  }
                >
                  <SegmentedControl.Item
                    value="all"
                    label="전체"
                    count={summary?.totalCount ?? 0}
                  />
                  <SegmentedControl.Item
                    value="receipt"
                    label="영수증"
                    count={summary?.receiptCount ?? 0}
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
                        value={filter.imageOnly}
                        onChange={(v) =>
                          setFilter((prev) => ({ ...prev, imageOnly: v }))
                        }
                      />
                      <Text style={styles.toggleLabelText}>사진후기만</Text>
                    </View>
                    {/* 정렬 셀렉트 */}
                    <SelectBottomSheet
                      value={filter.sort}
                      options={REVIEW_ORDER_OPTIONS}
                      onChange={(v) =>
                        setFilter((prev) => ({
                          ...prev,
                          sort: v,
                        }))
                      }
                    />
                  </View>
                  <Divider borderColor={colors.SLATE_200} />
                </View>
              </>
            )}
          </View>
        }
        data={reviews?.pages?.flat()}
        renderItem={({ item, index }) => (
          <ReviewItem
            review={item}
            isLast={index === (reviews?.pages?.flat()?.length ?? 0) - 1}
            addReviewLike={addReviewLike.mutate}
            deleteReviewLike={deleteReviewLike.mutate}
          />
        )}
        keyExtractor={(item) => String(item.reviewId)}
        contentContainerStyle={styles.contentContainer}
        onEndReached={handleEndReached} // 하단에 도달했을때 이벤트 발생
        onEndReachedThreshold={0.5} // 0.5인 경우 하단에 완전히 닿지 않아도 onEndReached를 트리거함
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={() =>
          !infiniteScroll && (
            <>
              {summary?.totalCount > 0 && (
                <ViewAllReviewButton
                  totalReviews={summary?.totalCount ?? 0}
                  productId={productId}
                />
              )}
              <Footer />
            </>
          )
        }
        ListEmptyComponent={
          isLoading ? (
            <>
              <ReviewItemSkeleton />
              <Divider
                borderColor={colors.SLATE_200}
                style={{ marginTop: 4 }}
              />
              <ReviewItemSkeleton />
              <Divider
                borderColor={colors.SLATE_200}
                style={{ marginTop: 4 }}
              />
              <ReviewItemSkeleton />
            </>
          ) : (
            <EmptyReviewSection />
          )
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 56,
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

export default ReviewSection;
