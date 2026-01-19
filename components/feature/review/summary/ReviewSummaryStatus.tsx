import { colors, fonts } from "@/constants";
import { StyleSheet, Text, View } from "react-native";
import Divider from "../../../ui/Divider";

interface ReviewSummary {
  label: string;
  state: string;
  percent: number;
}

interface ReviewSummaryItemProps {
  key: string;
  reviewSummaryItem: ReviewSummary;
}

const ReviewSummaryItem = ({ reviewSummaryItem }: ReviewSummaryItemProps) => {
  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryLabelText}>{reviewSummaryItem.label}</Text>
      <View style={styles.summaryRightContainer}>
        <Text style={styles.summaryStateText}>{reviewSummaryItem.state}</Text>
        <Divider borderStyle="dashed" />
        <Text
          style={styles.summaryPercentText}
        >{`${reviewSummaryItem.percent}%`}</Text>
      </View>
    </View>
  );
};

interface ReviewSummaryStatusProps {
  reviewSummaryList: ReviewSummary[];
}

function ReviewSummaryStatus({ reviewSummaryList }: ReviewSummaryStatusProps) {
  return reviewSummaryList.map((v, i) => {
    return (
      <ReviewSummaryItem key={`ExpandLessItem_${i}`} reviewSummaryItem={v} />
    );
  });
}

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: "row",
    gap: 8,
  },
  summaryLabelText: {
    width: 60,
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    color: colors.SLATE_500,
  },
  summaryRightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  summaryStateText: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    color: colors.SLATE_800,
  },
  summaryPercentText: {
    fontFamily: fonts.BOLD,
    fontSize: 12,
    color: colors.SLATE_800,
  },
});

export default ReviewSummaryStatus;
