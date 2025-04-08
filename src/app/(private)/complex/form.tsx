"use client";

import { complexApi } from "@/apis";
import { Form, IFormRef } from "@/components/ui/form";
import { NumberField } from "@/components/ui/form/number-field";
import { TextField } from "@/components/ui/form/text-field";
import { IComplex } from "@/interfaces/complex";
import HttpHandler from "@/utils/http/http-handler";
import { message } from "@/utils/message";
import { Grid, Stack } from "@mantine/core";
import { useState } from "react";
import * as yup from "yup";

const FormSchema = yup.object({
  name: yup.string().required("Заавал бөглөнө!"),
  buildingCount: yup.string().required("Заавал бөглөнө!"),
  totalApartment: yup.string().required("Заавал бөглөнө!"),
  totalParking: yup.string().required("Заавал бөглөнө!"),
});

type Props = {
  payload?: IComplex | null;
  formRef: React.Ref<IFormRef>;
  onSuccuss: (reload?: boolean) => void;
  onLoadingStatus?: (loading: boolean) => void;
};
export default function ComplexForm({
  payload,
  formRef,
  onSuccuss,
  onLoadingStatus,
}: Props) {
  const [data] = useState({
    name: payload?.name || undefined,
    buildingCount: payload?.buildingCount || undefined,
    totalApartment: payload?.totalApartment || undefined,
    totalParking: payload?.totalParking || undefined,
    totalWarehouse: payload?.totalWarehouse || undefined,
  });

  const onSubmit = async (values: typeof data) => {
    try {
      if (payload) {
        await complexApi.update(payload._id, values);
      } else {
        await complexApi.create(values);
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
                <TextField
                  name="name"
                  label="Хотхоны нэр"
                  placeholder="Хотхоны нэр"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NumberField
                  name="buildingCount"
                  label="Барилгын тоо"
                  placeholder="Барилгын тоо"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NumberField
                  name="totalApartment"
                  label="Орон сууц"
                  placeholder="Орон сууц"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NumberField
                  name="totalParking"
                  label="Зогсоол"
                  placeholder="Зогсоол"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NumberField
                  name="totalWarehouse"
                  label="Агуулах"
                  placeholder="Агуулах"
                />
              </Grid.Col>
            </Grid>
          </Stack>
        );
      }}
    </Form>
  );
}
