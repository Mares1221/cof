"use client";

import { buildingApi } from "@/apis";
import { Form, IFormRef } from "@/components/ui/form";
import { TextField } from "@/components/ui/form/text-field";
import { IBuilding } from "@/interfaces/building";
import HttpHandler from "@/utils/http/http-handler";
import { message } from "@/utils/message";
import { Grid, Stack } from "@mantine/core";
import { useState } from "react";
import * as yup from "yup";

const FormSchema = yup.object({
  town: yup.string().required("Заавал бөглөнө!"),
  name: yup.string().required("Заавал бөглөнө!"),
  description: yup.string().required("Заавал бөглөнө!"),
  image: yup.string().required("Заавал бөглөнө!"),
  thumbnail: yup.string().required("Заавал бөглөнө!"),
  isActive: yup.string().required("Заавал бөглөнө!"),
  coordinates: yup.string().required("Заавал бөглөнө!"),
});

type Props = {
  payload?: IBuilding;
  formRef: React.Ref<IFormRef>;
  onSuccuss: (reload?: boolean) => void;
  onLoadingStatus?: (loading: boolean) => void;
};
export default function BuildingForm({
  payload,
  formRef,
  onSuccuss,
  onLoadingStatus,
}: Props) {
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
      {() => {
        return (
          <Stack>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField name="town" label="town" placeholder="town" />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField name="name" label="name" placeholder="name" />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  name="description"
                  label="description"
                  placeholder="description"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField name="image" label="image" placeholder="image" />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  name="thumbnail"
                  label="thumbnail"
                  placeholder="thumbnail"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  name="isActive"
                  label="isActive"
                  placeholder="isActive"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  name="coordinates"
                  label="coordinates"
                  placeholder="coordinates"
                />
              </Grid.Col>
            </Grid>
          </Stack>
        );
      }}
    </Form>
  );
}
