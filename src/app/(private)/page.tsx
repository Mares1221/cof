"use client";

import PageLayout from "@/components/layout/page-layout/page-layout";
import { Button, Group, Select, TextInput } from "@mantine/core";
import { IconReload, IconSearch } from "@tabler/icons-react";

export default function HomePage() {
  return (
    <PageLayout
      title="Хянах самбар"
      description="Нийт мэдээлэл"
      breadcrumb={[]}
    >
      <Group gap="xs">
        <TextInput
          w={250}
          placeholder="Хайх"
          maxLength={45}
          leftSection={<IconSearch size={18} />}
        />
        <Select placeholder="Агуулах" searchable withCheckIcon={false} />
        <Button variant="default" leftSection={<IconReload size={18} />}>
          Цэвэрлэх
        </Button>
      </Group>
      tun udahgui....
    </PageLayout>
  );
}
