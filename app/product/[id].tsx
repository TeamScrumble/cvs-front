import Divider from "@/components/Divider";
import Footer from "@/components/domain/Footer";
import DetailReviewBar from "@/components/domain/product/DetailReviewBar";
import DetailTitle from "@/components/domain/product/DetailTitle";
import ReviewStatus from "@/components/domain/product/ReviewStatus";
import BottomBar from "@/components/domain/review/BottomBar";
import Review from "@/components/domain/review/Review";
import ViewAllReviewButton from "@/components/domain/review/ViewAllReviewButton";
import Dropdown from "@/components/dropdown/Dropdown";
import EmptyImage from "@/components/EmptyImage";
import Header from "@/components/Header";
import SegmentedControl from "@/components/SegmentedControl";
import Toggle from "@/components/Toggle";
import { colors, fonts } from "@/constants";
import { DUMMY_REVIEW_LIST } from "@/constants/dummy";
import { toPositiveInt } from "@/utils/common";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ProductDetailProps {}

function ProductDetail({}: ProductDetailProps) {
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
      <ScrollView style={{ flex: 1 }}>
        <Header handlePressBackButton={() => router.back()} />
        <View style={styles.contentContainer}>
          {/* 이미지가 없다면 EmptyImage를 보여줘야함 */}
          <EmptyImage />
          {/* 상세 화면 타이틀 */}
          <DetailTitle
            productTitle="삼양)맹구짱구85g"
            productPrice="1,700원"
            eventBadgeList={[{ brand: "CU", plusEvent: "2+1" }]}
          />
          {/* 후기 */}
          <DetailReviewBar rating={4.8} total={3470} hasButton />
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
          {DUMMY_REVIEW_LIST.map((v, i) => {
            return (
              <Review
                key={`ReviewItem_${i}`}
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
          <ViewAllReviewButton totalReviews={3470} />
          <Footer />
        </View>
      </ScrollView>
      <BottomBar isLike={false} totalLikes={8.6} onPressLike={() => {}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    gap: 16,
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

export default ProductDetail;
