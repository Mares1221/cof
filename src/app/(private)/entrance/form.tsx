"use client";

import { entranceApi } from "@/apis";
import { Form, IFormRef } from "@/components/ui/form";
import { NumberField } from "@/components/ui/form/number-field";
import { TextField } from "@/components/ui/form/text-field";
import { TextareaField } from "@/components/ui/form/textarea-field";
import { IEntrance } from "@/interfaces/entracne";
import HttpHandler from "@/utils/http/http-handler";
import { message } from "@/utils/message";
import { Grid, Stack } from "@mantine/core";
import { useState } from "react";
import * as yup from "yup";

const FormSchema = yup.object({
  building: yup.string().required("Заавал бөглөнө!"),
  name: yup.string().required("Заавал бөглөнө!"),
  description: yup.string().required("Заавал бөглөнө!"),
});

type Props = {
  payload?: IEntrance;
  formRef: React.Ref<IFormRef>;
  onSuccess: (reload?: boolean) => void;
  onLoadingStatus?: (loading: boolean) => void;
};
export default function EntranceForm({
  payload,
  formRef,
  onSuccess,
  onLoadingStatus,
}: Props) {
  const [data] = useState({
    building: payload?.building || undefined,
    name: payload?.name || undefined,
    description: payload?.description || undefined,
  });

  const onSubmit = async (values: typeof data) => {
    try {
      if (payload) {
        await entranceApi.update(payload._id, values);
      } else {
        await entranceApi.create(values);
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
      {({ values, setFieldValue }) => {
        return (
          <Stack>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  name="building"
                  label="building"
                  placeholder="building"
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
