import { MultiSelect, MultiSelectProps } from "@mantine/core";
import { useField } from ".";

interface MultiSelectFieldProps extends MultiSelectProps {
  name: string;
  onChange?: (e: string[]) => void;
  label: string;
  options?: {
    value: string;
    label: string;
  }[];
}

export function MultiSelectField({
  name,
  label,
  onChange: $onChange,
  options,
  ...rest
}: MultiSelectFieldProps) {
  const { value, error, onChange } = useField(name, true);

  return (
    <MultiSelect
      label={label}
      value={value || []}
      onChange={(values) => {
        onChange(values);
        $onChange && $onChange(values);
      }}
      error={error}
      nothingFoundMessage={rest.nothingFoundMessage || "Сонголт байхгүй байна"}
      data={options}
    />
  );
}
