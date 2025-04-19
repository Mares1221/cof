import { Container, Group, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import classes from "./header.module.css";

export function HeaderTabs() {
  const router = useRouter();
  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="center">
          <Text size="xl" fw={600}>
            Самбар
          </Text>
        </Group>
      </Container>
    </div>
  );
}
