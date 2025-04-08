import React, { forwardRef, useImperativeHandle, useState } from "react";
import { InputWrapper, InputWrapperProps } from "@mantine/core";
import { MultiComboboxInput } from "./combo-input";

interface MultiComboFieldProps extends Omit<InputWrapperProps, "onChange"> {
  name: string;
  required?: boolean;
  onChange?: (value: string[]) => void;
  disabled?: boolean;
  placeholder?: string;
  data?: { value: string; label: string }[];
  loadData?: (
    searchQuery?: string,
  ) => Promise<{ value: string; label: string }[]>;
}

export interface MultiComboFieldRef {
  handleDelete: (id: string) => void;
}

export const MultiComboField = forwardRef<
  MultiComboFieldRef,
  MultiComboFieldProps
>(({ data, loadData, onChange, placeholder, ...rest }, ref) => {
  const [value, setValue] = useState<string[]>([]);

  useImperativeHandle(ref, () => ({
    handleDelete: (id: string) => {
      setValue(() => value.filter((v) => v !== id));
    },
  }));

  return (
    <InputWrapper {...rest}>
      <MultiComboboxInput
        value={value}
        onChange={(selectedValues) => {
          setValue(selectedValues);
          onChange?.(selectedValues);
        }}
        data={data}
        loadData={loadData}
        disabled={rest.disabled}
        placeholder={placeholder}
      />
    </InputWrapper>
  );
});
