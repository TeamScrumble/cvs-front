import { colors, fonts, icons } from "@/constants";
import React, { Dispatch, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-iconify";
import ReviewSummaryStatus from "./ReviewSummaryStatus";
import ReviewExpandStatus from "./ReviewExpandStatus";

const ExpandButton = ({
  isOpen,
  onPress,
}: {
  isOpen: boolean;
  onPress: (isOpen: boolean) => void;
}) => {
  return (
    <View style={styles.detailButtonContainer}>
      <Pressable
        style={styles.detailButton}
        onPress={() => onPress(!isOpen)}
      >
        <Text style={styles.detailButtonLabel}>
          {isOpen ? "접기" : "자세히 보기"}
        </Text>
        <Icon
          icon={isOpen ? icons.expandLess : icons.expandMore}
          size={12}
          color={colors.SLATE_500}
        />
      </Pressable>
    </View>
  );
};

interface ReviewStatusProps {}

function ReviewStatus({}: ReviewStatusProps) {
  const [isOpen, setIsOpen] = useState(false);

  const summaryDummyData = [
    { label: "품질", state: "매우 좋아요", percent: 80 },
    { label: "가성비", state: "최고예요", percent: 100 },
    { label: "재구매의사", state: "완전 있어요", percent: 100 },
  ];
  const expandDummyData = [
    {
      title: "품질",
      total: 3470,
      options: [
        { label: "매우 좋아요", value: 3430 },
        { label: "괜찮아요", value: 30 },
        { label: "별로예요", value: 10 },
      ],
    },
    {
      title: "가성비",
      total: 3470,
      options: [
        { label: "최고예요", value: 3470 },
        { label: "그냥 그래요", value: 0 },
        { label: "매우 좋아요", value: 0 },
      ],
    },
    {
      title: "재구매의사",
      total: 3470,
      options: [
        { label: "완전 있어요", value: 3615 },
        { label: "전혀 없어요", value: 100 },
        { label: "모르겠어요", value: 55 },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {isOpen ? (
        <ReviewExpandStatus reviewExpandList={expandDummyData} />
      ) : (
        <ReviewSummaryStatus reviewSummaryList={summaryDummyData} />
      )}
      <ExpandButton isOpen={isOpen} onPress={setIsOpen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SLATE_TINT_5,
    paddingVertical: 16,
    paddingHorizontal: 10,
    gap: 12,
  },
  detailButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  detailButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailButtonLabel: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    color: colors.SLATE_500,
  },
});

export default ReviewStatus;
