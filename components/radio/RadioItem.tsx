import { colors, fonts } from "@/constants";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  label: string;
  selected: boolean;
  error?: string;
  onPress: () => void;
};

function RadioItem({ label, selected, error = "", onPress }: Props) {
  return (
    <Pressable
      style={[
        {
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 100,
          boxSizing: "border-box",
          borderWidth: 1,
        },
        Boolean(error)
          ? styles.dangerContainer
          : selected
          ? styles.selectedOptionContainer
          : styles.optionContainer,
      ]}
      key={`RadioOption_${label}`}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          Boolean(error) ? styles.dangerText : selected ? styles.selectedText : {},
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    borderColor: colors.SLATE_200,
  },
  selectedOptionContainer: {
    backgroundColor: `${colors.MAIN}0D`,
    borderColor: colors.MAIN,
  },
  dangerContainer: {
    backgroundColor: colors.ERROR_BG,
    borderColor: colors.ERROR_BORDER,
  },
  text: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    lineHeight: 12,
  },
  selectedText: {
    color: colors.MAIN,
  },
  dangerText: {
    color: colors.ERROR_TEXT,
  },
});

export default RadioItem;
