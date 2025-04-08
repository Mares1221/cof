"use client";

import { useParams, useRouter } from "next/navigation";
import { Button, Group, LoadingOverlay } from "@mantine/core";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import { roleApi } from "@/apis";
import RoleForm from "../role-form";
import PageLayout from "@/components/layout/page-layout/page-layout";
import { IFormRef } from "@/components/ui/form";

export default function EditScalePage() {
  const formRef = useRef<IFormRef>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { data } = useSWR(`swr.role.${id}`, () => roleApi.get(id as string));

  const onSave = () => {
    setLoading(true);
    formRef.current?.submit();
  };

  if (!data) return <LoadingOverlay />;

  return (
    <PageLayout
      title="Хандах эрх засах"
      description="Хэрэглэгчийн хандах эрх засах"
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
          label: "Засах",
          href: `/role/${id}`,
        },
      ]}
      extra={
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
        </Group>
      }
    >
      <RoleForm
        formRef={formRef}
        payload={{
          _id: data?._id,
          name: data?.name,
          description: data?.description,
          permissions: data?.permissions.reduce(
            (acc, iter) => ({
              ...acc,
              [iter.code]: {
                code: iter.code,
                isFull: iter.isFull,
                isRead: iter.isRead,
                isWrite: iter.isWrite,
                isRemove: iter.isRemove,
                isExport: iter.isExport,
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
