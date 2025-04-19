"use client";

import { adApi } from "@/apis";
import PageLayout from "@/components/layout/page-layout/page-layout";
import { ActionButton } from "@/components/ui/action-button/page";
import {
  ColumnType,
  ITableRef,
  RowAction,
  Table,
} from "@/components/ui/table/table";
import { IAd } from "@/interfaces/ad";
import { Ad } from "@/models/ad";
import { errorParse } from "@/utils/errorParse";
import { message } from "@/utils/message";
import { Button, Drawer, TextInput, Text, Avatar, Badge } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { openContextModal } from "@mantine/modals";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useRef, useState } from "react";
import AdForm from "./form";
import { formatDate } from "@/utils/time-age";

const initialFilters: {
  query: string | null;
} = {
  query: null,
};

export default function AdPage() {
  const [action, setAction] = useState<[boolean, IAd | null]>([false, null]);
  const [filters, setFilters] = useState(initialFilters);
  const [debounced] = useDebouncedValue(filters.query, 300);
  const tableRef = useRef<ITableRef>(null);
  const columns = useHeader({
    onClick: (key: any, record: IAd) => {
      switch (key) {
        case "edit":
          setAction([true, record]);
          break;
        case "delete":
          openContextModal({
            modal: "confirm",
            title: "Зар устгах",
            innerProps: {
              children: "Та устгах үйлдэлийг хийхдээ итгэлтэй байна уу",
              onConfirm: async (close: () => void) => {
                try {
                  await adApi.remove(record._id);
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
      title="Зар"
      description="Зарын жагсаалт, удирдлага"
      breadcrumb={[
        {
          label: "Зар",
          href: "/ad",
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
        value={filters?.query || ""}
        maxLength={45}
        placeholder="Хайх"
        leftSection={<IconSearch size={18} />}
        onChange={(e) => setFilters({ ...filters, query: e.target.value })}
      />
      <Table
        limit={15}
        ref={tableRef}
        columns={columns}
        name="swr.ad.list"
        loadData={adApi.list}
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
            {action[1] ? "Зар засварлах" : "Зар бүртгэх"}
          </Text>
        }
      >
        <AdForm
          payload={action[1] || undefined}
          onSuccess={() => {
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
  onClick: (key: string, record: IAd) => void;
}): ColumnType<Ad>[] => [
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
    title: "Зураг",
    align: "left",
    render: (record) => <Avatar src={record?.image} />,
  },
  // {
  //   title: "Нэр",
  //   align: "left",
  //   render: (record) => record?.towns || "-",
  // },
  {
    title: "Нэмэлт мэдээлэл",
    align: "left",
    render: (record) => record?.description || "-",
  },
  {
    title: "Идэвхтэй эсэх",
    align: "left",
    render: (record) => (
      <Badge variant="dot" color={record?.isActive ? "green" : "red"}>
        {record?.isActive ? "Идэвхтэй" : "Идэвхгүй"}
      </Badge>
    ),
  },
  {
    title: "Огноо",
    align: "left",
    render: (record) => formatDate(record?.createdAt) || "-",
  },
];
