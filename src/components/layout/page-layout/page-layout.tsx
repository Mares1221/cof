"use client";

import { Breadcrumbs, Flex, Text, useMantineTheme, Group } from "@mantine/core";
import Link from "next/link";

export default function PageLayout({
  title,
  extra,
  children,
  description,
  breadcrumb = [
    {
      label: "Дашбоард",
      href: "/",
    },
  ],
}: {
  title?: string;
  description?: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
  breadcrumb?: {
    label: string;
    href: string;
  }[];
}) {
  const theme = useMantineTheme();
  return (
    <Flex
      px="lg"
      py="md"
      gap={20}
      direction="column"
      style={{
        background: "#FFFFFF",
        minHeight: "100vh",
      }}
    >
      <Breadcrumbs separator={<Text size="xs">→</Text>}>
        {[
          {
            label: "Дашбоард",
            href: "/",
          },
          ...breadcrumb,
        ].map((item, index) => (
          <Link href={item.href} key={index} style={{ textDecoration: "none" }}>
            <Text size="xs" c={theme.colors.gray[8]}>
              {item.label}
            </Text>
          </Link>
        ))}
      </Breadcrumbs>
      {title && (
        <Flex justify="space-between">
          <Flex direction="column">
            <Text size="lg" fw="600">
              {title}
            </Text>
            <Text size="sm" c="#56565d" fw="500">
              {description}
            </Text>
          </Flex>
          <Group align="center" gap="xs">
            {extra}
          </Group>
        </Flex>
      )}
      {children}
    </Flex>
  );
}
