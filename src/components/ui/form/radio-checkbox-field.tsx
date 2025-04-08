import {
  Checkbox,
  CheckboxGroupProps,
  Group,
  Radio,
  RadioGroupProps,
} from "@mantine/core";
import { useField } from ".";

interface RadioCheckboxFieldProps extends CheckboxGroupProps {
  name: string;
  onChange?: (e: string[]) => void;
  label: string;
  options?: {
    value: string;
    label: string;
  }[];
  children: React.ReactNode | null;
}

export function RadioCheckboxField({
  label,
  name,
  onChange: $onChange,
  options,
  children, // custom children bicheegvi uydee null ogchih dra ni eniig saijruuly.
  ...rest
}: RadioCheckboxFieldProps) {
  const { value, error, onChange } = useField(name);

  return (
    <Checkbox.Group
      {...rest}
      defaultValue={[]}
      label={label}
      value={value}
      onChange={(e) => {
        onChange(e);
        $onChange?.(e);
      }}
    >
      {children || (
        <Group my="xs">
          {options?.map((item) => <Checkbox key={item.value} {...item} />)}
        </Group>
      )}
    </Checkbox.Group>
  );
}
