"use client";

import { ContextModalProps } from "@mantine/modals";
import { Box, Button, Divider, Flex } from "@mantine/core";
import React from "react";

export default function ConfirmModal({
  context,
  id,
  innerProps,
}: ContextModalProps<{
  children: string | JSX.Element | React.ReactNode;
  onConfirm: (callback: (callback: () => void) => void) => Promise<void>;
}>) {
  const { children, onConfirm } = innerProps;
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <Flex direction="column" gap={10}>
      <Box>{children && children}</Box>
      <Divider size="xs" />
      <Flex direction="row" gap={10} justify="end">
        <Button
          variant="default"
          size="xs"
          onClick={() => context.closeModal(id)}
        >
          Үгүй
        </Button>
        <Button
          loading={loading}
          size="xs"
          onClick={async () => {
            setLoading(true);
            await onConfirm(() => {
              setLoading(false);
              context.closeModal(id);
            });
          }}
        >
          Тийм
        </Button>
      </Flex>
    </Flex>
  );
}
