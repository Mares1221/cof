import { Group, Radio, RadioGroupProps } from "@mantine/core";
import { useField } from ".";

interface RadioFieldProps extends RadioGroupProps {
  name: string;
  onChange?: (e: string) => void;
  label: string;
  options?: {
    value: string;
    label: string;
  }[];
  children: React.ReactNode | null;
}

export function RadioField({
  label,
  name,
  onChange: $onChange,
  options,
  children, // custom children bicheegvi uydee null ogchih dra ni eniig saijruuly.
  ...rest
}: RadioFieldProps) {
  const { value, error, onChange } = useField(name);

  return (
    <Radio.Group
      {...rest}
      label={label}
      value={value}
      onChange={(e) => {
        onChange(e);
        $onChange?.(e);
      }}
      error={error}
    >
      {children || (
        <Group my="xs">
          {options?.map((item) => <Radio key={item.value} {...item} />)}
        </Group>
      )}
    </Radio.Group>
  );
}
