"use client";

import { Popover, Text, UnstyledButton } from "@mantine/core";

export default function RowPopover({ text = "" }: { text: string }) {
  return (
    <Popover width={200} position="top" withArrow shadow="md">
      <Popover.Target>
        <UnstyledButton>
          <Text fz={"sm"} w={200} truncate>
            {text}
          </Text>
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">{text}</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
