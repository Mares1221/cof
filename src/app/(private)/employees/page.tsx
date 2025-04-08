"use client";

import { userApi } from "@/apis";
import PageLayout from "@/components/layout/page-layout/page-layout";
import { ActionButton } from "@/components/ui/action-button/page";
import {
  ColumnType,
  ITableRef,
  RowAction,
  Table,
} from "@/components/ui/table/table";
import { IUser } from "@/interfaces/user";
import { ErrorMessage } from "@/utils/http/http-handler";
import { message } from "@/utils/message";
import { formatDateTime } from "@/utils/time-age";
import { Button, Flex, Group, Select, Text, TextInput } from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import {
  IconEditCircle,
  IconPlus,
  IconReload,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import NewEmployees from "./new";
import EditEmployees from "./edit";

export default function EmployeesPage() {
  const router = useRouter();
  const tableRef = useRef<ITableRef>(null);
  const [action, setAction] = useState<any[]>([]);

  const [filters, setFilters] = React.useState<any>({
    query: "",
    category: undefined,
    tag: undefined,
    status: undefined,
  });

  function onCancel() {
    setAction([]);
    tableRef.current?.reload();
  }

  const columns = useHeader({
    onClick: (key: any, record: IUser) => {
      switch (key) {
        case "edit":
          setAction(["edit", record]);
          break;
        case "remove":
          openContextModal({
            modal: "confirm",
            title: "Баталгаажуулах",
            innerProps: {
              children: "Та үүнийг устгахдаа итгэлтэй байна уу?",
              onConfirm: async (close: () => void) => {
                try {
                  await userApi.remove(record._id);
                  message.success("Таны хүсэлт амжилттай!");
                  tableRef.current?.reload();
                  close();
                } catch (err) {
                  message.error((err as ErrorMessage).message);
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
      title="Ажилтан"
      description="Ажилтан бүртгэл удирдлага"
      breadcrumb={[
        {
          label: "Ажилтан",
          href: "/employees",
        },
      ]}
      extra={
        <Button
          onClick={() => {
            setAction(["new"]);
          }}
          leftSection={<IconPlus size={20} />}
        >
          Нэмэх
        </Button>
      }
    >
      <Group gap="xs">
        <TextInput
          w={250}
          placeholder="Ажилтан хайх"
          maxLength={45}
          leftSection={<IconSearch size={18} />}
        />
        <Select placeholder="Агуулах" searchable withCheckIcon={false} />
        <Button variant="default" leftSection={<IconReload size={18} />}>
          Цэвэрлэх
        </Button>
      </Group>

      <Table
        ref={tableRef}
        filters={{ ...filters, userType: "STAFF" }}
        limit={15}
        columns={columns}
        loadData={userApi.list}
        name="swr.user.table"
      />

      <NewEmployees onCancel={onCancel} opened={action[0] === "new"} />
      <EditEmployees
        onCancel={onCancel}
        opened={action[0] === "edit" && action[1]}
        payload={action[1] && action[1]}
      />
    </PageLayout>
  );
}

const useHeader = ({
  onClick,
}: {
  onClick: (key: string, record: any) => void;
}): ColumnType<any>[] => [
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
            <ActionButton icon={<IconEditCircle size={18} color="black" />}>
              Засах
            </ActionButton>
          ),
          remove: (
            <ActionButton icon={<IconTrash size={18} color="black" />}>
              Устгах
            </ActionButton>
          ),
        }}
      />
    ),
  },
  {
    title: "Албан тушаал",
    render: (record) => "Ажилтан",
  },
  {
    title: "Овог нэр",
    render: (record) => `${record.lastName?.[0]}. ${record.firstName}`,
  },
  {
    title: "Хүйс",
    render: (record) => (record.gender === "male" ? "Эрэгтэй" : "Эмэгтэй"),
  },
  {
    title: "Регистер",
    render: (record) => record.registerNo,
  },
  {
    title: "Утасны дугаар 1",
    render: (record) => `${record.phone} ${record.phoneSecond || ""}`,
  },
  {
    title: "Мэйл хаяг",
    render: (record) => record.email || "-",
  },
  {
    title: "Ажилд орсон огноо",
    render: (record) => formatDateTime(record?.userStatusDate),
  },
];
