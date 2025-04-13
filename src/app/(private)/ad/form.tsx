"use client";

import { adApi } from "@/apis";
import { Field, Form, IFormRef } from "@/components/ui/form";
import { DatePickerField } from "@/components/ui/form/datepicker-field";
import { NumberField } from "@/components/ui/form/number-field";
import { SelectField } from "@/components/ui/form/select-field";
import { TextField } from "@/components/ui/form/text-field";
import { TextareaField } from "@/components/ui/form/textarea-field";
import { ImageUpload } from "@/components/ui/upload/image-upload";
import { IAd } from "@/interfaces/ad";
import HttpHandler from "@/utils/http/http-handler";
import { message } from "@/utils/message";
import { Grid, Stack } from "@mantine/core";
import { useState } from "react";
import * as yup from "yup";

const FormSchema = yup.object({
  image: yup.string().required("Заавал бөглөнө!"),
  thumbnail: yup.string().required("Заавал бөглөнө!"),
  customer: yup.string().required("Заавал бөглөнө!"),
  durationType: yup.string().required("Заавал бөглөнө!"),
  duration: yup.string().required("Заавал бөглөнө!"),
  startAt: yup.string().required("Заавал бөглөнө!"),
  description: yup.string().required("Заавал бөглөнө!"),
  boards: yup.string().required("Заавал бөглөнө!"),
});

type Props = {
  payload?: IAd;
  formRef: React.Ref<IFormRef>;
  onSuccess: (reload?: boolean) => void;
  onLoadingStatus?: (loading: boolean) => void;
};
export default function AdForm({
  payload,
  formRef,
  onSuccess,
  onLoadingStatus,
}: Props) {
  const [data] = useState({
    image: payload?.image || undefined,
    thumbnail: payload?.thumbnail || undefined,
    customer: payload?.customer || undefined,
    durationType: payload?.durationType || undefined,
    duration: payload?.duration || 0,
    startAt: payload?.startAt || undefined,
    description: payload?.description || undefined,
    boards: payload?.boards || [],
  });

  const onSubmit = async (values: typeof data) => {
    try {
      if (payload) {
        await adApi.update(payload._id, values);
      } else {
        await adApi.create(values);
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
                <Field name="image">
                  {({ error }) => (
                    <ImageUpload
                      w="100%"
                      h="300px"
                      error={error}
                      value={payload?.image || ""}
                      onChange={(value) => {
                        setFieldValue("image", value?._id);
                      }}
                    />
                  )}
                </Field>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  name="thumbnail"
                  label="thumbnail"
                  placeholder="thumbnail"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NumberField
                  name="customer"
                  label="customer"
                  placeholder="customer"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <SelectField
                  name="durationType"
                  label="durationType"
                  placeholder="durationType"
                  options={[
                    { label: "day", value: "day" },
                    { label: "month", value: "month" },
                  ]}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NumberField
                  name="duration"
                  label="duration"
                  placeholder="duration"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <DatePickerField
                  name="startAt"
                  label="startAt"
                  placeholder="startAt"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextareaField
                  name="description"
                  label="Нэмэлт тайлбар"
                  placeholder="Нэмэлт тайлбар"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NumberField
                  name="boards"
                  label="boards"
                  placeholder="boards"
                />
              </Grid.Col>
            </Grid>
          </Stack>
        );
      }}
    </Form>
  );
}
