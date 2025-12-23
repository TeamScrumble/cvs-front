import { Controller, useFormContext } from "react-hook-form";
import RadioUI from "./RadioUI";

export type RadioOption = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  label: string;
  options: RadioOption[];
  rules?: {
    validate?: (data: string) => string | undefined;
  };
};

function Radio({ name, options, rules, label }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <RadioUI
          label={label}
          value={value}
          error={error?.message}
          onChange={onChange}
          options={options}
        />
      )}
    />
  );
}

export default Radio;
