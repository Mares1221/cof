import { TimeInput, TimeInputProps } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { useField } from ".";

interface TimeFieldProps extends TimeInputProps {
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
}

export function TimeField({
  name,
  onChange: $onChnage,
  value: $value,
  placeholder,
  ...rest
}: TimeFieldProps) {
  const { value, error, onChange } = useField(name);

  return (
    <TimeInput
      {...rest}
      rightSection={<IconClock size={18} />}
      placeholder={placeholder}
      error={error}
      value={$value || value}
      onChange={(e) => {
        $onChnage && $onChnage(e);
        onChange(e.target.value);
      }}
    />
  );
}
