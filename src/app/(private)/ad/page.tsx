"use client";

import { adApi } from "@/apis";
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
import { IAd } from "@/interfaces/ad";
import { Ad } from "@/models/ad";
import { errorParse } from "@/utils/errorParse";
import { message } from "@/utils/message";
import { Button, Group, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { openContextModal } from "@mantine/modals";
import { IconPlus, IconReload, IconSearch } from "@tabler/icons-react";
import { useRef, useState } from "react";
import AdForm from "./form";

const initialFilters: {
  query: string | null;
  building: string | null;
  complex: string | null;
} = {
  complex: null,
  building: null,
  query: null,
};

export default function AdPage() {
  const [action, setAction] = useState<[boolean, IAd | null]>([false, null]);
  const [filters, setFilters] = useState(initialFilters);
  const [debounced] = useDebouncedValue(filters.query, 300);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef<ITableRef>(null);
  const formRef = useRef<IFormRef>(null);
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

  const comboRefComplex = useRef<{ clear: () => void }>(null);
  const comboRefBuilding = useRef<{ clear: () => void }>(null);

  const handleClear = () => {
    if (comboRefComplex.current) {
      comboRefComplex.current.clear();
    }
    if (comboRefBuilding.current) {
      comboRefBuilding.current.clear();
    }
    setFilters(initialFilters);
  };
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
      <Group gap="xs">
        <TextInput
          w={250}
          value={filters?.query || ""}
          maxLength={45}
          placeholder="Хайх"
          leftSection={<IconSearch size={18} />}
          onChange={(e) => setFilters({ ...filters, query: e.target.value })}
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
        name="swr.ad.list"
        loadData={adApi.list}
        filters={{
          ...filters,
          query: debounced,
        }}
      />
      <CoreDrawer
        opened={action[0]}
        onClose={() => setAction([false, null])}
        title={action[1] ? "Зар засварлах" : "Зар бүртгэх"}
        description="Зар харьяалагдах Зар"
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
        <AdForm
          onSuccess={() => {
            setAction([false, null]), tableRef.current?.reload();
          }}
          formRef={formRef}
          payload={action[1] || undefined}
          onLoadingStatus={setLoading}
        />
      </CoreDrawer>
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
];
