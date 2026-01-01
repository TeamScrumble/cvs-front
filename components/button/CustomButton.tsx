import { ColorType, FontFamilyType } from "@/@types";
import { colors, fonts } from "@/constants";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

type Props = PressableProps & {
  label: string;
  variant?: "filled" | "border" | "standard" | "underline";
  fontFamily?: FontFamilyType;
  fontSize?: number;
  lineHeight?: number;
  letterSpacing?: number;
  color?: ColorType;
  bgColor?: ColorType;
  bdColor?: ColorType;
  containerStyle?: StyleProp<ViewStyle>;
};

const CustomButton = ({
  label,
  variant = "filled",
  fontSize = 14,
  lineHeight = 1,
  fontFamily = fonts.SEMI_BOLD,
  letterSpacing,
  color,
  bgColor,
  bdColor,
  containerStyle,
  ...props
}: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[variant],
        props.disabled && styles.disabled,
        pressed && styles.pressed,
        bgColor && { backgroundColor: bgColor },
        bdColor && { borderColor: bdColor },
        containerStyle,
      ]}
      {...props}
    >
      <Text
        style={[
          styles[`${variant}Text`],
          { fontSize, lineHeight: fontSize * lineHeight },
          letterSpacing !== undefined && { letterSpacing },
          fontFamily && { fontFamily },
          color && { color },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
  },
  filled: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.MAIN,
  },
  border: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.WHITE,
    borderWidth: 1.5,
    borderColor: colors.MAIN,
  },
  standard: {},
  underline: {},
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    backgroundColor: colors.SLATE_300,
  },
  filledText: {
    color: colors.WHITE,
  },
  borderText: {
    color: colors.MAIN,
  },
  standardText: {
    color: colors.SLATE_800,
  },
  underlineText: {
    color: colors.SLATE_500,
    textDecorationLine: "underline",
  },
});

export default CustomButton;
