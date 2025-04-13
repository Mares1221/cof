"use client";

import { buildingApi } from "@/apis";
import PageLayout from "@/components/layout/page-layout/page-layout";
import { ActionButton } from "@/components/ui/action-button/page";
import CoreDrawer from "@/components/ui/drawer/page";
import { IFormRef } from "@/components/ui/form";
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
import { Button, Group, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { openContextModal } from "@mantine/modals";
import {
  IconDownload,
  IconPlus,
  IconReload,
  IconSearch,
} from "@tabler/icons-react";
import { useRef, useState } from "react";
import BuildingForm from "./form";

const initialFilters: {
  query: string | null;
  complex: string | null;
} = {
  complex: "",
  query: null,
};

export default function BuildingPage() {
  const [action, setAction] = useState<[boolean, IBuilding | null]>([
    false,
    null,
  ]);
  const [filters, setFilters] = useState(initialFilters);
  const [debounced] = useDebouncedValue(filters.query, 300);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef<ITableRef>(null);
  const formRef = useRef<IFormRef>(null);
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

  const comboRef = useRef<{ clear: () => void }>(null);

  const handleClear = () => {
    setFilters(initialFilters);
    if (comboRef.current) {
      comboRef.current.clear();
    }
  };

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
      extra={[
        <Button leftSection={<IconDownload size={18} />} variant="default">
          Excel болгон татах
        </Button>,
        <Button
          leftSection={<IconPlus size={18} />}
          onClick={() => setAction([true, null])}
        >
          Нэмэх
        </Button>,
      ]}
    >
      <Group gap="xs">
        <TextInput
          w={250}
          placeholder="Хайх"
          value={filters?.query || ""}
          leftSection={<IconSearch size={18} />}
          onChange={(e) =>
            setFilters({ ...filters, query: e.currentTarget.value })
          }
        />
        <Button
          variant="default"
          leftSection={<IconReload size={18} />}
          onClick={handleClear}
        >
          Цэвэрлэх
        </Button>
      </Group>
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
      <CoreDrawer
        opened={action[0]}
        description="Байрны мэдээлэл бүртгэл"
        onClose={() => setAction([false, null])}
        title={action[1] ? "Байрны бүртгэл засах" : "Байрны бүртгэл"}
        extra={[
          <Button
            key={1}
            size="sm"
            variant="default"
            onClick={() => setAction([false, null])}
          >
            Болих
          </Button>,
          <Button
            key={2}
            loading={loading}
            onClick={() => formRef.current?.submit()}
          >
            Хадгалах
          </Button>,
        ]}
      >
        <BuildingForm
          formRef={formRef}
          onLoadingStatus={setLoading}
          payload={action[1] || undefined}
          onSuccuss={() => {
            setAction([false, null]), tableRef.current?.reload();
          }}
        />
      </CoreDrawer>
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
];
