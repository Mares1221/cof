"use client";

import { roleApi } from "@/apis";
import PageLayout from "@/components/layout/page-layout/page-layout";
import { ActionButton } from "@/components/ui/action-button/page";
import {
  ColumnType,
  ITableRef,
  RowAction,
  Table,
} from "@/components/ui/table/table";
import { IRole } from "@/interfaces/role";
import { Role } from "@/models/role";
import { message } from "@/utils/message";
import { formatDate } from "@/utils/time-age";
import { Button, Group, Loader, Text, TextInput, Tooltip } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { openContextModal } from "@mantine/modals";
import {
  IconEdit,
  IconPlus,
  IconReload,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const initialFilters: {
  query: string | null;
} = {
  query: "",
};

export default function RolePage() {
  const [tableLoading, setTableLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [debounced] = useDebouncedValue(filters.query, 200);
  const tableRef = useRef<ITableRef | null>(null);
  const router = useRouter();

  const columns = useHeader({
    onClick: (key: string, record: IRole) => {
      switch (key) {
        case "edit":
          router.push(`/role/${record._id}`);
          break;
        case "delete":
          openContextModal({
            modal: "confirm",
            title: "Устгах",
            innerProps: {
              children: `Та яг одоо хандах эрх устгах гэж байна уу?`,
              onConfirm: async (close: () => void) => {
                try {
                  await roleApi.remove(record._id as string);
                  message.success("Таны хүсэлт амжилттай!");
                  close();
                  tableRef.current?.reload();
                } catch (error) {
                  message.error("Таны хүсэлт амжилтгүй!");
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
      title="Хандах эрх"
      description="Хандах эрхийн жагсаалт"
      breadcrumb={[
        {
          label: "Дашбоард",
          href: "/",
        },
        {
          label: "Хандах эрх",
          href: "/role",
        },
      ]}
      extra={
        <Tooltip label="Хандах эрхгүй байна">
          <Button
            leftSection={<IconPlus size={18} />}
            onClick={() => router.push("/role/new")}
          >
            Хандах эрх үүсгэх
          </Button>
        </Tooltip>
      }
    >
      <Group gap="xs">
        <TextInput
          value={filters.query || ""}
          placeholder="Хайх"
          leftSection={<IconSearch size={18} />}
          onChange={(e) => setFilters({ ...filters, query: e.target.value })}
        />
        <Button
          variant="default"
          leftSection={<IconReload size={18} />}
          onClick={() => {
            setFilters(initialFilters);
          }}
        >
          Цэвэрлэх
        </Button>
        {tableLoading && <Loader size="sm" />}
      </Group>
      <Table
        limit={100}
        ref={tableRef}
        columns={columns}
        loadData={roleApi.list}
        name="swr.user.role.table"
        filters={{ ...filters, query: debounced }}
      />
    </PageLayout>
  );
}

const useHeader = ({
  onClick,
}: {
  onClick: (key: string, record: IRole) => void;
}): ColumnType<Role>[] => [
  {
    title: "#",
    width: "1px",
    render: (_, index) => index + 1,
  },
  {
    title: "Үйлдэл",
    width: "1px",
    render: (record) => (
      <RowAction
        onClick={(key) => onClick(key, record)}
        extra={{
          edit: (
            <ActionButton icon={<IconEdit size={18} />}>Засварлах</ActionButton>
          ),
          delete: (
            <ActionButton icon={<IconTrash size={18} />}>Устгах</ActionButton>
          ),
        }}
      />
    ),
  },
  {
    title: "Нэр",
    render: (record) => (
      <Text size="sm" fw={600}>
        {record.name}
      </Text>
    ),
  },
  {
    title: "Тайлбар",
    render: (record) => record.description || "-",
  },
  {
    title: "Огноо",
    render: (record) => formatDate(record.createdAt),
  },
];
