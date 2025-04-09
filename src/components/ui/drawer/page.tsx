import { Divider, Drawer, Flex, Stack, Text } from "@mantine/core";

type Props = {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | string;
  opened: boolean;
  children: React.ReactNode;
  title: string;
  onClose: () => void;
  description?: string;
  extra?: React.ReactNode[];
  padding?: number | string;
  closeOnClickOutside?: boolean;
  withCloseButton?: boolean;
};

export default function CoreDrawer({
  size = "50rem",
  title,
  extra,
  opened,
  onClose,
  children,
  description,
  padding = "md",
  closeOnClickOutside = false,
  withCloseButton = false,
}: Props) {
  return (
    <Drawer
      size={size}
      title={false}
      opened={opened}
      position="right"
      onClose={onClose}
      withCloseButton={withCloseButton}
      closeOnClickOutside={closeOnClickOutside}
      padding={padding}
    >
      <Stack gap="md">
        <Flex justify="space-between" align="center">
          <Flex direction="column">
            <Text size="lg" fw={600}>
              {title}
            </Text>
            {description && (
              <Text size="sm" c="dimmed" fw={500}>
                {description}
              </Text>
            )}
          </Flex>
          {extra && (
            <Flex align="center" gap="sm">
              {extra}
            </Flex>
          )}
        </Flex>
        {children}
      </Stack>
    </Drawer>
  );
}
