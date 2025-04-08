import { ActionIcon, Flex, Menu, Stack } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";

type Props = {
  extra: { [key: string]: string | JSX.Element | false };
  onClick?: (key: string) => void;
};

export function RowMenu({ extra, onClick }: Props) {
  return (
    <Menu
      shadow="md"
      width={200}
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
        <Stack gap={5}>
          {Object.keys(extra)
            .filter((key) => extra[key])
            .map((key, index) => (
              <Flex key={index} onClick={() => onClick && onClick(key)}>
                {extra[key]}
              </Flex>
            ))}
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
}
