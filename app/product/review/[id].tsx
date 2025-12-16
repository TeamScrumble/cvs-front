import Divider from "@/components/Divider";
import DetailReviewBar from "@/components/domain/product/DetailReviewBar";
import ReviewStatus from "@/components/domain/product/ReviewStatus";
import BottomBar from "@/components/domain/review/BottomBar";
import Review from "@/components/domain/review/Review";
import ReviewDetailHeader from "@/components/domain/review/ReviewDetailHeader";
import Dropdown from "@/components/dropdown/Dropdown";
import SegmentedControl from "@/components/SegmentedControl";
import Toggle from "@/components/Toggle";
import { colors, fonts } from "@/constants";
import { DUMMY_REVIEW_LIST } from "@/constants/dummy";
import { toPositiveInt } from "@/utils/common";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ReviewDetailProps {}

function ReviewDetail({}: ReviewDetailProps) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = toPositiveInt(id);
  const [activeTab, setActiveTab] = useState("all");
  const [activeToggle, setActiveToggle] = useState(false);
  const [activeSelect, setActiveSelect] = useState<string | null>("recommend");
  const tooltipContent = useMemo(() => {
    return "최신성, 도움돼요 수, 사진 첨부 여부를 종합 점수로 계산해 높은 순으로 정렬합니다.";
  }, []);

  // 유효하지 않은 id값의 경우 에러화면 띄워야함
  if (productId === null) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ReviewDetailHeader />
      <FlatList
        data={DUMMY_REVIEW_LIST}
        renderItem={(v) => {
          return (
            <Review
              nickname={v.item.nickname}
              profileUrl={v.item.profileUrl}
              rating={v.item.rating}
              createdDate={v.item.createdDate}
              hasReceipt={v.item.hasReceipt}
              reviewCategoryList={v.item.reviewCategoryList}
              content={v.item.content}
              likeCount={v.item.likeCount}
              isLast={DUMMY_REVIEW_LIST.length - 1 === v.index}
            />
          );
        }}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(_, index) => `ReviewItem_${index}`}
        ListHeaderComponent={
          <View style={{ gap: 16 }}>
            {/* 후기 */}
            <DetailReviewBar rating={4.8} total={3470} />
            {/* 후기 통계 */}
            <ReviewStatus />
            {/* 전체 / 영수증 후기 탭 */}
            <SegmentedControl value={activeTab} onValueChange={setActiveTab}>
              <SegmentedControl.Item value="all" label="전체" count={3470} />
              <SegmentedControl.Item
                value="receipt"
                label="영수증"
                count={2849}
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
                  <Toggle value={activeToggle} onChange={setActiveToggle} />
                  <Text style={styles.toggleLabelText}>사진후기만</Text>
                </View>
                {/* 정렬 셀렉트 */}
                <Dropdown
                  value={activeSelect}
                  placeholder=""
                  onChange={setActiveSelect}
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
          </View>
        }
      />
      <BottomBar isLike={false} totalLikes={8.6} onPressLike={() => {}} />
    </SafeAreaView>
  );
}

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

export default ReviewDetail;
