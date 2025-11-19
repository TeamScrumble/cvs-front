import { FontFamilyType } from "@/@types";
import { colors, fonts } from "@/constants";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface RoundButtonProps {
  title: string;
  height: number;
  fontFamily?: FontFamilyType;
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  onPress?: () => void;
}

function RoundButton({
  title,
  height,
  fontFamily = fonts.REGULAR,
  fontSize = 16,
  color = colors.SLATE_800,
  backgroundColor = colors.WHITE,
  onPress = () => {},
}: RoundButtonProps) {
  return (
    <Pressable
      style={[
        styles.buttonContainer,
        { backgroundColor, borderColor: colors.SLATE_200, height },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color, fontFamily, fontSize }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 100,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  text: {
    textAlign: "center",
  },
});

export default RoundButton;
