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
import { Button, Drawer, Text, TextInput } from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import UserForm from "./form";

export default function UserPage() {
  const tableRef = useRef<ITableRef>(null);
  const [action, setAction] = useState<any[]>([]);

  const [filters, setFilters] = React.useState<any>({
    query: "",
  });

  const columns = useHeader({
    onClick: (key: any, record: IUser) => {
      switch (key) {
        case "edit":
          setAction(["edit", record]);
          break;
        case "remove":
          openContextModal({
            modal: "confirm",
            title: "Устгах",
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
      <TextInput
        w={250}
        placeholder="Ажилтан хайх"
        maxLength={45}
        leftSection={<IconSearch size={18} />}
      />
      <Table
        ref={tableRef}
        filters={{ ...filters, userType: "STAFF" }}
        limit={15}
        columns={columns}
        loadData={userApi.list}
        name="swr.user.table"
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
        <UserForm
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
          edit: <ActionButton>Засах</ActionButton>,
          remove: <ActionButton>Устгах</ActionButton>,
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
