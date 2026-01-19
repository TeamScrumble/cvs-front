import { colors, fonts, icons } from "@/constants";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-iconify";

interface LikeButtonProps {
  likeCount: number;
  clicked?: boolean;
  onPress: () => void;
}

function LikeButton({ likeCount, clicked = false, onPress }: LikeButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderColor: clicked ? colors.SLATE_500 : colors.SLATE_200 },
      ]}
      onPress={onPress}
    >
      <Icon
        icon={clicked ? icons.thumbsUpFill : icons.thumbsUp}
        size={14}
        color={colors.SLATE_800}
      />
      <Text style={[styles.text, styles.labelText]}>도움돼요</Text>
      <Text style={[styles.text, styles.countText]}>{likeCount}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 102,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingLeft: 10,
    paddingRight: 18,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 4,
  },
  text: {
    fontSize: 12,
    lineHeight: 12,
    color: colors.SLATE_800,
  },
  labelText: {
    fontFamily: fonts.REGULAR,
    letterSpacing: 0,
  },
  countText: {
    fontFamily: fonts.BOLD,
    letterSpacing: -0.24,
  },
});

export default LikeButton;
