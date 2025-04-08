import { Flex, Text } from "@mantine/core";
import MapBox from "../map/page";
import { useField } from ".";

type Props = {
  label: string;
  name: string;
  required?: boolean;
};

export function MapBoxField({ label, name, required }: Props) {
  const { value, error, onChange } = useField(name);

  return (
    <Flex justify="right" align={"center"} gap={10}>
      <Text size="sm" fw="500" c="#000">
        {label}
        {required && (
          <span
            className="m_78a94662 mantine-InputWrapper-required mantine-TextInput-required"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </Text>
      <MapBox />
    </Flex>
  );
}
