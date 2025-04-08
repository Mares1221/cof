"use client";

import { authApi } from "@/apis";
import { Form } from "@/components/ui/form";
import { PasswordField } from "@/components/ui/form/password-filed";
import { TextField } from "@/components/ui/form/text-field";
import HeaderTitle from "@/components/ui/header-title";
import { setToken } from "@/store/auth-slice";
import { errorParse } from "@/utils/errorParse";
import { message } from "@/utils/message";
import { Button, Card, Flex, Grid, Group, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";

const formSchema = yup.object({
  username: yup.string().required("Нэвтрэх нэр оруулна уу!"),
  password: yup.string().required("Нууц үг оруулна уу!"),
});

export type SignupInputType = yup.InferType<typeof formSchema>;

function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [data] = useState({
    username: "",
    password: "",
    provider: "ZTO-HOA",
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      const res = await authApi.login(values);
      dispatch(setToken(res));
      message.success("Амжилттай нэвтэрлээ.");
      router.push("/");
    } catch (err) {
      errorParse(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex h="100vh" align="center" justify="center">
      <Card padding="lg" style={{ width: 320 }}>
        <HeaderTitle title="Мандуул Сөх" description="Нэвтрэх хэсэг" />
        <Form
          initialValues={data}
          onSubmit={onSubmit}
          validationSchema={formSchema}
        >
          {() => (
            <>
              <Grid>
                <Grid.Col span={12}>
                  <TextField name="username" placeholder="Нэвтрэх нэр" />
                </Grid.Col>
                <Grid.Col span={12}>
                  <PasswordField name="password" placeholder="Нууц үг" />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Button size="sm" type="submit" fullWidth loading={loading}>
                    Нэвтрэх
                  </Button>
                </Grid.Col>
              </Grid>
              <Group mt="xs" justify="center">
                <Text size="xs" c="gray.9" fw={400}>
                  Та нууц үгээ мартсан бол
                  <Link href="/forgot">
                    <Text mx="3px" span inherit c="dark.7" fw={800}>
                      энд дарна уу!
                    </Text>
                  </Link>
                </Text>
              </Group>
            </>
          )}
        </Form>
      </Card>
    </Flex>
  );
}

export default LoginPage;
