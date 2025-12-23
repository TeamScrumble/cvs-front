import IconButton from "@/components/button/IconButton";
import { colors, icons } from "@/constants";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

interface StarRatingProps {
  rating: number;
  gap?: number;
  size?: number;
  onPress?: (index: number) => void;
}

function StarRating({ rating, gap = 2, size = 14, onPress = () => {} }: StarRatingProps) {
  const numberOfStars = useMemo(() => Math.ceil(rating), [rating]);
  return (
    <View style={[styles.container, { gap }]}>
      {Array.from({ length: 5 }, (_, i) => i < numberOfStars).map((v, i) => {
        return (
          <IconButton
            key={`StarIcon_${i}`}
            icon={icons.filledStar}
            size={size}
            color={v ? colors.YELLOW : colors.SLATE_200}
            onPress={() => onPress(i + 1)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default StarRating;
