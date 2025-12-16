import { colors, icons } from "@/constants";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-iconify";

interface StarRatingProps {
  rating: number;
}

function StarRating({ rating }: StarRatingProps) {
  const numberOfStars = useMemo(() => Math.ceil(rating), [rating]);
  return (
    <View style={styles.container}>
      {Array.from({ length: 5 }, (_, i) => i < numberOfStars).map((v, i) => {
        return (
          <Icon
            key={`StarIcon_${i}`}
            icon={icons.filledStar}
            size={14}
            color={v ? colors.YELLOW : colors.SLATE_200}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 2,
  },
});

export default StarRating;
