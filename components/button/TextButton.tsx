import { FontFamilyType } from "@/@types";
import { colors, fonts } from "@/constants";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface TextButtonProps {
  title: string;
  fontSize?: number;
  fontFamily?: FontFamilyType;
  color?: string;
  paddingHorizontal?: number;
  onPress?: () => void;
}

function TextButton({
  title,
  fontSize = 16,
  fontFamily = fonts.REGULAR,
  color = colors.SLATE_800,
  paddingHorizontal = 0,
  onPress = () => {},
}: TextButtonProps) {
  return (
    <Pressable
      style={[styles.textContainer, { paddingHorizontal }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color, fontFamily, fontSize }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    paddingVertical: 10,
  },
  text: {},
});

export default TextButton;
