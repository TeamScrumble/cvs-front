import { Controller, useFormContext } from "react-hook-form";
import TextAreaUI from "./TextAreaUI";

type Props = {
  name: string;
  placeholder?: string;
  rules?: {
    validate?: (data: string) => string | undefined;
  };
};

function TextArea({ name, placeholder, rules }: Props) {
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
        />
      )}
    />
  );
}

export default TextArea;
