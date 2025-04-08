"use client";

import {
  ActionIcon,
  Combobox,
  ComboboxItem,
  ComboboxProps,
  Loader,
  Pill,
  PillsInput,
  Stack,
  Text,
  TextInputProps,
  useCombobox,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSelector, IconX } from "@tabler/icons-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import useSWR from "swr";

interface SingleComboboxInputProps
  extends Omit<TextInputProps, "onChange">,
    Omit<
      ComboboxProps,
      "classNames" | "styles" | "variant" | "vars" | "width" | "onChange"
    > {
  onChange: (value: string) => void;
  loadData: (searchQuery?: string) => Promise<ComboboxItem[]>;
  name: string;
  defaultData?: ComboboxItem | null;
}

interface SingleComboboxInputRef {
  clear: () => void;
}

const options = (
  options: ComboboxItem[],
  searchValue: string,
  value: string | number | readonly string[] | undefined,
) => {
  const shouldFilterOptions = !options.some(
    (item) => item.label === searchValue,
  );
  const filteredOptions = shouldFilterOptions
    ? options.filter((item) =>
        item.label.toLowerCase().includes(searchValue.toLowerCase().trim()),
      )
    : options;
  return filteredOptions.map((item) => (
    <Combobox.Option
      value={item.value}
      key={item.value}
      disabled={item.disabled}
      selected={item.value === value}
    >
      {item.label}
    </Combobox.Option>
  ));
};

export const SingleComboboxInput = forwardRef<
  SingleComboboxInputRef,
  SingleComboboxInputProps
>(
  (
    {
      value,
      defaultData = null,
      loadData,
      placeholder = "Хайх ...",
      onChange,
      name,
      ...rest
    }: SingleComboboxInputProps,
    ref,
  ) => {
    const [selectedOption, setSelectedOption] = useState<ComboboxItem | null>(
      defaultData,
    );
    const [optionFallback, setOptionfallback] = useState<ComboboxItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearchValue] = useDebouncedValue(searchValue, 300);

    const combobox = useCombobox();

    const { data: optionData } = useSWR(
      `single-combobox-input2.${name}.${debouncedSearchValue}`,
      async () => {
        setLoading(true);
        try {
          const res = await loadData(debouncedSearchValue);
          setOptionfallback(res);
          return res;
        } catch (error) {
          return [];
        } finally {
          setLoading(false);
        }
      },
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        fallbackData: optionFallback,
      },
    );

    useImperativeHandle(ref, () => ({
      clear: onClearQuery,
    }));

    const onClearQuery = () => {
      onChange?.("");
      setSelectedOption(null);
    };

    return (
      <Combobox
        onOptionSubmit={(optionValue) => {
          onChange?.(optionValue);
          const selected = optionData.find(
            (item) => item.value === optionValue,
          );
          setSelectedOption(selected || null);
          combobox.closeDropdown();
          setSearchValue("");
        }}
        store={combobox}
      >
        <Combobox.Target>
          <PillsInput
            {...rest}
            rightSection={
              loading ? (
                <Loader size={18} />
              ) : value ? (
                <ActionIcon
                  variant="white"
                  color="black"
                  onClick={onClearQuery}
                >
                  <IconX size={18} />
                </ActionIcon>
              ) : (
                <IconSelector size={18} />
              )
            }
          >
            <Pill.Group>
              {selectedOption && (
                <Stack justify="center" align="center">
                  <Text size="sm" mt={2}>
                    {selectedOption.label || "-"}
                  </Text>
                </Stack>
              )}
              {!selectedOption && (
                <PillsInput.Field
                  value={searchValue}
                  placeholder={selectedOption ? undefined : placeholder}
                  onChange={(e) => {
                    setSearchValue(e.currentTarget.value);
                    combobox.openDropdown();
                  }}
                  onClick={() => combobox.openDropdown()}
                  onFocus={() => {
                    combobox.openDropdown();
                  }}
                  onBlur={() => {
                    combobox.closeDropdown();
                  }}
                />
              )}
            </Pill.Group>
          </PillsInput>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            {options.length === 0 ? (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            ) : (
              options(optionData, searchValue, value)
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    );
  },
);
