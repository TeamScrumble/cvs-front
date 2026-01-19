import { colors, fonts } from "@/constants";
import { Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";
import Divider from "../../../ui/Divider";
import ProgressBar from "../../product/ProgressBar";

interface ReviewOption {
  label: string;
  value: number;
}

interface ReviewOptionProps extends ReviewOption {
  total: number;
  isMax: boolean;
}

const ReviewOptionItem = ({
  label,
  value,
  total,
  isMax,
}: ReviewOptionProps) => {
  return (
    <View style={styles.optionItemContainer}>
      <Text style={[isMax ? styles.maxText : styles.text, { width: 65 }]}>
        {label}
      </Text>
      <ProgressBar value={value} total={total} />
      <Text
        style={[
          isMax ? styles.maxText : styles.text,
          { textAlign: "right", width: 50 },
        ]}
      >{`${value}명`}</Text>
    </View>
  );
};

interface ReviewExpandItemProps {
  title: string;
  total: number;
  options: ReviewOption[];
}

const ReviewExpandItem = ({ title, total, options }: ReviewExpandItemProps) => {
  const maxCount = Math.max(...options.map((v) => v.value));
  return (
    <View style={styles.expandItemContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.optionContainer}>
        {options.map((v, i) => {
          return (
            <ReviewOptionItem
              key={`ReviewOptionItem_${i}`}
              label={v.label}
              value={v.value}
              total={total}
              isMax={maxCount === v.value}
            />
          );
        })}
      </View>
    </View>
  );
};

interface ReviewExpandStatusProps {
  reviewExpandList: ReviewExpandItemProps[];
}

function ReviewExpandStatus({ reviewExpandList }: ReviewExpandStatusProps) {
  return reviewExpandList.map((v, i) => {
    return (
      <Fragment key={`ReviewExpandStatus_${i}`}>
        {i !== 0 && <Divider />}
        <ReviewExpandItem title={v.title} total={v.total} options={v.options} />
      </Fragment>
    );
  });
}

const styles = StyleSheet.create({
  expandItemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  titleText: {
    width: 60,
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    color: colors.SLATE_500,
  },
  optionContainer: {
    flex: 1,
    gap: 8,
  },
  optionItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  maxText: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    color: colors.SLATE_800,
  },
  text: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    color: colors.SLATE_500,
  },
});

export default ReviewExpandStatus;
