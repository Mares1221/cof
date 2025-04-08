"use client";

import { authApi } from "@/apis";
import { Form } from "@/components/ui/form";
import { PasswordField } from "@/components/ui/form/password-filed";
import HeaderTitle from "@/components/ui/header-title";
import { setToken } from "@/store/auth-slice";
import { message } from "@/utils/message";
import { Button, Card, Grid, Group, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import * as y from "yup";

const formSchema = y
  .object()
  .shape({
    newPassword: y
      .string()
      .min(8, "Нууц үг хамгийн багадаа 8 тэмдэгтээс бүрдэх ёстой.")
      .matches(/[A-Z]/, { message: "Том үсэг орсон байх ёстой" })
      .matches(/[a-z]/, { message: "Жижиг үсэг орсон байх ёстой" })
      .optional(),
    password: y.string().optional(),
  })
  .test("password-match", "Нууц үг таарахгүй байна", (data) => {
    return data.newPassword === data.password;
  });

export default function PasswordChangePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card padding="lg" w={320}>
        <HeaderTitle title="Мандуул Сөх" description="Нууц үг шинэчлэх хэсэг" />
        <Form
          initialValues={{
            password: "",
          }}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const fixedValues = {
                password: values.password,
              };
              const res = await authApi.changePassword(fixedValues);
              dispatch(setToken(res));
              router.push("/login");
              message.success("Нууц үг амжилттай солигдлоо.");
            } catch (error: any) {
              message.error(error.message);
            } finally {
              setLoading(false);
            }
          }}
          validationSchema={formSchema}
        >
          {() => (
            <>
              <Grid>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                  <PasswordField name="newPassword" placeholder="Нууц үг" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                  <PasswordField name="password" placeholder="Нууц үг давтах" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                  <Button type="submit" fullWidth loading={loading}>
                    Нууц үг шинэчлэх
                  </Button>
                </Grid.Col>
              </Grid>
              <Group mt="xs" justify="center">
                <Text size="xs" c="gray.9" fw={400}>
                  Нэврэх хэсэгрүү буцах бол
                  <Link href="/login">
                    <Text mx="3px" span inherit fw={800} c="green.7">
                      энд дарна уу!
                    </Text>
                  </Link>
                </Text>
              </Group>
            </>
          )}
        </Form>
      </Card>
    </div>
  );
}
