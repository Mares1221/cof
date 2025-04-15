"use client";

import { entranceApi } from "@/apis";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/form/text-field";
import { TextareaField } from "@/components/ui/form/textarea-field";
import { IEntrance } from "@/interfaces/entracne";
import HttpHandler from "@/utils/http/http-handler";
import { message } from "@/utils/message";
import { Button, Grid, Group, Stack } from "@mantine/core";
import { useState } from "react";
import * as yup from "yup";

const FormSchema = yup.object({
  building: yup.string().required("Заавал бөглөнө!"),
  name: yup.string().required("Заавал бөглөнө!"),
  description: yup.string().required("Заавал бөглөнө!"),
});

type Props = {
  payload?: IEntrance;
  onSuccess: (reload?: boolean) => void;
};
export default function EntranceForm({ payload, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [data] = useState({
    building: payload?.building || undefined,
    name: payload?.name || undefined,
    description: payload?.description || undefined,
  });

  const onSubmit = async (values: typeof data) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={data}
      validationSchema={FormSchema}
    >
      {() => {
        return (
          <Stack>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField name="building" label="Байр" placeholder="Байр" />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField name="name" label="Нэр" placeholder="Нэр" />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextareaField
                  name="description"
                  label="Нэмэлт тайлбар"
                  placeholder="Нэмэлт тайлбар"
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
