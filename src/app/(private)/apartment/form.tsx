"use client";

import { apartmentApi, buildingApi, complexApi } from "@/apis";
import { Form, IFormRef } from "@/components/ui/form";
import { NumberField } from "@/components/ui/form/number-field";
import { SelectField } from "@/components/ui/form/select-field";
import { SingleComboField } from "@/components/ui/form/single-combo-field";
import { TextField } from "@/components/ui/form/text-field";
import { TextareaField } from "@/components/ui/form/textarea-field";
import { IApartment } from "@/interfaces/apartment";
import HttpHandler from "@/utils/http/http-handler";
import { message } from "@/utils/message";
import { Grid, Stack } from "@mantine/core";
import { useState } from "react";
import * as yup from "yup";

const FormSchema = yup.object({
  name: yup.string().required("Заавал бөглөнө!"),
  apartmentComplex: yup.string().required("Заавал бөглөнө!"),
  building: yup.string().required("Заавал бөглөнө!"),
  buildingNumber: yup.string().required("Заавал бөглөнө!"),
  entranceNumber: yup.string().required("Заавал бөглөнө!"),
  floorNumber: yup.string().required("Заавал бөглөнө!"),
  doorNumber: yup.string().required("Заавал бөглөнө!"),
  apartmentSize: yup.string().required("Заавал бөглөнө!"),
});

type Props = {
  payload?: IApartment;
  formRef: React.Ref<IFormRef>;
  onSuccess: (reload?: boolean) => void;
  onLoadingStatus?: (loading: boolean) => void;
};
export default function ApartmentForm({
  payload,
  formRef,
  onSuccess,
  onLoadingStatus,
}: Props) {
  const [data] = useState({
    apartmentComplex: payload?.apartmentComplex?._id || undefined,
    building: payload?.building?._id || undefined,
    entranceNumber: payload?.entranceNumber || undefined,
    floorNumber: payload?.floorNumber || undefined,
    doorNumber: payload?.doorNumber || undefined,
    apartmentSize: payload?.apartmentSize || undefined,
    description: payload?.description || undefined,
    category: payload?.category?._id || undefined,
  });

  const onSubmit = async (values: typeof data) => {
    try {
      if (payload) {
        await apartmentApi.update(payload._id, values);
      } else {
        await apartmentApi.create(values);
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
      {({ values }) => {
        return (
          <Stack>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <SingleComboField
                  name="apartmentComplex"
                  label="Орон сууц"
                  placeholder="Орон сууц"
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
                {values?.apartmentComplex ? (
                  <SingleComboField
                    name="building"
                    label="Байр"
                    placeholder="Байр"
                    defaultData={
                      payload?.building
                        ? {
                            label: payload?.building.buildingName || "",
                            value: payload?.building._id || "",
                          }
                        : undefined
                    }
                    loadData={async (query) => {
                      const res = await buildingApi.list({
                        filter: {
                          query: query,
                          complex: values?.apartmentComplex,
                        },
                        offset: {
                          page: 1,
                          limit: 20,
                        },
                      });
                      return res.rows.map((item: any) => ({
                        label: item?.buildingName,
                        value: item?._id,
                      }));
                    }}
                  />
                ) : (
                  <SelectField
                    name=""
                    options={[]}
                    label="Байр"
                    placeholder={"Байр"}
                    disabled
                  />
                )}
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  name="entranceNumber"
                  label="Орцны дугаар"
                  placeholder="Орцны дугаар"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  name="floorNumber"
                  label="Давхарын дугаар"
                  placeholder="Давхарын дугаар"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NumberField
                  name="doorNumber"
                  label="Хаалганы дугаар"
                  placeholder="Хаалганы дугаар"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextField
                  name="apartmentSize"
                  label="Сууцны талбайн хэмжээ"
                  placeholder="Сууцны талбайн хэмжээ"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextareaField
                  name="description"
                  label="Нэмэлт тайлбар"
                  placeholder="Нэмэлт тайлбар"
                />
              </Grid.Col>
            </Grid>
          </Stack>
        );
      }}
    </Form>
  );
}
