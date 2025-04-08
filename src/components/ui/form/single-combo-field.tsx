"use client";

import { ComboboxItem, ComboboxProps, TextInputProps } from "@mantine/core";

import { useField } from ".";
import { SingleComboboxInput } from "./single-combobox-input";

interface SingleComboFieldProps
  extends Omit<TextInputProps, "onChange">,
    Omit<
      ComboboxProps,
      "classNames" | "styles" | "variant" | "vars" | "width" | "onChange"
    > {
  name: string;
  isFilter?: boolean;
  onChange?: (value: string) => void;
  loadData: (searchQuery?: string) => Promise<ComboboxItem[]>;
  defaultData?: ComboboxItem;
}

export function SingleComboField({
  name,
  defaultData,
  loadData,
  onChange: $onChnage,
  isFilter = false,
  ...rest
}: SingleComboFieldProps) {
  const { value, error, onChange } = useField(name);
  return (
    <>
      <SingleComboboxInput
        name={name}
        error={error}
        value={isFilter ? undefined : value}
        onChange={(value) => {
          $onChnage?.(value);
          onChange(value);
        }}
        defaultData={defaultData}
        loadData={loadData}
        {...rest}
      />
    </>
  );
}
