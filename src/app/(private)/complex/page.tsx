"use client";

import { complexApi } from "@/apis";
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
import { IComplex } from "@/interfaces/complex";
import { Complex } from "@/models/complex";
import { errorParse } from "@/utils/errorParse";
import { message } from "@/utils/message";
import { Button, Group, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { openContextModal } from "@mantine/modals";
import {
  IconBuilding,
  IconDownload,
  IconEditCircle,
  IconHome,
  IconParking,
  IconPlus,
  IconReload,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { useRef, useState } from "react";
import ComplexForm from "./form";

const initialFilters: {
  query: string | null;
} = {
  query: null,
};

export default function ComplexPage() {
  const [action, setAction] = useState<[boolean, IComplex | null]>([
    false,
    null,
  ]);
  const [filters, setFilters] = useState(initialFilters);
  const [debounced] = useDebouncedValue(filters.query, 300);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef<ITableRef>(null);
  const formRef = useRef<IFormRef>(null);
  const columns = useHeader({
    onClick: (key: any, record: IComplex) => {
      switch (key) {
        case "edit":
          setAction([true, record]);
          break;
        case "delete":
          openContextModal({
            modal: "confirm",
            title: "Хотхон устгах",
            innerProps: {
              children: "Та устгах үйлдэлийг хийхдээ итгэлтэй байна уу",
              onConfirm: async (close: () => void) => {
                try {
                  await complexApi.remove(record._id);
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
      title="Хотхон"
      description="Хотхон жагсаалт"
      breadcrumb={[
        {
          label: "Хотхон",
          href: "/complex",
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
          onChange={(e) => setFilters({ query: e.currentTarget.value })}
        />
        <Button
          variant="default"
          leftSection={<IconReload size={18} />}
          onClick={() => setFilters(initialFilters)}
        >
          Цэвэрлэх
        </Button>
      </Group>
      <Table
        limit={15}
        ref={tableRef}
        columns={columns}
        name="swr.complex.list"
        loadData={complexApi.list}
        filters={{
          ...filters,
          query: debounced,
        }}
      />
      <CoreDrawer
        opened={action[0]}
        onClose={() => setAction([false, null])}
        title={action[1] ? "Хотхон засах" : "Хотхон бүртгэл"}
        description="Хотхон мэдээлэл бүртгэл"
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
        <ComplexForm
          formRef={formRef}
          onLoadingStatus={setLoading}
          payload={action[1] || null}
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
  onClick: (key: string, record: IComplex) => void;
}): ColumnType<Complex>[] => [
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
          edit: (
            <ActionButton icon={<IconEditCircle size={18} color="black" />}>
              Засах
            </ActionButton>
          ),
          delete: (
            <ActionButton icon={<IconTrash size={18} color="black" />}>
              Устгах
            </ActionButton>
          ),
        }}
      />
    ),
  },
  {
    title: "Хотхоны нэр",
    align: "left",
    render: (record) => record?.name || "-",
  },
  {
    title: "Барилгын тоо",
    align: "left",
    render: (record) => (
      <Group gap="xs">
        <IconBuilding size={16} /> {record?.buildingCount || "-"}
      </Group>
    ),
  },
  {
    title: "Орон сууц",
    align: "left",
    render: (record) => (
      <Group gap="xs">
        <IconHome size={16} />
        {record?.totalApartment || "-"}
      </Group>
    ),
  },
  {
    title: "Зогсоол",
    align: "left",
    render: (record) => (
      <Group gap="xs">
        <IconParking size={16} />
        {record?.totalParking || "-"}
      </Group>
    ),
  },
  {
    title: "Агуулах",
    align: "left",
    render: (record) => record?.totalWarehouse || "-",
  },
];
