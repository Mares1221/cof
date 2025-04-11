import { Container, Group, Text, Anchor, Divider, Stack } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#f8f9fa", padding: 20 }}>
      <Container size="lg">
        <Group align="flex-start" gap="xl" justify="space-between">
          <div>
            <Text size="lg" fw={700}>
              DemoSite
            </Text>
            <Text size="sm" color="dimmed" mt="xs">
              Бид таны амьдралыг илүү хялбар болгохыг зорьдог.
            </Text>
          </div>

          <div>
            <Text size="sm" fw={700}>
              Холбоосууд
            </Text>
            <Stack gap="xs" mt="xs">
              <Anchor href="/" size="sm" color="dimmed">
                Нүүр
              </Anchor>
              <Anchor href="/about" size="sm" color="dimmed">
                Бидний тухай
              </Anchor>
              <Anchor href="/contact" size="sm" color="dimmed">
                Холбоо барих
              </Anchor>
            </Stack>
          </div>

          <div>
            <Text size="sm" fw={700}>
              Холбоо барих
            </Text>
            <Text size="sm" color="dimmed" mt="xs">
              И-мэйл: info@demosite.com
            </Text>
            <Text size="sm" color="dimmed">
              Утас: +976 1234-5678
            </Text>
          </div>

          <Group gap="xs">
            <Anchor href="https://facebook.com" target="_blank">
              <IconBrandFacebook size={20} color="#4267B2" />
            </Anchor>
            <Anchor href="https://twitter.com" target="_blank">
              <IconBrandTwitter size={20} color="#1DA1F2" />
            </Anchor>
            <Anchor href="https://instagram.com" target="_blank">
              <IconBrandInstagram size={20} color="#E1306C" />
            </Anchor>
          </Group>
        </Group>

        <Divider my="sm" />

        <Text size="xs" color="dimmed" ta="center">
          © 2025 DemoSite. Бүх эрх хуулиар хамгаалагдсан.
        </Text>
      </Container>
    </footer>
  );
}
