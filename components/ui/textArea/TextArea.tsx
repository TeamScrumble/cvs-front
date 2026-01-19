import { Controller, useFormContext } from "react-hook-form";
import TextAreaUI from "./TextAreaUI";
import { TextInputProps } from "react-native";

interface Props extends TextInputProps {
  name: string;
  placeholder?: string;
  rules?: {
    validate?: (data: string) => string | undefined;
  };
};

function TextArea({ name, placeholder, rules, ...props }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextAreaUI
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          error={error?.message}
          {...props}
        />
      )}
    />
  );
}

export default TextArea;
