import { colors, fonts } from "@/constants";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface Props extends TextInputProps {
  error?: string;
};

function TextAreaUI({ error = "", ...props }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        multiline
        textAlignVertical="top"
        placeholderTextColor={colors.SLATE_300}
        style={[
          styles.textInput,
          {
            borderColor: Boolean(error)
              ? colors.ERROR_BORDER
              : colors.SLATE_200,
          },
        ]}
        {...props}
      />
      <View style={styles.wrapper}>
        <Text style={[styles.text, styles.countText]}>
          {props.value?.length || 0}/500
        </Text>
        {Boolean(error) && (
          <Text style={[styles.text, styles.errorText]}>{error}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  wrapper: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 10,
    lineHeight: 10,
    fontFamily: fonts.REGULAR,
    color: colors.SLATE_400,
  },
  countText: {
    color: colors.SLATE_400,
  },
  errorText: {
    color: colors.ERROR_TEXT,
  },
  textInput: {
    height: 100,
    gap: 24,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 12,
    lineHeight: 12,
    fontFamily: fonts.REGULAR,
    color: colors.SLATE_800,
  },
});

export default TextAreaUI;
