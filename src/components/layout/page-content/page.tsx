"use client";

import { Group, Paper, Stack, Text } from "@mantine/core";

export default function PageContent({
  title,
  description,
  children,
  extra,
  h,
  withBorder = false,
}: {
  title?: any;
  description?: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
  h?: any;
  withBorder?: boolean;
}) {
  return (
    <Paper px="md" w="100%" h={h} withBorder={withBorder}>
      <Stack justify="space-between">
        <Stack mt="sm" gap={0}>
          <Text size="lg" fw="600" c="dark">
            {title}
          </Text>
          <Text size="sm" c="gray" fw="500">
            {description}
          </Text>
        </Stack>
        <Group align="center">{extra}</Group>
      </Stack>
      <div>{children}</div>
    </Paper>
  );
}
