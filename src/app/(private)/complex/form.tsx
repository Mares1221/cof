"use client";

import { townApi } from "@/apis";
import { Field, Form } from "@/components/ui/form";
import { SwitchField } from "@/components/ui/form/switch-field";
import { TextField } from "@/components/ui/form/text-field";
import { TextareaField } from "@/components/ui/form/textarea-field";
import { ImageUpload } from "@/components/ui/upload/image-upload";
import { IComplex } from "@/interfaces/complex";
import HttpHandler from "@/utils/http/http-handler";
import { message } from "@/utils/message";
import { Button, Grid, Group, Stack } from "@mantine/core";
import { useState } from "react";
import * as yup from "yup";

const FormSchema = yup.object({
  name: yup.string().required("Заавал бөглөнө!"),
});

type Props = {
  payload?: IComplex | null;
  onSuccuss: (reload?: boolean) => void;
};
export default function ComplexForm({ payload, onSuccuss }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data] = useState({
    name: payload?.name || undefined,
    description: payload?.description || undefined,
    image: payload?.image || undefined,
    thumbnail: payload?.thumbnail || undefined,
    isActive: payload?.isActive || false,
    coordinates: payload?.coordinates || [47.9016929, 106.8718291],
  });

  const onSubmit = async (values: typeof data) => {
    setLoading(true);
    try {
      if (payload) {
        await townApi.update(payload._id, values);
      } else {
        await townApi.create(values);
      }
      message.success("Таны хүсэлт амжилттай.");
      onSuccuss(true);
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
                <TextField
                  name="name"
                  label="Хотхоны нэр"
                  placeholder="Хотхоны нэр"
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
                <SwitchField name="isActive" label="Идэвхтэй эсэх" />
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
