import React from "react";

import { Box, InputWrapper, InputWrapperProps } from "@mantine/core";

import { useField } from ".";
import {
  MultiComboboxInput,
  MultiComboboxInputOptionType,
} from "../upload/multi-combobox-input";

interface MultiComboFieldProps extends Omit<InputWrapperProps, "onChange"> {
  name: string;
  required?: boolean;
  onChange?: (value: string[]) => void;
  disabled?: boolean;
  placeholder?: string;
  data?: MultiComboboxInputOptionType[];
  loadData?: (
    searchQuery?: string,
  ) => Promise<MultiComboboxInputOptionType[] | []>;
  defaultData?: MultiComboboxInputOptionType[];
}

export function MultiComboField({
  name,
  data,
  defaultData,
  loadData,
  required = false,
  onChange: $onChnage,
  onChange: onChangeValue,
  disabled,
  placeholder,
  ...rest
}: MultiComboFieldProps) {
  const { value, error, onChange } = useField(name);

  return (
    <InputWrapper required={required} {...rest}>
      <Box>
        <MultiComboboxInput
          error={error}
          value={value}
          onChange={(values) => {
            onChange(values);
            onChangeValue && onChangeValue(values);
          }}
          data={data}
          defaultData={defaultData}
          loadData={loadData}
          disabled={disabled}
          placeholder={placeholder}
        />
      </Box>
    </InputWrapper>
  );
}
