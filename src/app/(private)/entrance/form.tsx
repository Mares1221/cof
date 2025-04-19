"use client";

import { buildingApi, entranceApi } from "@/apis";
import { Form } from "@/components/ui/form";
import { SelectField } from "@/components/ui/form/select-field";
import { TextField } from "@/components/ui/form/text-field";
import { TextareaField } from "@/components/ui/form/textarea-field";
import { IBuilding } from "@/interfaces/building";
import { IEntrance } from "@/interfaces/entracne";
import HttpHandler from "@/utils/http/http-handler";
import { message } from "@/utils/message";
import { Button, Grid, Group, Stack } from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";
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

  const { data: buildings } = useSWR<any>("ad.building.list", async () => {
    try {
      const res = await buildingApi.list({
        filter: { query: "" },
        offset: {
          page: 1,
          limit: 50,
        },
      });
      return res;
    } catch (err) {
      message.error("Алдаа гарлаа");
      throw err;
    }
  });

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
                <SelectField
                  name="building"
                  label="Байр"
                  placeholder="Байр"
                  options={buildings?.rows?.map((item: IBuilding) => ({
                    label: item?.name,
                    value: item?._id,
                  }))}
                />
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
