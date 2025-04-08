import { Checkbox, CheckboxProps, Group, Input } from "@mantine/core";
import { useField } from ".";

interface CheckboxFieldProps extends CheckboxProps {
  name: string;
  onChange?: (e: any) => void;
  fieldLabel?: string;
}

export function CheckboxField({
  name,
  label,
  onChange: $onChange,
  fieldLabel,
  ...rest
}: CheckboxFieldProps) {
  const { value, onChange } = useField(name);

  return (
    <Input.Wrapper label={label}>
      <Group h={36}>
        <Checkbox
          {...rest}
          checked={value}
          value={value}
          onChange={(e) => {
            onChange(e.currentTarget.checked);
            $onChange && $onChange(e.currentTarget.value);
          }}
          label={fieldLabel || "Тийм"}
        />
      </Group>
    </Input.Wrapper>
  );
}
