"use client";

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
import { Customer } from "@/models/customer";
import { errorParse } from "@/utils/errorParse";
import { message } from "@/utils/message";
import { Button, Group, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { openContextModal } from "@mantine/modals";
import { IconPlus, IconReload, IconSearch } from "@tabler/icons-react";
import { useRef, useState } from "react";
import CustomerForm from "./form";
import { ICustomer } from "@/interfaces/customer";
import { customerApi } from "@/apis";

const initialFilters: {
  query: string | null;
  building: string | null;
  complex: string | null;
} = {
  complex: null,
  building: null,
  query: null,
};

export default function EntarncePage() {
  const [action, setAction] = useState<[boolean, ICustomer | null]>([
    false,
    null,
  ]);
  const [filters, setFilters] = useState(initialFilters);
  const [debounced] = useDebouncedValue(filters.query, 300);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef<ITableRef>(null);
  const formRef = useRef<IFormRef>(null);
  const columns = useHeader({
    onClick: (key: any, record: ICustomer) => {
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
                  await customerApi.remove(record._id);
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
        name="swr.apartment.list"
        loadData={customerApi.list}
        filters={{
          ...filters,
          query: debounced,
        }}
      />
      <CoreDrawer
        opened={action[0]}
        onClose={() => setAction([false, null])}
        title={action[1] ? "Зар засварлах" : "Зар бүртгэх"}
        description="Зар Мэдээ"
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
        <CustomerForm
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
  onClick: (key: string, record: ICustomer) => void;
}): ColumnType<Customer>[] => [
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
