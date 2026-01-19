import BottomBar from "@/components/feature/product/BottomBar";
import ProductSection from "@/components/feature/product/ProductSection";
import ReviewSection from "@/components/feature/review/summary/ReviewSection";
import Loading from "@/components/layout/Loading";
import { toPositiveInt } from "@/utils/index";
import { useLocalSearchParams } from "expo-router";
import React, { Suspense } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductDetailScreen = () => {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const productIdNum = toPositiveInt(productId);

  // 유효하지 않은 id값의 경우 에러화면 띄워야함
  if (productIdNum === null) return null;

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.container}>
      <Suspense fallback={<Loading />}>
        <ReviewSection
          productId={productIdNum}
          HeaderComponent={<ProductSection productId={productIdNum} />}
        />
        <BottomBar productId={productIdNum} />
      </Suspense>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProductDetailScreen;
