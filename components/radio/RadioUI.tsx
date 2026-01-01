import { StyleSheet, Text, View } from "react-native";
import { RadioOption } from "./Radio";
import RadioItem from "./RadioItem";
import { colors, fonts } from "@/constants";

type Props = {
  label: string;
  value?: number;
  error?: string;
  onChange: (v: number) => void;
  options: RadioOption[];
};

function RadioUI({ label, value, error = "", onChange, options }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.wrapper}>
        {options.map((opt) => (
          <RadioItem
            key={opt.value}
            label={opt.label}
            selected={value === opt.value}
            error={error}
            onPress={() => onChange(opt.value)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  label: {
    fontFamily: fonts.BOLD,
    fontSize: 14,
    lineHeight: 14,
    color: colors.SLATE_800,
  },
  wrapper: {
    flexDirection: "row",
    gap: 8,
  },
});

export default RadioUI;
