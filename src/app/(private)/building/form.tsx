"use client";

import { buildingApi } from "@/apis";
import { Field, Form } from "@/components/ui/form";
import { SwitchField } from "@/components/ui/form/switch-field";
import { TextField } from "@/components/ui/form/text-field";
import { ImageUpload } from "@/components/ui/upload/image-upload";
import { IBuilding } from "@/interfaces/building";
import HttpHandler from "@/utils/http/http-handler";
import { message } from "@/utils/message";
import { Button, Grid, Group, Stack } from "@mantine/core";
import { useState } from "react";
import * as yup from "yup";

const FormSchema = yup.object({
  town: yup.string().required("Заавал бөглөнө!"),
  name: yup.string().required("Заавал бөглөнө!"),
});

type Props = {
  payload?: IBuilding;
  onSuccuss: (reload?: boolean) => void;
};
export default function BuildingForm({ payload, onSuccuss }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data] = useState({
    town: payload?.town || undefined,
    name: payload?.name || undefined,
    description: payload?.description || undefined,
    image: payload?.image || undefined,
    thumbnail: payload?.thumbnail || undefined,
    isActive: payload?.isActive || false,
    coordinates: payload?.coordinates || [0, 0],
  });

  const onSubmit = async (values: typeof data) => {
    setLoading(true);
    try {
      if (payload) {
        await buildingApi.update(payload._id, values);
      } else {
        await buildingApi.create(values);
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
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField name="town" label="Байр" placeholder="Байр" />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField name="name" label="Нэр" placeholder="Нэр" />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  name="description"
                  label="Нэмэлт тайлбар"
                  placeholder="Нэмэлт тайлбар"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Field name="image">
                  {({ error }) => (
                    <ImageUpload
                      w="100%"
                      h="300px"
                      error={error}
                      value={payload?.image || ""}
                      onChange={(value) => {
                        setFieldValue("image", value?.url);
                      }}
                    />
                  )}
                </Field>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Field name="thumbnail">
                  {({ error }) => (
                    <ImageUpload
                      w="100%"
                      h="300px"
                      error={error}
                      value={payload?.thumbnail || ""}
                      onChange={(value) => {
                        setFieldValue("thumbnail", value?.url);
                      }}
                    />
                  )}
                </Field>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <SwitchField name="isActive" label="Идэвхтэй эсэх" />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  name="coordinates"
                  label="coordinates"
                  placeholder="coordinates"
                />
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
