import { Select, SelectStylesNames } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useField } from ".";

type Props = {
  name: string;
  label?: string;
  placeholder: string;
  disabled?: boolean;
  onChange?: (value: string | null) => void;
  noError?: boolean;
  options: { value: string; label: string }[];
  clearable?: boolean;
  classNames?: Partial<Record<SelectStylesNames, string>> | undefined;
  defaultValue?: any;
  rightSection?: React.ReactNode;
  leftSection?: React.ReactNode;
  styles?: any;
  style?: any;
  required?: boolean;
  size?: any;
  w?: any;
  searchable?: boolean;
  readOnly?: boolean;
  value?: string;
};

export function SelectField({
  value: $value,
  name,
  label,
  placeholder,
  noError = false,
  onChange: onChangeValue,
  options = [],
  disabled = false,
  classNames,
  clearable = true,
  defaultValue,
  rightSection,
  leftSection,
  styles,
  style,
  size,
  w,
  searchable,
  ...rest
}: Props) {
  const { value, error, onChange } = useField(name);

  return (
    <Select
      {...rest}
      w={w}
      searchable={searchable}
      style={style}
      size={size}
      label={label}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={$value || value}
      disabled={disabled}
      radius="xl"
      variant="filled"
      onChange={(value) => {
        onChange(value || "");
        onChangeValue && onChangeValue(value || "");
      }}
      allowDeselect={false}
      checkIconPosition="right"
      leftSection={leftSection}
      rightSection={
        rightSection || (
          <IconChevronDown color="#DCDCE5" width={22} hanging={20} />
        )
      }
      error={error}
      clearable={clearable}
      data={options}
      classNames={classNames}
      styles={{
        error: {
          display: noError ? "none" : "block",
        },
        wrapper: {
          marginBottom: noError && error && 0,
        },
        ...styles,
      }}
    />
  );
}
