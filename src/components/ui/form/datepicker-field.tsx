import { DateInput, DateInputProps } from "@mantine/dates";
import { IconCalendarClock } from "@tabler/icons-react";
import { useField } from ".";

interface DateFieldProps extends DateInputProps {
  name: string;
  onChange?: (e: any) => void;
  noError?: boolean;
  placeholder?: string;
}

export function DatePickerField({
  name,
  onChange: $onChange,
  placeholder,
  ...rest
}: DateFieldProps) {
  const { value, error, onChange } = useField(name);

  return (
    <>
      <DateInput
        {...rest}
        placeholder={placeholder || "Огноо сонгох"}
        locale="mn"
        valueFormat="MM-DD-YYYY"
        error={error}
        clearable={false}
        rightSection={<IconCalendarClock color="gray" size={18} />}
        value={value ? new Date(value) : null}
        onChange={(e: any) => {
          onChange(new Date(e).toISOString());
          $onChange && onChange(new Date(e).toISOString());
        }}
      />
    </>
  );
}
