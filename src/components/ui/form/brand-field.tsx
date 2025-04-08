import useSWR from "swr";
import React from "react";
import Image from "next/image";
import { Group, Select, SelectProps, ThemeIcon, rem } from "@mantine/core";
import { IconCheck, IconPhoto } from "@tabler/icons-react";
// import { brandApi } from "@/apis";
import { useField } from "@/components/ui/form";

type Props = {
  name: string;
  w?: string;
  $onChange?: (value: any) => void;
  required?: boolean;
};

export function BrandField({ name, w, $onChange, required }: Props) {
  const { value, error, onChange } = useField(name);
  // const { data: brands } = useSWR("swr.brands", () => brandApi.select(), {
  //   revalidateOnFocus: false,
  // });

  const getBrandLogo = (id: string) => {
    // const category = brands?.find(c => c._id === id);
    // return category?.image && `${category?.image?.url}`.startsWith("http") ? (
    //   <Image src={category.image?.url || ""} width={20} height={20} alt="" />
    // ) : (
    //   <ThemeIcon variant="transparent" radius="xl" style={{ width: rem(24), height: rem(24) }}>
    //     <IconPhoto />
    //   </ThemeIcon>
    // );
  };

  const renderSelectOption: SelectProps["renderOption"] = ({
    option,
    checked,
  }) => {
    const optionIcon = getBrandLogo(option.value);

    return (
      <Group flex="1" gap="xs" wrap="nowrap">
        {/* {optionIcon} */}
        {option.label}
        {checked && (
          <IconCheck
            style={{ marginInlineStart: "auto" }}
            {...{
              stroke: 1.5,
              color: "currentColor",
              opacity: 0.6,
              size: 18,
            }}
          />
        )}
      </Group>
    );
  };

  return (
    <Select
      w={w}
      placeholder="Бренд сонгох"
      renderOption={renderSelectOption}
      error={error}
      value={value}
      // data={(brands || []).map((brand) => ({
      //   label: brand.name || "No brand",
      //   value: brand._id,
      // }))}
      // allowDeselect
      // leftSectionPointerEvents="none"
      // leftSection={getBrandLogo(value)}
      checkIconPosition="right"
      onChange={(value) => {
        onChange(value);
        $onChange && $onChange(value);
      }}
      required={required}
    />
  );
}
