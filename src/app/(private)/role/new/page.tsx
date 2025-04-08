"use client";

import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Group } from "@mantine/core";
import { useRouter } from "next/navigation";
import RoleForm from "../role-form";
import { IGeneral } from "@/interfaces/general";
import PageLayout from "@/components/layout/page-layout/page-layout";
import { IFormRef } from "@/components/ui/form";

export default function NewScalePage() {
  const router = useRouter();
  const formRef = useRef<IFormRef>(null);
  const [loading, setLoading] = useState(false);
  const { permissions } = useSelector(
    (state: { general: IGeneral }) => state.general,
  );

  const onSave = () => {
    setLoading(true);
    formRef.current?.submit();
  };

  return (
    <PageLayout
      title="Хандах эрх нэмэх"
      description="Хэрэглэгчийн хандах эрх нэмэх"
      breadcrumb={[
        {
          label: "Үндсэн",
          href: "/",
        },
        {
          label: "Хандах эрх",
          href: "/role",
        },
        {
          label: "Нэмэх",
          href: "/role/new",
        },
      ]}
      extra={[
        <Group gap="sm" key={0}>
          <Button
            size="sm"
            variant="default"
            onClick={() => router.push("/role")}
          >
            Цуцлах
          </Button>
          <Button size="sm" loading={loading} onClick={onSave}>
            Хадгалах
          </Button>
        </Group>,
      ]}
    >
      <RoleForm
        formRef={formRef}
        payload={{
          name: undefined,
          description: undefined,
          permissions: Object.values(permissions).reduce(
            (acc, iter) => ({
              ...acc,
              [iter.code]: {
                code: iter.code,
                isFull: false,
                isRead: false,
                isWrite: false,
                isRemove: false,
                isExport: false,
              },
            }),
            {},
          ),
        }}
      />
      <br />
    </PageLayout>
  );
}
