import CustomButton from "@/components/button/CustomButton";
import IconButton from "@/components/button/IconButton";
import { colors, fonts, icons } from "@/constants";
import { formatLikeNumber } from "@/utils";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BottomBarProps {
  productId: string;
  isLike: boolean;
  totalLikes: number;
  onPressLike: () => void;
}

function BottomBar({
  productId,
  isLike,
  totalLikes,
  onPressLike,
}: BottomBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconButtonWrapper}>
        <IconButton
          icon={isLike ? icons.heartFill : icons.heartLight}
          color={isLike ? colors.RED : colors.SLATE_500}
          size={24}
          onPress={onPressLike}
        />
        <Text style={styles.countText}>{formatLikeNumber(totalLikes)}</Text>
      </View>
      <CustomButton
        label="후기 작성하기"
        containerStyle={{ flex: 1 }}
        onPress={() => {
          router.push(`/product/${productId}/review/write`);
        }}
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
