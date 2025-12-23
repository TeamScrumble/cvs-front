import { colors, fonts, icons } from "@/constants";
import React, { useMemo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import BrandIcon from "../../BrandIcon";
import { brands, BrandType } from "@/@types/brand";
import StarRating from "../../StarRating";
import Icon from "react-native-iconify";
import ReceiptIcon from "@/assets/images/receipt_icon.svg";

interface ProductSummaryProps {
  brandType: BrandType;
  productName: string;
  rating: number;
  hasReceipt?: boolean;
  handlePressStar: (index: number) => void;
}

function ProductSummary({
  brandType,
  productName,
  rating,
  hasReceipt = false,
  handlePressStar,
}: ProductSummaryProps) {
  const starText = useMemo(() => {
    return [
      "별점을 입력해주세요",
      "1점 (별로예요)",
      "2점 (그냥 그래요)",
      "3점 (보통이에요)",
      "4점 (좋아요)",
      "5점 (최고예요)",
    ];
  }, []);

  return (
    <View style={styles.container}>
      {/* 상품 정보 */}
      <View style={{ flexDirection: "row", gap: 12 }}>
        <Image
          source={require("@/assets/images/snack_image.png")}
          width={90}
          height={90}
          style={styles.image}
        />
        <View style={{ gap: 6 }}>
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <BrandIcon brandType={brandType} />
            <Text
              style={{
                fontFamily: fonts.MEDIUM,
                fontSize: 16,
                lineHeight: 16,
                color: colors.SLATE_600,
              }}
            >
              {brands[brandType].name}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: fonts.REGULAR,
              fontSize: 14,
              lineHeight: 21,
              color: colors.SLATE_800,
            }}
          >
            {productName}
          </Text>
        </View>
      </View>
      {/* 별점 평가 */}
      <View style={{ gap: 8, alignItems: "center" }}>
        <Text
          style={{
            fontFamily: fonts.MEDIUM,
            fontSize: 18,
            lineHeight: 18,
            color: colors.SLATE_800,
          }}
        >
          상품 만족도를 평가해주세요
        </Text>
        <StarRating
          rating={rating}
          size={24}
          gap={4}
          onPress={handlePressStar}
        />
        <Text
          style={{
            fontFamily: fonts.MEDIUM,
            fontSize: 14,
            lineHeight: 14,
            color: colors.SLATE_500,
          }}
        >
          {starText[rating]}
        </Text>
      </View>
      {/* 영수증 인증 */}
      {hasReceipt ? (
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            gap: 10,
            alignItems: "center",
            backgroundColor: colors.GRAY_50,
          }}
        >
          <ReceiptIcon style={{ width: 16, height: 16 }} />
          <Text style={styles.authorizedReceiptText}>영수증 인증 완료</Text>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: colors.GRAY_50,
          }}
        >
          <Text style={styles.receiptInfoText}>
            영수증 인증 시 후기에 인증 뱃지가 표시돼요.
          </Text>
          <Pressable
            style={styles.receiptButtonContainer}
            onPress={() => {
              /* 영수증 인증 화면으로 이동 */
            }}
          >
            <Icon
              icon={icons.receiptOutline}
              size={16}
              color={colors.SLATE_800}
            />
            <Text style={styles.receiptButtonText}>인증하기</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 24,
  },
  image: {
    borderRadius: 4,
    width: 90,
    height: 90,
  },
  receiptInfoText: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    lineHeight: 12,
    color: colors.SLATE_800,
  },
  receiptButtonContainer: {
    flexDirection: "row",
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    borderColor: colors.GREEN,
    borderWidth: 1,
    borderRadius: 100,
  },
  receiptButtonText: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    lineHeight: 12,
    color: colors.SLATE_800,
  },
  authorizedReceiptText: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    lineHeight: 12,
    color: colors.GREEN,
  },
});

export default ProductSummary;
