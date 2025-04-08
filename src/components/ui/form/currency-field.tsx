import { NumberInput, NumberInputProps, Text } from "@mantine/core";
import { useField } from ".";
import { IconCurrencyTugrik } from "@tabler/icons-react";

interface NumberFieldProps extends NumberInputProps {
  name: string;
  onChange?: (e: number | string) => void;
  noError?: boolean;
}

export function CurrencyField({
  name,
  onChange: onChangeProps,
  noError,
  ...rest
}: NumberFieldProps) {
  const { value, error, onChange } = useField(name);

  return (
    <>
      <NumberInput
        {...rest}
        error={error}
        value={value}
        onChange={(value) => {
          onChange?.(value);
          onChangeProps?.(value);
        }}
        thousandSeparator=","
        rightSection={<IconCurrencyTugrik size={18} />}
        decimalScale={2}
      />
    </>
  );
}
