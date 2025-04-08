import {
  Combobox,
  Loader,
  Pill,
  PillsInput,
  PillsInputProps,
  useCombobox,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";

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
  const [searchValue, setSearchValue] = useState("");
  const [debounced] = useDebouncedValue(searchValue, 300);
  const [optionData, setOptionData] =
    useState<MultiComboboxInputOptionType[]>(data);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  useEffect(() => {
    const fetchData = async () => {
      if (focused && searchValue.trim() !== "") {
        setLoading(true);
        try {
          const res = await loadData?.(debounced);
          const filteredRes = res?.filter((item: any) =>
            item.label.toLowerCase().includes(searchValue.toLowerCase().trim()),
          );
          setOptionData(filteredRes || []);
        } catch (error) {
          console.error("Data loading error", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [debounced, focused, searchValue, loadData]);

  const filteredOptions = optionData?.filter((item: any) =>
    item.label.toLowerCase().includes(searchValue.toLowerCase().trim()),
  );

  const filteredData = data.filter((item) =>
    item.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const options =
    data?.length > 0
      ? filteredData
          ?.filter((item: any) => !value.includes(item.value))
          ?.map((item: any) => (
            <Combobox.Option value={item.value} key={item.value}>
              {item.label}
            </Combobox.Option>
          ))
      : filteredOptions
          ?.filter((item: any) => !value.includes(item.value))
          ?.map((item: any) => (
            <Combobox.Option value={item.value} key={item.value}>
              {item.label}
            </Combobox.Option>
          ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        if (!value.includes(optionValue)) {
          onChange?.([...value, optionValue]);
        }
        setSearchValue("");
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
          {searchValue.trim() === "" ? (
            <Combobox.Empty>Хайлт хийж бараа сонгоно уу</Combobox.Empty>
          ) : options.length === 0 ? (
            <Combobox.Empty>Хайлтанд тохирох мэдээлэл байхгүй</Combobox.Empty>
          ) : (
            options
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
