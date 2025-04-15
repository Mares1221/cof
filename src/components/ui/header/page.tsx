import { Button, Container, Group } from "@mantine/core";
import { useRouter } from "next/navigation";
import classes from "./header.module.css";

export function HeaderTabs() {
  const router = useRouter();
  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          Logo
          <Button onClick={() => router.push("/login")}>Нэвтрэх</Button>
        </Group>
      </Container>
    </div>
  );
}
