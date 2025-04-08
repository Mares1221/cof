import { RootState } from "@/store";
import { logout } from "@/store/auth-slice";
import { message } from "@/utils/message";
import { Avatar, Group, Menu, Text, UnstyledButton, rem } from "@mantine/core";
import { IconChevronRight, IconLogout2, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import classes from "./user-button.module.css";

export function UserButton() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const logOut = async () => {
    try {
      dispatch(logout());
      router.push("/login");
    } catch (error: any) {
      message.error("Алдаа гарлаа");
    }
  };
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group gap="xs">
            {/* <Avatar src={user?.avatar?.url} radius="lg" /> */}
            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {user?.lastName[0]}. {user?.firstName}
              </Text>
              <Text c="dimmed" size="xs">
                {user?.email}
              </Text>
            </div>
            <IconChevronRight
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => {
            router.push("/profile");
          }}
          leftSection={
            <IconUser
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Миний мэдээлэл
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={
            <IconLogout2 style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={() => logOut()}
        >
          Систэмээс гаргах
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
