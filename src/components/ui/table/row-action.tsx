import { ActionIcon, Flex, Menu, Stack, UnstyledButton } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";

type Props = {
  extra: { [key: string]: string | JSX.Element | false };
  onClick?: (key: string) => void;
};

export function RowAction({ extra, onClick }: Props) {
  return (
    <Menu
      shadow="md"
      trigger="hover"
      openDelay={300}
      closeDelay={300}
      position="bottom-start"
      transitionProps={{ transition: "rotate-right", duration: 100 }}
    >
      <Menu.Target>
        <ActionIcon variant="light" color="gray">
          <IconDotsVertical size={20} color="black" />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Stack gap={5} w={"100%"}>
          {Object.keys(extra)
            .filter((key) => extra[key])
            .map((key) => (
              <Flex
                flex={1}
                key={key}
                onClick={() => onClick && onClick(key)}
                w={"100%"}
              >
                {extra[key]}
              </Flex>
            ))}
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
}
