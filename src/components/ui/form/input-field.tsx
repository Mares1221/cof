import { Flex, Text } from "@mantine/core";

type Props = {
  label: string;
  children: JSX.Element;
  required?: boolean;
  areaLabel?: boolean;
};

export function InputField({ label, children, required, areaLabel }: Props) {
  return (
    <Flex justify="right" align={areaLabel ? "flex-start" : "center"} gap={10}>
      <Text size="sm" fw="500" c="#000" mt={areaLabel ? 4 : 0}>
        {label}
        {required && (
          <span
            className="m_78a94662 mantine-InputWrapper-required mantine-TextInput-required"
            aria-hidden="true"
          >
            {" "}
            *
          </span>
        )}
      </Text>
      {children}
    </Flex>
  );
}
