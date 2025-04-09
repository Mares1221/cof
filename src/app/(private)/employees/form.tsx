"use client";

import { Form, IFormRef } from "@/components/ui/form";
import { SimpleGrid, Space } from "@mantine/core";
import React from "react";
import * as yup from "yup";

import { userApi } from "@/apis";
import { PasswordField } from "@/components/ui/form/password-filed";
import { RadioField } from "@/components/ui/form/radio-field";
import { SelectField } from "@/components/ui/form/select-field";
import { TextField } from "@/components/ui/form/text-field";
import { IUser } from "@/interfaces/user";
import { RootState } from "@/store";
import { message } from "@/utils/message";
import { useSelector } from "react-redux";

const formSchema = yup.object({
  // userType: yup.string().required("Заавал бөглөнө!"),
  registerNo: yup.string().required("Заавал бөглөнө!"),
  firstName: yup.string().required("Заавал бөглөнө!"),
  lastName: yup.string().required("Заавал бөглөнө!"),
  email: yup.string().required("Заавал бөглөнө!"),
  phone: yup.string().required("Заавал бөглөнө!"),
  phoneSecond: yup.string().optional(),
  avatar: yup.string().optional(),
  gender: yup.string().required("Заавал бөглөнө!"),
  position: yup.string().required("Заавал бөглөнө!"),
  // password: yup.string().required("Заавал бөглөнө!"),
  // passwordConfirm: yup
  //   .string()
  //   .oneOf([yup.ref("password")], "Нууц үг таарах ёстой!")
  //   .required("Заавал бөглөнө!"),
});

type Props = {
  onCancel: (reload?: any) => void;
  payload?: IUser | null;
  formRef: React.Ref<IFormRef>;
  onLoadingStatus?: (loading: boolean) => void;
};

export default function EmployeeForm({
  payload,
  onCancel,
  formRef,
  onLoadingStatus,
}: Props) {
  const {  position } = useSelector(
    (state: RootState) => state.general,
  );

  const optionsPosition = position.map((item: any) => ({
    label: item.name,
    value: item.code,
  }));

  const [data] = React.useState({
    userType: undefined,
    registerNo: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phone: undefined,
    phoneSecond: undefined,
    avatar: undefined,
    gender: undefined,
    position: undefined,
    passwordConfirm: payload ? "1234" : undefined,
    password: payload ? "1234" : undefined,
    ...(payload && payload),
    hasPassword: payload!,
  });

  const onSubmit = async (values: typeof data) => {
    try {
      onLoadingStatus && onLoadingStatus(true);

      if (payload?._id) {
        await userApi.update(payload?._id, {
          userType: "STAFF",
          registerNo: values.registerNo,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          phoneSecond: values.phoneSecond,
          avatar: values.avatar,
          gender: values.gender,
          position: values.position,
          isActive: true,
          role: values.role,
          password: values.password,
        });
      } else {
        await userApi.create({
          userType: "STAFF",
          registerNo: values.registerNo,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          phoneSecond: values.phoneSecond,
          avatar: values.avatar,
          gender: values.gender,
          position: values.position,
          role: values.role,
          password: values.password,
        });
      }

      onCancel(true);
      message.success("Үйлдэл амжилттай");
    } catch (error: any) {
      message.error(error?.message);
    } finally {
      onLoadingStatus && onLoadingStatus(false);
    }
  };

  console.log(payload);

  return (
    <Form
      ref={formRef}
      initialValues={data}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors }) => {
        console.log("errors: ", errors);

        return (
          <SimpleGrid cols={{ base: 1, lg: 2 }}>
            <SelectField
              label="Албан тушаал"
              name="position"
              placeholder="Албан тушаал"
              options={optionsPosition}
              required
            />
            {/* <SelectField
              label="Хандах эрх"
              name="position"
              placeholder="Хандах эрх"
              options={optionsPosition}
              required
            /> */}

            <TextField
              label="Овог"
              name="lastName"
              placeholder="Овог"
              required
            />

            <TextField
              label="Нэр"
              name="firstName"
              placeholder="Нэр"
              required
            />

            <TextField
              label="Регистрийн дугаар"
              name="registerNo"
              placeholder="Регистрийн дугаар"
              required
            />

            <TextField
              label="Утасны дугаар 1"
              name="phone"
              placeholder="Утасны дугаар 1"
              required
            />

            <TextField
              label="Утасны дугаар 2"
              name="phoneSecond"
              placeholder="Утасны дугаар 2"
            />

            <TextField
              label="Мэйл хаяг"
              name="email"
              placeholder="Мэйл хаяг"
              required
            />

            <RadioField
              label="Хүйс"
              name="gender"
              options={[
                {
                  value: "MALE",
                  label: "Эрэгтэй",
                },
                {
                  value: "FEMALE",
                  label: "Эмэгтэй",
                },
              ]}
              placeholder="Хүйс сонгох"
              children={null}
              withAsterisk
            />
            {/* <SelectField
              label="Хандах эрх"
              name="userType"
              placeholder="Хандах эрх"
              options={optionsUserType}
              required
            /> */}

            {/* <DatePickerField
              label="Ажилд орсон огноо"
              name="employmentDate"
              placeholder="Ажилд орсон огноо"
            /> */}
            {!values.hasPassword && (
              <>
                <PasswordField
                  label="Нууц үг"
                  name="password"
                  placeholder="Нууц үг"
                />

                <PasswordField
                  label="Нууц үг давтах"
                  name="passwordConfirm"
                  placeholder="Нууц үг давтах"
                />
              </>
            )}

            <Space h={100} />
          </SimpleGrid>
        );
      }}
    </Form>
  );
}
