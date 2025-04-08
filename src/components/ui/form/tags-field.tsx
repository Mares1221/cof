import { InputBaseProps, TagsInput } from "@mantine/core";
import { useField } from ".";

interface TextInputProps extends InputBaseProps {
  name: string;
  onChange?: (values: string[]) => void;
  value?: string[];
  placeholder?: string;
}

export function TagsField({
  name,
  onChange: $onChange,
  value: $value = [],
  placeholder,
  ...rest
}: TextInputProps) {
  const { error, onChange } = useField(name);

  return (
    <TagsInput
      {...rest}
      placeholder={placeholder}
      error={error}
      defaultValue={$value}
      onChange={(values) => {
        $onChange && $onChange(values);
        onChange(values);
      }}
    />
  );
}
