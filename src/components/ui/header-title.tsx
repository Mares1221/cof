"use client";

import { Divider, Flex, Text } from "@mantine/core";

function HeaderTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Flex gap={10} align="center" justify="flex-center" mb={20}>
      <Flex gap={10} align="center" justify="flex-center">
        asdas
        <Divider orientation="vertical" size="sm" />
        <Flex direction="column">
          <Text size="md" fw={600} c="black">
            {title}
          </Text>
          <Text size="xs" c="dimmed">
            {description}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default HeaderTitle;
