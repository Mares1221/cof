"use client";

import { customerApi } from "@/apis";
import { Field, Form, IFormRef } from "@/components/ui/form";
import { NumberField } from "@/components/ui/form/number-field";
import { TextField } from "@/components/ui/form/text-field";
import { TextareaField } from "@/components/ui/form/textarea-field";
import { ImageUpload } from "@/components/ui/upload/image-upload";
import { ICustomer } from "@/interfaces/customer";
import HttpHandler from "@/utils/http/http-handler";
import { message } from "@/utils/message";
import { Grid, Stack } from "@mantine/core";
import { useState } from "react";
import * as yup from "yup";

const FormSchema = yup.object({
  name: yup.string().required("Заавал бөглөнө!"),
  logo: yup.string().required("Заавал бөглөнө!"),
  logoThumbnail: yup.string().required("Заавал бөглөнө!"),
  description: yup.string().required("Заавал бөглөнө!"),
});

type Props = {
  payload?: ICustomer;
  formRef: React.Ref<IFormRef>;
  onSuccess: (reload?: boolean) => void;
  onLoadingStatus?: (loading: boolean) => void;
};
export default function CustomerForm({
  payload,
  formRef,
  onSuccess,
  onLoadingStatus,
}: Props) {
  const [data] = useState({
    name: payload?.name || undefined,
    logo: payload?.logo || undefined,
    logoThumbnail: payload?.logoThumbnail || undefined,
    description: payload?.description || undefined,
  });

  const onSubmit = async (values: typeof data) => {
    try {
      if (payload) {
        await customerApi.update(payload._id, values);
      } else {
        await customerApi.create(values);
      }
      message.success("Таны хүсэлт амжилттай.");
      onSuccess(true);
    } catch (err) {
      message.error((err as HttpHandler)?.message!);
    } finally {
      onLoadingStatus && onLoadingStatus(false);
    }
  };

  return (
    <Form
      ref={formRef}
      onSubmit={onSubmit}
      initialValues={data}
      validationSchema={FormSchema}
    >
      {({ setFieldValue }) => {
        return (
          <Stack>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Field name="logo">
                  {({ error }) => (
                    <ImageUpload
                      w="100%"
                      h="300px"
                      error={error}
                      value={payload?.logo || ""}
                      onChange={(value) => {
                        setFieldValue("image", value?._id);
                      }}
                    />
                  )}
                </Field>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  name="logoThumbnail"
                  label="logoThumbnail"
                  placeholder="logoThumbnail"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NumberField name="name" label="name" placeholder="name" />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextareaField
                  name="description"
                  label="Нэмэлт тайлбар"
                  placeholder="Нэмэлт тайлбар"
                />
              </Grid.Col>
            </Grid>
          </Stack>
        );
      }}
    </Form>
  );
}
