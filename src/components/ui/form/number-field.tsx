import { NumberInput, NumberInputProps } from "@mantine/core";
import { useField } from ".";

interface NumberFieldProps extends NumberInputProps {
  name: string;
  onChange?: (e: number | string) => void;
  noError?: boolean;
}

export function NumberField({
  name,
  onChange: onChangeProps,
  noError,
  ...rest
}: NumberFieldProps) {
  const { value, error, onChange } = useField(name);

  return (
    <NumberInput
      {...rest}
      hideControls
      error={error}
      value={value}
      onChange={(value) => {
        onChange?.(value);
        onChangeProps?.(value);
      }}
    />
  );
}
