"use client";

import { apartmentApi, buildingApi, complexApi } from "@/apis";
import PageLayout from "@/components/layout/page-layout/page-layout";
import { ActionButton } from "@/components/ui/action-button/page";
import CoreDrawer from "@/components/ui/drawer/page";
import { IFormRef } from "@/components/ui/form";
import { SelectField } from "@/components/ui/form/select-field";
import { SingleComboboxInput } from "@/components/ui/form/single-combobox-input";
import {
  ColumnType,
  ITableRef,
  RowAction,
  Table,
} from "@/components/ui/table/table";
import { IApartment } from "@/interfaces/apartment";
import { Apartment } from "@/models/apartment";
import { errorParse } from "@/utils/errorParse";
import { message } from "@/utils/message";
import { Button, Group, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { openContextModal } from "@mantine/modals";
import {
  IconDoor,
  IconEditCircle,
  IconPlus,
  IconReload,
  IconRuler2,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { useRef, useState } from "react";
import ApartmentForm from "./form";

const initialFilters: {
  query: string | null;
  building: string | null;
  complex: string | null;
} = {
  complex: null,
  building: null,
  query: null,
};

export default function ApartmentPage() {
  const [action, setAction] = useState<[boolean, IApartment | null]>([
    false,
    null,
  ]);
  const [filters, setFilters] = useState(initialFilters);
  const [debounced] = useDebouncedValue(filters.query, 300);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef<ITableRef>(null);
  const formRef = useRef<IFormRef>(null);
  const columns = useHeader({
    onClick: (key: any, record: IApartment) => {
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
                  await apartmentApi.remove(record._id);
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
      title="Орон сууц"
      description="Орон сууцын жагсаалт, удирдлага"
      breadcrumb={[
        {
          label: "Орон сууц",
          href: "/apartment",
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
        <SingleComboboxInput
          w={200}
          ref={comboRefComplex}
          value={filters?.complex || ""}
          name="apartmentComplex"
          placeholder="Хотхон"
          defaultValue={filters?.complex || ""}
          loadData={async (query) => {
            const res = await complexApi.list({
              filter: { query: query },
              offset: {
                page: 1,
                limit: 20,
              },
            });
            return res.rows.map((item: any) => ({
              label: item?.name,
              value: item?._id,
            }));
          }}
          onChange={(e: any) => setFilters({ ...filters, complex: e })}
        />
        {filters?.complex ? (
          <SingleComboboxInput
            w={200}
            ref={comboRefBuilding}
            value={filters?.building || ""}
            name="building"
            placeholder="Байр"
            defaultValue={filters?.building || ""}
            loadData={async (query) => {
              const res = await buildingApi.list({
                filter: { query: query, complex: filters?.complex },
                offset: {
                  page: 1,
                  limit: 20,
                },
              });
              return res.rows.map((item: any) => ({
                label: item?.buildingName,
                value: item?._id,
              }));
            }}
            onChange={(e: any) => setFilters({ ...filters, building: e })}
          />
        ) : (
          <SelectField name="" options={[]} placeholder={"Байр"} disabled />
        )}
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
        loadData={apartmentApi.list}
        filters={{
          ...filters,
          query: debounced,
        }}
      />
      <CoreDrawer
        opened={action[0]}
        onClose={() => setAction([false, null])}
        title={action[1] ? "Орон сууц засварлах" : "Орон сууц бүртгэх"}
        description="Хотхонд харьяалагдах орон сууц"
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
        <ApartmentForm
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
  onClick: (key: string, record: IApartment) => void;
}): ColumnType<Apartment>[] => [
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
    render: (record) => record?.apartmentComplex?.name || "-",
  },
  {
    title: "Байрны дугаар",
    align: "left",
    render: (record) => record?.building?.buildingName || "-",
  },
  {
    title: "Орцны дугаар",
    align: "left",
    render: (record) => record?.entranceNumber || "-",
  },
  {
    title: "Давхар",
    align: "left",
    render: (record) => record?.floorNumber || "-",
  },
  {
    title: "Хаалга",
    align: "left",
    render: (record) => (
      <Group gap="xs">
        <IconDoor size={16} />
        {record?.doorNumber || "-"}
      </Group>
    ),
  },
  {
    title: "Байрны хэмжээ",
    align: "left",
    render: (record) => (
      <Group gap="xs">
        <IconRuler2 size={16} />
        {record?.apartmentSize || "-"}
      </Group>
    ),
  },
];
