import { Divider, Flex, Modal, Text } from "@mantine/core";
import React from "react";

type Props = {
  extra?: React.ReactNode;
  title?: string;
  opened: any;
  onClose: any;
  children?: any;
};

export default function CoreModal({
  title,
  extra,
  opened,
  onClose,
  children,
}: Props) {
  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      size="70%"
      withCloseButton={false}
    >
      <Flex justify="space-between">
        <Text size="lg" fw="600">
          {title}
        </Text>
        <Flex gap={15}>{extra}</Flex>
      </Flex>
      <Divider my="10px" />
      {children}
    </Modal>
  );
}
