import {
  Combobox,
  Loader,
  Pill,
  PillsInput,
  PillsInputProps,
  useCombobox,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";

export type MultiComboboxInputOptionType = {
  value: string;
  label: string;
};

interface MultiComboboxInputProps extends Omit<PillsInputProps, "onChange"> {
  value?: string[];
  placeholder?: string;
  data?: MultiComboboxInputOptionType[];
  defaultData?: MultiComboboxInputOptionType[];
  loadData?: (
    searchQuery?: string,
  ) => Promise<MultiComboboxInputOptionType[] | []>;
  onChange?: (value: string[]) => void;
}

export function MultiComboboxInput({
  value = [],
  data = [],
  defaultData = [],
  label,
  required,
  loadData,
  placeholder,
  onChange,
  ...rest
}: MultiComboboxInputProps) {
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [prevData, setPrevData] = useState<MultiComboboxInputOptionType[]>(
    defaultData || [],
  );
  const [searchValue, setSearchValue] = useState("");
  const [debounced] = useDebouncedValue(searchValue, 300);
  const [optionData, setOptionData] =
    useState<MultiComboboxInputOptionType[]>(data);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  useEffect(() => {
    if (focused) {
      setLoading(true);
      data?.length === 0 &&
        loadData?.(debounced).then((res) => {
          setOptionData(res);
          setLoading(false);
        });
    }
  }, [debounced, focused, searchValue]);

  const handleChange = useCallback(
    (newValues: string[]) => {
      onChange?.(newValues);
    },
    [onChange],
  );

  useEffect(() => {
    if (defaultData) {
      const defaultValues = defaultData.map((item) => item.value);

      if (!value.some((val) => defaultValues.includes(val))) {
        handleChange([...value, ...defaultValues]);
      }
    }
  }, [defaultData, value, handleChange]);

  const shouldFilterOptions = !data.some((item) => item.value === searchValue);
  const filteredOptions = shouldFilterOptions
    ? optionData.filter((item) =>
        item.label.toLowerCase().includes(searchValue.toLowerCase().trim()),
      )
    : data;
  const options = filteredOptions
    .filter((item) => !value.includes(item.value))
    .map((item) => (
      <Combobox.Option value={item.value} key={item.value}>
        {item.label}
      </Combobox.Option>
    ));

  return (
    <Combobox
      onOptionSubmit={(optionValue, selectedOption) => {
        onChange?.([...value, optionValue]);
        setPrevData((prev) => [
          ...prev,
          {
            label: `${selectedOption?.children}`,
            value: selectedOption?.value,
          },
        ]);
        // setSearchValue("");
        // combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <PillsInput
          {...rest}
          required={required}
          label={label}
          rightSection={loading && loadData && <Loader size={18} />}
        >
          <Pill.Group>
            {(value || []).map((item) => (
              <Pill
                key={item}
                withRemoveButton
                onRemove={() => {
                  onChange?.(value.filter((v) => v !== item));
                }}
              >
                {
                  [optionData, prevData, defaultData]
                    .flat()
                    .find((dataItem) => dataItem.value === item)?.label
                }
              </Pill>
            ))}
            <PillsInput.Field
              value={searchValue}
              placeholder={placeholder}
              onChange={(e) => {
                setSearchValue(e.currentTarget.value);
                combobox.openDropdown();
              }}
              onClick={() => combobox.openDropdown()}
              onFocus={() => {
                setFocused(true);
                combobox.openDropdown();
              }}
              onBlur={() => {
                combobox.closeDropdown();
                setFocused(false);
              }}
            />
          </Pill.Group>
        </PillsInput>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length === 0 ? (
            <Combobox.Empty>Мэдээлэл байхгүй</Combobox.Empty>
          ) : (
            options
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
