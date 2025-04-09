import { Flex, Group } from "@mantine/core";

type Props = {
  extra: { [key: string]: string | JSX.Element | false };
  onClick?: (key: string) => void;
};

export function RowAction({ extra, onClick }: Props) {
  return (
    <Group gap="xs" wrap="nowrap">
      {Object.keys(extra)
        .filter((key) => extra[key])
        .map((key) => (
          <Flex
            flex={1}
            key={key}
            w={"100%"}
            onClick={() => onClick && onClick(key)}
          >
            {extra[key]}
          </Flex>
        ))}
    </Group>
  );
}
