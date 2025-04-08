/* eslint-disable @typescript-eslint/no-shadow */

"use client";

import { otpApi } from "@/apis";
import { Form } from "@/components/ui/form";
import HeaderTitle from "@/components/ui/header-title";
import { IAuth } from "@/interfaces/auth";
import { setOtp, setToken } from "@/store/auth-slice";
import { message } from "@/utils/message";
import { Button, Card, Flex, Group, PinInput, Text } from "@mantine/core";
import { IconMailForward } from "@tabler/icons-react";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as y from "yup";

const formSchema = y.object().shape({
  otpCode: y.string().min(1, "Баталгаажуулах код оруулна уу").optional(),
});

export default function ForgotOtp() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { otp } = useSelector((state: { auth: IAuth }) => state.auth);
  const [, setTiker] = React.useState<number>(0);

  const { otpMethod, phone, expiresAt, message: alertMessage } = otp;

  const expriesOn = expiresAt
    ? dayjs(expiresAt)
    : dayjs().subtract(3, "minute");

  const countDownExpiresAt = () => {
    const now = dayjs();
    const diff = expriesOn.diff(now, "second");
    const minutes = Math.floor(diff / 60);
    const seconds = diff - minutes * 60;
    return `${minutes} минут ${seconds} секунд`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTiker((prev) => prev + 1);
    }, 1000);

    if (expriesOn.isBefore(dayjs())) {
      setTimeout(() => {
        clearInterval(timer);
      }, 2000);
    }

    return () => clearInterval(timer);
  }, [expriesOn]);

  const getOtp = async () => {
    try {
      const res = await otpApi.otp({
        // phone: phone || "",
        type: "PHONE",
      });
      dispatch(
        setOtp({
          phone: phone || "",
          otpMethod: otpMethod || "",
          expiresAt: res.expiryIn,
        }),
      );
      if (res.message && typeof res.message === "string") {
        message.success(res.message);
      } else {
        message.success("Амжилттай");
      }
    } catch (error: any) {
      if (typeof error.message === "string") {
        message.error(error.message);
      } else {
        message.error("Хүсэлт амжилтгүй");
      }
    }
  };
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
      <Card padding="sm" radius="md" w={320}>
        <HeaderTitle title="Мандуул Сөх" description="Баталгаажуулах хэсэг" />
        <Form
          initialValues={{
            otpCode: "",
          }}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const res = await otpApi.verify({
                otpMethod: "PHONE",
                otpCode: values.otpCode || "",
              });
              dispatch(setToken(res));
              message.success("Та шинэ нууц үг үүсгэнэ үү");
              router.push("/change-password");
            } catch (error: any) {
              message.error(error.message);
            } finally {
              setLoading(false);
            }
          }}
          validationSchema={formSchema}
        >
          {({ values, errors, setFieldValue }) => (
            <>
              <Flex gap={12} direction="column">
                <Flex direction="column">
                  <Text size="xs" fw={700}>
                    Баталгаажуулах
                  </Text>
                  <Text size="xs" c="dimmed">
                    {alertMessage ||
                      "Таны бүртгэлтэй э-майл хаяг руу баталгаажуулах 6 оронтой код илгээсэн."}
                  </Text>
                </Flex>
                {expriesOn.isBefore(dayjs()) ? (
                  <Flex direction="column" gap={10} justify="center">
                    <Text size="xs" ta="right" fw={600}>
                      Кодын хугацаа дууссан байна.
                    </Text>
                    <Button onClick={getOtp} size="xs" variant="light">
                      <IconMailForward
                        size={20}
                        style={{ marginRight: "5px" }}
                      />{" "}
                      Дахин код авах
                    </Button>
                  </Flex>
                ) : (
                  <Flex direction="column">
                    <Text size="xs" c="green.7" fw={600}>
                      OTP код идвэхтэй байх хугацаа:
                    </Text>
                    <Flex
                      h="40px"
                      align="center"
                      bg="red.1"
                      mt="5px"
                      style={{ borderRadius: "5px" }}
                    >
                      <Text size="xs" c="black" fw={600} ml="10px">
                        {countDownExpiresAt()}
                      </Text>
                    </Flex>
                  </Flex>
                )}
                <PinInput
                  error={errors.otpCode}
                  onChange={(values) => setFieldValue("otpCode", values)}
                  value={values.otpCode}
                  style={{ display: "flex", justifyContent: "center" }}
                  radius="md"
                  size="sm"
                  length={6}
                  mask
                />
                <Button type="submit" fullWidth loading={loading}>
                  Баталгаажуулах
                </Button>
              </Flex>
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
