"use client";

import PageContent from "@/components/layout/page-content/page";
import PageLayout from "@/components/layout/page-layout/page-layout";
import DualAxesChart from "@/components/ui/chart/dual-axes-chart";
import LineChart from "@/components/ui/chart/line-chart";
import PieChart from "@/components/ui/chart/pie-chart";
import { Button, Grid, Group, Select, TextInput } from "@mantine/core";
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
      <Grid>
        <Grid.Col span={6}>
          <PageContent
            withBorder
            title="Төлбөр төлөлтийн хувь"
            description="Нийт оршин суугчдын төлбөр төлөтийн хүвь үзүүлэлэт"
          >
            <PieChart />
          </PageContent>
        </Grid.Col>
        <Grid.Col span={6}>
          <PageContent
            withBorder
            title="Санал хүсэлт гомдол"
            description="Нийт оршин суугчдын санал хүсэлт шийдвэрлэлт"
          >
            <DualAxesChart />
          </PageContent>
        </Grid.Col>
        <Grid.Col span={6}>
          <PageContent
            withBorder
            title="Апп суулгасан оршин суугчдын тоо"
            description="Нийт оршин суугчдын апп суулгасан оршин суугчдын тоо"
          >
            <LineChart />
          </PageContent>
        </Grid.Col>
      </Grid>
    </PageLayout>
  );
}
