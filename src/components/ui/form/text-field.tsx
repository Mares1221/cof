import { TextInput, TextInputProps } from "@mantine/core";
import { useField } from ".";

interface TextFieldProps extends TextInputProps {
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextField({
  name,
  onChange: $onChnage,
  ...rest
}: TextFieldProps) {
  const { value, error, onChange } = useField(name);

  return (
    <TextInput
      {...rest}
      error={error}
      value={value}
      onChange={(e) => {
        $onChnage && $onChnage(e);
        onChange(e.target.value);
      }}
    />
  );
}
