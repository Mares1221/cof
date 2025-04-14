"use client";

import { Flex, Text } from "@mantine/core";

function HeaderTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Flex gap={10} align="center" justify="flex-center" mb={20} ml="xs">
      <Flex direction="column">
        <Text size="md" fw={600} c="black">
          {title}
        </Text>
        <Text size="xs" c="dimmed">
          {description}
        </Text>
      </Flex>
    </Flex>
  );
}

export default HeaderTitle;
