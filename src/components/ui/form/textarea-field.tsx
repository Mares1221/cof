import { Textarea, TextareaProps } from "@mantine/core";
import { useField } from ".";

interface TextareaFieldProps extends TextareaProps {
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextareaField({
  name,
  onChange: onChangeProps,
  ...rest
}: TextareaFieldProps) {
  const { value, error, onChange } = useField(name);

  return (
    <Textarea
      {...rest}
      error={error}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        onChangeProps?.(e);
      }}
    />
  );
}
