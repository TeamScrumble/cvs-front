import { FontFamilyType } from "@/@types";
import { colors, fonts } from "@/constants";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface BorderButtonProps {
  title: string;
  height: number;
  fontFamily?: FontFamilyType;
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  onPress?: () => void;
}

function BorderButton({
  title,
  height,
  fontFamily = fonts.REGULAR,
  fontSize = 16,
  color = colors.SLATE_800,
  backgroundColor = colors.WHITE,
  onPress = () => {},
}: BorderButtonProps) {
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
    width: "100%",
  },
  text: {
    textAlign: "center",
  },
});

export default BorderButton;
