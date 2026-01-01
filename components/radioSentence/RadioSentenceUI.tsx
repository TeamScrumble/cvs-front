import {  View } from "react-native";
import { RadioOption } from "./RadioSentence";
import RadioSentenceItem from "./RadioSentenceItem";

type Props = {
  value?: string;
  error?: string;
  onChange: (v: string) => void;
  options: RadioOption[];
};

function RadioSentenceUI({ value, error = "", onChange, options }: Props) {
  return (
    <View>
      {options.map((opt) => (
        <RadioSentenceItem
          key={opt.value}
          label={opt.label}
          selected={value === opt.value}
          error={error}
          onPress={() => onChange(opt.value)}
        />
      ))}
    </View>
  );
}

export default RadioSentenceUI;
