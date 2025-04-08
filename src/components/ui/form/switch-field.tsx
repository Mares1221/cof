import { Switch, rem, Flex, Input, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useField } from ".";

type Props = {
  name: string;
  label?: any;
  onChangeCustom?: (e: any) => void;
  disabled?: boolean;
  w?: number;
  onLabel?: string;
  offLabel?: string;
};

export function SwitchField({
  name,
  label,
  onChangeCustom,
  disabled,
  w,
  onLabel,
  offLabel,
}: Props) {
  const { value, onChange } = useField(name);

  return (
    <Input.Wrapper h="100%" w={w}>
      <Flex gap={10} direction="column" h="100%">
        <Text fw={500} size="14px">
          {label}
        </Text>
        <Flex h="100%" align="center">
          <Switch
            w={w}
            disabled={disabled}
            value={value}
            checked={value}
            onChange={(e) => {
              onChangeCustom && onChangeCustom(e.currentTarget.checked);
              onChange(e.currentTarget.checked);
            }}
            color="teal"
            size="md"
            thumbIcon={
              value ? (
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  color="teal"
                  stroke={3}
                />
              ) : (
                <IconX
                  style={{ width: rem(12), height: rem(12) }}
                  color="red"
                  stroke={3}
                />
              )
            }
            onLabel={onLabel}
            offLabel={offLabel}
          />
        </Flex>
      </Flex>
    </Input.Wrapper>
  );
}
