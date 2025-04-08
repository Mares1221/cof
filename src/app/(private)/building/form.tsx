"use client";

import { buildingApi, complexApi } from "@/apis";
import { Form, IFormRef } from "@/components/ui/form";
import { DatePickerField } from "@/components/ui/form/datepicker-field";
import { SingleComboField } from "@/components/ui/form/single-combo-field";
import { TextField } from "@/components/ui/form/text-field";
import { IBuilding } from "@/interfaces/building";
import HttpHandler from "@/utils/http/http-handler";
import { message } from "@/utils/message";
import { Grid, Stack } from "@mantine/core";
import { useState } from "react";
import * as yup from "yup";

const FormSchema = yup.object({
  apartmentComplex: yup.string().required("Заавал бөглөнө!"),
  buildingName: yup.string().required("Заавал бөглөнө!"),
  totalEntrance: yup.string().required("Заавал бөглөнө!"),
  totalApartment: yup.string().required("Заавал бөглөнө!"),
  totalParking: yup.string().required("Заавал бөглөнө!"),
  totalWarehouse: yup.string().required("Заавал бөглөнө!"),
  startDate: yup.string().required("Заавал бөглөнө!"),
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
    apartmentComplex: payload?.apartmentComplex || undefined,
    buildingName: payload?.buildingName || undefined,
    totalEntrance: payload?.totalEntrance || undefined,
    totalApartment: payload?.totalApartment || undefined,
    totalParking: payload?.totalParking || undefined,
    totalWarehouse: payload?.totalWarehouse || undefined,
    startDate: payload?.startDate || undefined,
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
                <SingleComboField
                  name="apartmentComplex"
                  label="Хотхон"
                  placeholder="Хотхон"
                  defaultData={
                    payload?.apartmentComplex
                      ? {
                          label: payload?.apartmentComplex.name || "",
                          value: payload?.apartmentComplex._id || "",
                        }
                      : undefined
                  }
                  loadData={async (query) => {
                    const res = await complexApi.list({
                      filter: { query: query },
                      offset: {
                        page: 1,
                        limit: 20,
                      },
                    });
                    return res.rows.map((item: any) => ({
                      label: item?.name,
                      value: item?._id,
                    }));
                  }}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField name="buildingName" label="Нэр" placeholder="Нэр" />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextField name="totalEntrance" label="Орц" placeholder="Орц" />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  name="totalApartment"
                  label="Орон сууц"
                  placeholder="Орон сууц"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  name="totalParking"
                  label="Зогсоол"
                  placeholder="Зогсоол"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  name="totalWarehouse"
                  label="Агуулах"
                  placeholder="Агуулах"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <DatePickerField
                  name="startDate"
                  label="Огноо"
                  placeholder="Огноо"
                />
              </Grid.Col>
            </Grid>
          </Stack>
        );
      }}
    </Form>
  );
}
