"use client";

import { adApi } from "@/apis";
import { Field, Form } from "@/components/ui/form";
import { DatePickerField } from "@/components/ui/form/datepicker-field";
import { NumberField } from "@/components/ui/form/number-field";
import { SelectField } from "@/components/ui/form/select-field";
import { TextareaField } from "@/components/ui/form/textarea-field";
import { ImageUpload } from "@/components/ui/upload/image-upload";
import { IAd } from "@/interfaces/ad";
import HttpHandler from "@/utils/http/http-handler";
import { message } from "@/utils/message";
import { Button, Grid, Group, Stack } from "@mantine/core";
import { useState } from "react";
import * as yup from "yup";

const FormSchema = yup.object({
  durationType: yup.string().required("Заавал бөглөнө!"),
  duration: yup.string().required("Заавал бөглөнө!"),
  startAt: yup.string().required("Заавал бөглөнө!"),
  description: yup.string().required("Заавал бөглөнө!"),
  boards: yup.string().required("Заавал бөглөнө!"),
});

type Props = {
  payload?: IAd;
  onSuccess: (reload?: boolean) => void;
};
export default function AdForm({ payload, onSuccess }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={data}
      validationSchema={FormSchema}
    >
      {({ setFieldValue }) => {
        return (
          <Stack>
            <Grid>
              <Grid.Col span={12}>
                <NumberField
                  name="customer"
                  label="customer"
                  placeholder="customer"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <SelectField
                  name="durationType"
                  label="Хугацаа"
                  placeholder="Хугацаа"
                  options={[
                    { label: "Өдөр", value: "day" },
                    { label: "Сар", value: "month" },
                  ]}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <NumberField
                  name="duration"
                  label="duration"
                  placeholder="duration"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <DatePickerField
                  name="startAt"
                  label="Эхлэх өдөр"
                  placeholder="Эхлэх өдөр"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextareaField
                  name="description"
                  label="Нэмэлт тайлбар"
                  placeholder="Нэмэлт тайлбар"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <NumberField
                  name="boards"
                  label="Самбарууд"
                  placeholder="Самбарууд"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Field name="image">
                  {({ error }) => (
                    <ImageUpload
                      w="100%"
                      h="300px"
                      error={error}
                      value={payload?.image || ""}
                      onChange={(value) => {
                        setFieldValue("image", value?.image);
                      }}
                    />
                  )}
                </Field>
              </Grid.Col>
              <Grid.Col span={12}>
                <Field name="thumbnail">
                  {({ error }) => (
                    <ImageUpload
                      w="100%"
                      h="300px"
                      error={error}
                      value={payload?.image || ""}
                      onChange={(value) => {
                        setFieldValue("thumbnail", value?.image);
                      }}
                    />
                  )}
                </Field>
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
