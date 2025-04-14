import { PasswordInput, PasswordInputProps } from "@mantine/core";
import { useField } from ".";

interface PasswordFieldProps extends PasswordInputProps {
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export function PasswordField({ name, label, ...rest }: PasswordFieldProps) {
  const { value, error, onChange } = useField(name);

  return (
    <PasswordInput
      {...rest}
      radius="xl"
      variant="filled"
      label={label}
      error={error}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
