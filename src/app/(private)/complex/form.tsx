"use client";

import { townApi } from "@/apis";
import { Field, Form } from "@/components/ui/form";
import { SwitchField } from "@/components/ui/form/switch-field";
import { TextField } from "@/components/ui/form/text-field";
import { TextareaField } from "@/components/ui/form/textarea-field";
import MapBox from "@/components/ui/map/page";
import { ImageUpload } from "@/components/ui/upload/image-upload";
import { IComplex } from "@/interfaces/complex";
import HttpHandler from "@/utils/http/http-handler";
import { message } from "@/utils/message";
import { Button, Grid, Group, Stack, Text } from "@mantine/core";
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
    coordinates: payload?.location?.pinpoint?.coordinates || [
      47.9016929, 106.8718291,
    ],
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
      {({ setFieldValue, values }) => {
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
                <Text fw={500} size="15px" mb="sm">
                  Байршил
                </Text>
                <Stack style={{ position: "relative", height: "400px" }}>
                  <MapBox
                    // coordinates={
                    //   payload?.location?.pinpoint?.coordinates
                    //     ? [
                    //         payload.location.pinpoint.coordinates[1],
                    //         payload.location.pinpoint.coordinates[0],
                    //       ]
                    //     : [106.91367547215157, 47.9204588626057]
                    // }
                    onClick={
                      (e) => setFieldValue("coordinates", [e.lat, e.lng]) // [lat, lng] формат
                    }
                  />
                </Stack>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text size="14px" fw={500} mb="4px">
                  Зураг
                </Text>
                <Field name="image">
                  {({ error }) => (
                    <ImageUpload
                      w="300px"
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
