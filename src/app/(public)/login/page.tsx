"use client";

import { authApi } from "@/apis";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/form/text-field";
import { setToken } from "@/store/auth-slice";
import { errorParse } from "@/utils/errorParse";
import { message } from "@/utils/message";
import {
  Anchor,
  Button,
  Card,
  Flex,
  Group,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconLock, IconUser } from "@tabler/icons-react";
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
    <Flex
      h="100vh"
      align="center"
      justify="center"
      style={{
        background: "linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)",
        overflow: "hidden",
      }}
    >
      <Card
        shadow="md"
        padding="xl"
        radius="md"
        withBorder
        style={{
          width: 380,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Stack gap="md">
          <Flex direction="column" align="center">
            <Title order={3} fw={700} c="dark.8">
              Самбар
            </Title>
            <Text size="sm" c="dimmed">
              Нэвтрэх хэсэг
            </Text>
          </Flex>

          <Form
            initialValues={data}
            onSubmit={onSubmit}
            validationSchema={formSchema}
          >
            {() => (
              <Stack gap="md">
                <TextField
                  name="username"
                  placeholder="Нэвтрэх нэр"
                  leftSection={<IconUser size={18} />}
                  size="md"
                  radius="md"
                  styles={{
                    input: {
                      background: "rgba(255, 255, 255, 0.8)",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      transition: "all 0.2s",
                      "&:focus": {
                        borderColor: "#6e8efb",
                        boxShadow: "0 0 0 2px rgba(110, 142, 251, 0.2)",
                      },
                    },
                  }}
                />

                <PasswordInput
                  name="password"
                  placeholder="Нууц үг"
                  leftSection={<IconLock size={18} />}
                  size="md"
                  radius="md"
                  styles={{
                    input: {
                      background: "rgba(255, 255, 255, 0.8)",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      transition: "all 0.2s",
                      "&:focus": {
                        borderColor: "#6e8efb",
                        boxShadow: "0 0 0 2px rgba(110, 142, 251, 0.2)",
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  size="md"
                  fullWidth
                  loading={loading}
                  radius="xl"
                  variant="gradient"
                  gradient={{ from: "#6e8efb", to: "#a777e3", deg: 135 }}
                  style={{
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  Нэвтрэх
                </Button>
              </Stack>
            )}
          </Form>
          <Group justify="center">
            <Text size="xs" c="gray.7">
              Нууц үгээ мартсан уу?{" "}
              <Link href="/forgot" passHref>
                <Anchor component="span" c="blue.6" fw={600}>
                  Энд дарна уу
                </Anchor>
              </Link>
            </Text>
          </Group>
        </Stack>
      </Card>
    </Flex>
  );
}

export default LoginPage;
