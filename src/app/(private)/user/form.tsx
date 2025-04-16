"use client";

import { userApi } from "@/apis";
import { Field, Form } from "@/components/ui/form";
import { SwitchField } from "@/components/ui/form/switch-field";
import { TextField } from "@/components/ui/form/text-field";
import { ImageUpload } from "@/components/ui/upload/image-upload";
import { IUser } from "@/interfaces/user";
import { message } from "@/utils/message";
import { Button, Grid, Group, Stack } from "@mantine/core";
import React, { useState } from "react";
import * as yup from "yup";

const formSchema = yup.object({
  phone: yup.string().required("Заавал бөглөнө!"),
  email: yup.string().required("Заавал бөглөнө!"),
  registerNo: yup.string().required("Заавал бөглөнө!"),
  lastName: yup.string().required("Заавал бөглөнө!"),
  firstName: yup.string().required("Заавал бөглөнө!"),
});

type Props = {
  onSuccuss: (reload?: any) => void;
  payload?: IUser | null;
};

export default function UserForm({ payload, onSuccuss }: Props) {
  const [loading, setLoading] = useState(false);

  const [data] = React.useState({
    type: payload?.type || "STAFF",
    phone: payload?.phone || "88755029",
    email: payload?.email || "cofinity0@gmail.com",
    registerNo: payload?.registerNo || "СЧ89122911",
    lastName: payload?.lastName || "Соронзонболд",
    firstName: payload?.firstName || "Нямсайхан",
    avatar: payload?.avatar || "",
    avatarThumbnail: payload?.avatarThumbnail || "",
    password: payload?.password || "@Cof123",
    isActive: payload?.isActive || true,
  });

  const onSubmit = async (values: typeof data) => {
    setLoading(true);
    try {
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
      onSuccuss(true);
      message.success("Үйлдэл амжилттай");
    } catch (error: any) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      initialValues={data}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => {
        return (
          <Stack>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  label="Овог"
                  name="lastName"
                  placeholder="Овог"
                  required
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  label="Нэр"
                  name="firstName"
                  placeholder="Нэр"
                  required
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField label="type" name="Төрөл" placeholder="Төрөл" />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField name="phone" label="Утас" placeholder="Утас" />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField name="email" label="Э-майл" placeholder="Э-майл" />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  name="registerNo"
                  label="Регистэр"
                  placeholder="Регистэр"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Field name="avatar">
                  {({ error }) => (
                    <ImageUpload
                      w="100%"
                      h="300px"
                      error={error}
                      value={payload?.avatar || ""}
                      onChange={(value) => {
                        setFieldValue("avatar", value?.image);
                      }}
                    />
                  )}
                </Field>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Field name="avatarThumbnail">
                  {({ error }) => (
                    <ImageUpload
                      w="100%"
                      h="300px"
                      error={error}
                      value={payload?.avatarThumbnail || ""}
                      onChange={(value) => {
                        setFieldValue("avatarThumbnail", value?.image);
                      }}
                    />
                  )}
                </Field>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  name="password"
                  label="Нууц үг"
                  placeholder="Нууц үг"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <SwitchField name="isActive" label="Идэвхтэй эсэх" />
              </Grid.Col>
            </Grid>
            <Group justify="flex-end" gap="xs">
              <Button type="submit" loading={loading}>
                Хадгалах
              </Button>
            </Group>
          </Stack>
        );
      }}
    </Form>
  );
}
