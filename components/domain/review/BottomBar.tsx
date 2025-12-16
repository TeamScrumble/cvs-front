import IconButton from "@/components/button/IconButton";
import TextButton from "@/components/button/TextButton";
import { colors, fonts, icons } from "@/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BottomBarProps {
  isLike: boolean;
  totalLikes: number;
  onPressLike: () => void;
}

function BottomBar({ isLike, totalLikes, onPressLike }: BottomBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconButtonWrapper}>
        <IconButton
          icon={isLike ? icons.heartFill : icons.heartLight}
          color={isLike ? colors.RED : colors.SLATE_500}
          size={24}
          onPress={onPressLike}
        />
        <Text style={styles.countText}>{totalLikes}</Text>
      </View>
      <TextButton
        label="후기 작성하기"
        pressableStyle={styles.buttonContainer}
        textStyle={styles.buttonText}
        onPress={() => {
          /* 후기 작성하기 화면으로 이동 */
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
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.MAIN,
  },
  buttonText: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 14,
    color: colors.WHITE,
  },
});

export default BottomBar;
