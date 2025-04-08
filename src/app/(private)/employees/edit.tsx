"use client";

import CoreDrawer from "@/components/ui/drawer/page";
import { IFormRef } from "@/components/ui/form";
import { Button } from "@mantine/core";
import React, { useRef } from "react";
import EmployeeForm from "./form";
import { IUser } from "@/interfaces/user";

type Props = {
  onCancel: (record?: any) => void;
  opened: boolean;
  payload: IUser;
};

export default function EditEmployees({ opened, payload, onCancel }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const formRef = useRef<IFormRef>(null);

  const onSubmit = () => {
    formRef.current?.submit();
  };

  return (
    <CoreDrawer
      opened={opened}
      onClose={onCancel}
      title="Ажилтан засах"
      description="Ажилтан бүртгэл засах"
      extra={[
        <Button key={1} onClick={onCancel} variant="default">
          Болих
        </Button>,
        <Button key={2} onClick={onSubmit} loading={loading}>
          Хадгалах
        </Button>,
      ]}
    >
      <EmployeeForm
        onCancel={onCancel}
        formRef={formRef}
        onLoadingStatus={setLoading}
        payload={payload}
      />
    </CoreDrawer>
  );
}
