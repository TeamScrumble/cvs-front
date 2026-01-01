import Footer from "@/components/domain/Footer";
import DetailTitle from "@/components/domain/product/DetailTitle";
import EmptyReviewSection from "@/components/domain/product/EmptyReviewSection";
import ReviewSection from "@/components/domain/product/ReviewSection";
import BottomBar from "@/components/domain/review/BottomBar";
import EmptyImage from "@/components/EmptyImage";
import useGetProduct from "@/hooks/queries/product/useGetProduct";
import useLikeProduct from "@/hooks/queries/product/useLikeProduct";
import useGetReviewSummary from "@/hooks/queries/review/useGetReviewSummary";
import { toPositiveInt } from "@/utils/index";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ProductDetailScreen() {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const productIdNum = toPositiveInt(productId);
  const { data: productData, isLoading: productLoading } = useGetProduct(productIdNum);
  const { data: summaryData, isLoading: summaryLoading } = useGetReviewSummary(productIdNum);
  const likeProduct = useLikeProduct();

  const handleLikeProduct = () => {
    likeProduct.mutate(productIdNum);
  };

  // 유효하지 않은 id값의 경우 에러화면 띄워야함
  if (productIdNum === null) return null;

  if (productLoading || summaryLoading) return null;

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <View style={{ alignSelf: "center" }}>
            {productData?.product.img ? (
              <Image
                src={productData?.product.img}
                alt={"product img"}
                width={320}
                height={320}
              />
            ) : (
              <EmptyImage />
            )}
          </View>
          {/* 상세 화면 타이틀 */}
          {productData && (
            <DetailTitle
              productTitle={productData.product.title || ""}
              productPrice={`${productData.product.price.toLocaleString()}원`}
              eventBadgeList={[
                {
                  brand: productData.product.cvsTarget,
                  plusEvent: productData.product.event,
                },
              ]}
            />
          )}
          {/* 리뷰 영역 */}
          {summaryData?.totalCount ?? 0 > 0
            ? <ReviewSection />
            : <EmptyReviewSection />}
          <Footer />  
        </View>
      </ScrollView>
      <BottomBar
        productId={productId}
        isLike={productData?.isLiked ?? false}
        totalLikes={productData?.product.likeCount ?? 0}
        onPressLike={handleLikeProduct}
      />
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
  }
});

export default ProductDetailScreen;
