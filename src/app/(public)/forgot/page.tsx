"use client";

import { authApi, otpApi } from "@/apis";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/form/text-field";
import HeaderTitle from "@/components/ui/header-title";
import { setOtp, setToken } from "@/store/auth-slice";
import { message } from "@/utils/message";
import { Button, Card, Flex, Grid, Group, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import * as y from "yup";

const formSchema = y.object().shape({
  email: y.string().min(1, "Нэвтрэх нэр оруулна уу").optional(),
});

export default function ForgotPage() {
  const router = useRouter();
  const dispatch = useDispatch();
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
      <Card padding="md" w={320}>
        <HeaderTitle title="Мандуул Сөх" description="Нууц үг мартсан" />
        <Form
          initialValues={{
            phone: "",
          }}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const res = await authApi.forgot({
                phone: values.phone,
                provider: "ZTO-HOA",
              });
              dispatch(setToken(res));
              const otpRes = await otpApi.otp({
                type: "FORGOT",
                otpMethod: "PHONE",
              });
              dispatch(
                setOtp({
                  phone: values.phone,
                  otpMethod: "PHONE",
                  expiresAt: otpRes.expiryIn,
                  message:
                    otpRes.message && typeof otpRes.message === "string"
                      ? otpRes.message
                      : "Таны бүртгэлтэй э-майл хаяг руу баталгаажуулах 6 оронтой код илгээсэн.",
                }),
              );
              message.success("Баталгаажуулах нууц үг илгээлээ.");
              router.push("/forgot-otp");
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
                <Grid.Col span={12}>
                  <TextField
                    name="phone"
                    placeholder="Утасны дугаар оруулна уу!"
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Flex gap={6}>
                    <Button size="sm" type="submit" fullWidth loading={loading}>
                      Үргэлжлүүлэх
                    </Button>
                  </Flex>
                </Grid.Col>
              </Grid>
              <Group mt="xs" justify="center">
                <Text size="xs" c="gray.9" fw={400}>
                  Нэврэх хэсэгрүү буцах бол
                  <Link href="/login">
                    <Text mx="3px" span inherit fw={800} c="dark.7">
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
