import { FontFamilyType } from "@/@types";
import { colors, fonts } from "@/constants";
import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

interface TextButtonProps extends PressableProps {
  label: string;
  fontSize?: number;
  fontFamily?: FontFamilyType;
  color?: string;
  pressableStyle?: StyleProp<ViewStyle>
  textStyle?: TextStyle;
}

function TextButton({
  label,
  fontSize = 16,
  fontFamily = fonts.REGULAR,
  color = colors.SLATE_800,
  pressableStyle,
  textStyle,
  ...props
}: TextButtonProps) {
  return (
    <Pressable
      style={pressableStyle}
      {...props}
    >
      <Text style={[{ color, fontFamily, fontSize }, textStyle]}>{label}</Text>
    </Pressable>
  );
}

export default TextButton;
