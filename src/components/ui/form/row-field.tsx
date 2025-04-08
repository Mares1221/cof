import { Grid, Flex, Text, Space } from "@mantine/core";

type Props = {
  label: string;
  description?: string;
  direction?: "column" | "row";
  children: JSX.Element;
  width?: string;
};

export function RowField({
  label,
  direction = "row",
  description,
  children,
  width,
}: Props) {
  const renderLabel = (
    <Flex direction="column">
      <Text size="md" fw="500" c="dark">
        {label}
      </Text>
      <Text size="sm" c="gray" fw="400">
        {description}
      </Text>
    </Flex>
  );

  if (direction === "column") {
    return (
      <Flex direction="column">
        {renderLabel}
        <Space h={20} />
        {children}
      </Flex>
    );
  }

  return (
    <Grid w={width}>
      <Grid.Col span={{ base: 12, xl: 4 }}>{renderLabel}</Grid.Col>
      <Grid.Col span={{ base: 12, xl: 8 }}>{children}</Grid.Col>
    </Grid>
  );
}
