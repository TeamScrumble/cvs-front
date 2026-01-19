import { Controller, useFormContext } from "react-hook-form";
import RadioSentenceUI from "./RadioSentenceUI";

export type RadioOption = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  options: RadioOption[];
  rules?: {
    validate?: (data: string) => string | undefined;
  };
};

function RadioSentence({ name, options, rules }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <RadioSentenceUI
          value={value}
          error={error?.message}
          onChange={onChange}
          options={options}
        />
      )}
    />
  );
}

export default RadioSentence;
