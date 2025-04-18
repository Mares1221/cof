"use client";

import { buildingApi } from "@/apis";
import PageLayout from "@/components/layout/page-layout/page-layout";
import { ActionButton } from "@/components/ui/action-button/page";
import {
  ColumnType,
  ITableRef,
  RowAction,
  Table,
} from "@/components/ui/table/table";
import { IBuilding } from "@/interfaces/building";
import { Building } from "@/models/building";
import { errorParse } from "@/utils/errorParse";
import { message } from "@/utils/message";
import { formatDate } from "@/utils/time-age";
import { Avatar, Badge, Button, Drawer, TextInput, Text } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { openContextModal } from "@mantine/modals";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useRef, useState } from "react";
import BuildingForm from "./form";

const initialFilters: {
  query: string | null;
} = {
  query: null,
};

export default function BuildingPage() {
  const [action, setAction] = useState<[boolean, IBuilding | null]>([
    false,
    null,
  ]);
  const [filters, setFilters] = useState(initialFilters);
  const [debounced] = useDebouncedValue(filters.query, 300);
  const tableRef = useRef<ITableRef>(null);
  const columns = useHeader({
    onClick: (key: any, record: any) => {
      switch (key) {
        case "edit":
          setAction([true, record]);
          break;
        case "delete":
          openContextModal({
            modal: "confirm",
            title: "Орон сууц устгах",
            innerProps: {
              children: "Та устгах үйлдэлийг хийхдээ итгэлтэй байна уу",
              onConfirm: async (close: () => void) => {
                try {
                  await buildingApi.remove(record._id);
                  message.success("Хүсэлт амжиллтай");
                  close();
                  tableRef.current?.reload();
                } catch (error) {
                  errorParse(error);
                  close();
                }
              },
            },
          });
          break;
      }
    },
  });

  return (
    <PageLayout
      title="Байр"
      description="Байрны жагсаалт"
      breadcrumb={[
        {
          label: "Байр",
          href: "/building",
        },
      ]}
      extra={
        <Button
          leftSection={<IconPlus size={18} />}
          onClick={() => setAction([true, null])}
        >
          Нэмэх
        </Button>
      }
    >
      <TextInput
        w={250}
        placeholder="Хайх"
        value={filters?.query || ""}
        leftSection={<IconSearch size={18} />}
        onChange={(e) =>
          setFilters({ ...filters, query: e.currentTarget.value })
        }
      />
      <Table
        limit={15}
        ref={tableRef}
        columns={columns}
        name="swr.building.list"
        loadData={buildingApi.list}
        filters={{
          ...filters,
          query: debounced,
        }}
      />
      <Drawer
        opened={action[0]}
        onClose={() => setAction([false, null])}
        title={
          <Text size="md" fw={600}>
            {action[1] ? "Байрны бүртгэл засах" : "Байрны бүртгэл"}
          </Text>
        }
      >
        <BuildingForm
          payload={action[1] || undefined}
          onSuccuss={() => {
            setAction([false, null]), tableRef.current?.reload();
          }}
        />
      </Drawer>
    </PageLayout>
  );
}

const useHeader = ({
  onClick,
}: {
  onClick: (key: string, record: IBuilding) => void;
}): ColumnType<Building>[] => [
  {
    title: "#",
    width: "1px",
    render: (_, index) => index + 1,
  },
  {
    title: "Үйлдэл",
    align: "left",
    width: "1px",
    render: (record) => (
      <RowAction
        onClick={(key) => onClick(key, record)}
        extra={{
          edit: <ActionButton>Засах</ActionButton>,
          delete: <ActionButton>Устгах</ActionButton>,
        }}
      />
    ),
  },
  {
    title: "Нэр",
    align: "left",
    width: "1px",
    render: (record) => record?.name || "-",
  },
  {
    title: "Зураг",
    align: "left",
    width: "1px",
    render: (record) => <Avatar src={record?.image} />,
  },
  {
    title: "Идэвхтэй эсэх",
    align: "left",
    width: "1px",
    render: (record) => (
      <Badge variant="dot" color={record?.isActive ? "green" : "red"}>
        {record?.isActive ? "Идэвхтэй" : "Идэвхгүй"}
      </Badge>
    ),
  },
  {
    title: "Огноо",
    align: "left",
    width: "1px",
    render: (record) => formatDate(record?.createdAt) || "-",
  },
];
