"use client";

import { Form, IFormRef } from "@/components/ui/form";
import { SimpleGrid } from "@mantine/core";
import React from "react";
import * as yup from "yup";

import { userApi } from "@/apis";
import { TextField } from "@/components/ui/form/text-field";
import { IUser } from "@/interfaces/user";
import { RootState } from "@/store";
import { message } from "@/utils/message";
import { useSelector } from "react-redux";

const formSchema = yup.object({
  type: yup.string().required("Заавал бөглөнө!"),
  phone: yup.string().required("Заавал бөглөнө!"),
  email: yup.string().required("Заавал бөглөнө!"),
  registerNo: yup.string().required("Заавал бөглөнө!"),
  lastName: yup.string().required("Заавал бөглөнө!"),
  firstName: yup.string().required("Заавал бөглөнө!"),
  avatar: yup.string().required("Заавал бөглөнө!"),
  avatarThumbnail: yup.string().required("Заавал бөглөнө!"),
  password: yup.string().required("Заавал бөглөнө!"),
  isActive: yup.string().required("Заавал бөглөнө!"),
});

type Props = {
  onCancel: (reload?: any) => void;
  payload?: IUser | null;
  formRef: React.Ref<IFormRef>;
  onLoadingStatus?: (loading: boolean) => void;
};

export default function EmployeeForm({
  payload,
  onCancel,
  formRef,
  onLoadingStatus,
}: Props) {
  const { position } = useSelector((state: RootState) => state.general);

  const optionsPosition = position.map((item: any) => ({
    label: item.name,
    value: item.code,
  }));

  const [data] = React.useState({
    type: payload?.type || "STAFF",
    phone: payload?.phone || "88755029",
    email: payload?.email || "cofinity0@gmail.com", // null
    registerNo: payload?.registerNo || "СЧ89122911", // null
    lastName: payload?.lastName || "Соронзонболд", // null
    firstName: payload?.firstName || "Нямсайхан",
    avatar: payload?.avatar || "", // null
    avatarThumbnail: payload?.avatarThumbnail || "", // null
    password: payload?.password || "@Cof123",
    isActive: payload?.isActive || true,
  });

  const onSubmit = async (values: typeof data) => {
    try {
      onLoadingStatus && onLoadingStatus(true);

      let dataValue = {
        type: values?.type,
        phone: values?.phone,
        email: values?.email,
        registerNo: values?.registerNo,
        lastName: values?.lastName,
        firstName: values?.firstName,
        avatar: values?.avatar,
        avatarThumbnail: values?.avatarThumbnail,
        password: values?.password,
        isActive: values?.isActive,
      };

      if (payload?._id) {
        await userApi.update(payload?._id, dataValue);
      } else {
        await userApi.create(dataValue);
      }

      onCancel(true);
      message.success("Үйлдэл амжилттай");
    } catch (error: any) {
      message.error(error?.message);
    } finally {
      onLoadingStatus && onLoadingStatus(false);
    }
  };

  console.log(payload);

  return (
    <Form
      ref={formRef}
      initialValues={data}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors }) => {
        console.log("errors: ", errors);

        return (
          <SimpleGrid cols={{ base: 1, lg: 2 }}>
            <TextField
              label="Овог"
              name="lastName"
              placeholder="Овог"
              required
            />
            <TextField
              label="Нэр"
              name="firstName"
              placeholder="Нэр"
              required
            />
            <TextField label="type" name="type" placeholder="type" required />
            <TextField
              label="phone"
              name="phone"
              placeholder="phone"
              required
            />
            <TextField
              label="email"
              name="email"
              placeholder="email"
              required
            />
            <TextField
              label="registerNo"
              name="registerNo"
              placeholder="registerNo"
              required
            />
            <TextField
              label="avatar"
              name="avatar"
              placeholder="Нэр"
              required
            />
            <TextField
              label="avatarThumbnail"
              name="avatarThumbnail"
              placeholder="avatarThumbnail"
              required
            />
            <TextField
              label="password"
              name="password"
              placeholder="password"
              required
            />
            <TextField
              label="isActive"
              name="isActive"
              placeholder="isActive"
              required
            />
          </SimpleGrid>
        );
      }}
    </Form>
  );
}
