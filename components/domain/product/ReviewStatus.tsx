import { colors, fonts, icons } from "@/constants";
import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-iconify";
import ReviewSummaryStatus from "./ReviewSummaryStatus";
import ReviewExpandStatus from "./ReviewExpandStatus";
import useGetReviewSummary from "@/hooks/queries/review/useGetReviewSummary";

const ExpandButton = ({
  isOpen,
  onPress,
}: {
  isOpen: boolean;
  onPress: (isOpen: boolean) => void;
}) => {
  return (
    <View style={styles.detailButtonContainer}>
      <Pressable style={styles.detailButton} onPress={() => onPress(!isOpen)}>
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

type Props = {
  productId: number;
}

const ReviewStatus = ({ productId }: Props) => {
  const { data } = useGetReviewSummary(productId);
  const [isOpen, setIsOpen] = useState(false);

  const expandData = useMemo(() => {
    return (
      data?.aspects.map((v) => ({
        title: v.title,
        total: v.options.reduce((ac, cur) => ac + cur.count, 0),
        options: v.options.map((op) => ({
          label: op.optionText,
          value: op.count,
        })).sort((a, b) => b.value - a.value),
      })) ?? []
    );
  }, [data]);

  const summaryData = useMemo(() => {
    return (expandData.map((v) => {
      const maxCount = Math.max(...v.options.map(op => op.value));
      const maxValue = v.options.find(op => op.value === maxCount);
      return {
        label: v.title,
        state: maxValue?.label ?? "",
        percent: Math.round((maxValue?.value ?? 0) / v.total * 100)
      }
    }))
  }, [expandData]);

  return (
    <View style={styles.container}>
      {isOpen ? (
        <ReviewExpandStatus reviewExpandList={expandData} />
      ) : (
        <ReviewSummaryStatus reviewSummaryList={summaryData} />
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
