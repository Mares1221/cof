"use client";

import { complexApi, townApi } from "@/apis";
import { Field, Form, IFormRef } from "@/components/ui/form";
import { NumberField } from "@/components/ui/form/number-field";
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
    description: payload?.description || undefined,
    image: payload?.image || undefined,
    thumbnail: payload?.thumbnail || undefined,
    isActive: payload?.isActive || false,
    coordinates: payload?.coordinates || [47.9016929, 106.8718291],
  });

  const onSubmit = async (values: typeof data) => {
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
      {({setFieldValue}) => {
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
                <Field name="image">
                                 {({ error }) => (
                                   <ImageUpload
                                     w="100%"
                                     h="300px"
                                     error={error}
                                     value={payload?.image || ""}
                                     onChange={(value) => {
                                       setFieldValue("image", value?._id);
                                     }}
                                   />
                                 )}
                               </Field>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <SwitchField
                  name="isActive"
                  label="idewhtei eseh"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextareaField
                  name="description"
                  label="Nemelt tai;bar"
                  placeholder="Nemelt tai;bar"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Group justify="flex-end" gap="xs">
                  <Button type="submit">Хадгалах</Button>
                </Group>
              </Grid.Col>
            </Grid>
          </Stack>
        );
      }}
    </Form>
  );
}
