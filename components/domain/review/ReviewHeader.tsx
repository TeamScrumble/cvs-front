import TextButton from "@/components/button/TextButton";
import { colors, fonts } from "@/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StarRating from "../StarRating";
import ProfileImage from "../ProfileImage";
import ReceiptBadge from "./ReceiptBadge";

interface ReviewHeaderProps {
  nickname: string;
  profileUrl: string;
  rating: number;
  createdDate: string; // todo: dateTime ?,
  hasReceipt: boolean;
}

function ReviewHeader({
  nickname,
  profileUrl,
  rating,
  createdDate,
  hasReceipt,
}: ReviewHeaderProps) {
  const handleReportPress = () => {};

  return (
    <View style={styles.container}>
      <ProfileImage profileUrl={profileUrl} />
      <View style={{ gap: 2, flex: 1 }}>
        <View style={styles.nicknameContainer}>
          <Text style={styles.nicknameText}>{nickname}</Text>
          {hasReceipt && <ReceiptBadge />}
        </View>
        <View style={styles.ratingContainer}>
          <StarRating rating={rating} />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{createdDate}</Text>
            <View style={styles.verticalDivdier} />
            <TextButton
              label="신고"
              onPress={handleReportPress}
              textStyle={styles.text}
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
