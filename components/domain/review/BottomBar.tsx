import CustomButton from "@/components/button/CustomButton";
import IconButton from "@/components/button/IconButton";
import { colors, fonts, icons } from "@/constants";
import useGetProduct from "@/hooks/queries/product/useGetProduct";
import useLikeProduct from "@/hooks/queries/product/useLikeProduct";
import { formatLikeNumber } from "@/utils";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  productId: number;
}

const BottomBar = ({
  productId,
}: Props) => {
  const { data: product } = useGetProduct(productId);
  const likeProduct = useLikeProduct();

  const handleLikeProduct = useCallback(() => {
    likeProduct.mutate(productId);
  }, [likeProduct, productId]);

  return (
    <View style={styles.container}>
      <View style={styles.iconButtonWrapper}>
        <IconButton
          icon={product?.isLiked ? icons.heartFill : icons.heartLight}
          color={product?.isLiked ? colors.RED : colors.SLATE_500}
          size={24}
          onPress={handleLikeProduct}
        />
        <Text style={styles.countText}>{formatLikeNumber(product?.product.likeCount ?? 0)}</Text>
      </View>
      <CustomButton
        label={product.product.isDeleted ? "판매 종료 상품입니다" : "후기 작성하기"}
        containerStyle={{ flex: 1 }}
        onPress={() => {
          if (product.product.isDeleted) return;
          router.push(`/product/${productId}/review/write`);
        }}
        disabled={product.product.isDeleted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
    boxSizing: "border-box",
    borderTopColor: colors.SLATE_200,
    borderTopWidth: 1,
    alignItems: "center",
  },
  iconButtonWrapper: {
    gap: 4,
    alignItems: "center",
  },
  countText: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    color: colors.SLATE_500,
  },
});

export default BottomBar;
