import CustomButton from "@/components/button/CustomButton";
import { colors, fonts } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProfileImage from "../ProfileImage";
import StarRating from "../StarRating";
import ReceiptBadge from "./ReceiptBadge";
import dayjs from "dayjs";

type Props = {
  reviewId: number;
  nickname: string;
  profileImage: string;
  rating: number;
  lastModifiedAt: string;
  hasReceipt: boolean;
}

const ReviewHeader = ({
  reviewId,
  nickname,
  profileImage,
  rating,
  lastModifiedAt,
  hasReceipt,
}: Props) => {
  const { productId } = useLocalSearchParams();
  const handleReportPress = () =>
    router.push(`/product/${productId}/review/${reviewId}/report`);

  return (
    <View style={styles.container}>
      <ProfileImage profileImage={profileImage} />
      <View style={{ gap: 2, flex: 1 }}>
        <View style={styles.nicknameContainer}>
          <Text style={styles.nicknameText}>{nickname}</Text>
          {hasReceipt && <ReceiptBadge />}
        </View>
        <View style={styles.ratingContainer}>
          <StarRating rating={rating} />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{dayjs(lastModifiedAt).format("YY.MM.DD")}</Text>
            <View style={styles.verticalDivdier} />
            <CustomButton
              label="신고"
              variant="standard"
              fontFamily={fonts.REGULAR}
              fontSize={12}
              letterSpacing={0}
              color={colors.SLATE_500}
              onPress={handleReportPress}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  nicknameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  nicknameText: {
    fontFamily: fonts.BOLD,
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: -0.24,
    color: colors.SLATE_800,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  text: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0,
    color: colors.SLATE_500,
  },
  verticalDivdier: {
    height: 10,
    borderRightWidth: 1,
    borderColor: colors.SLATE_300,
  },
});

export default ReviewHeader;
