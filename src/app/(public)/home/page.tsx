"use client";

import HeaderTitle from "@/components/ui/header-title";
import { HeaderTabs } from "@/components/ui/header/page";
import { formatCurrency } from "@/utils/currency";
import {
  BackgroundImage,
  Card,
  Container,
  Image,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import Footer from "../footer/page";
import MapBox from "@/components/ui/map-truck/page";

export default function HomePage() {
  const router = useRouter();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Archive", href: "/archive" },
    { label: "Category", href: "/category" },
    { label: "Pages", href: "/pages" },
    { label: "Contact", href: "/contact" },
  ];

  const cards = [
    {
      image: "https://cdnus.globalso.com/sytonkiosk/yre.jpg",
      category: "30 өдөр",
      title: "LED дэлгэцэн самбар",
      date: 55000,
    },
    {
      image:
        "https://mrp.market.mn/product_images/image/000/002/745/original.webp?1604565837",
      category: "30 өдөр",
      title: "Өлгөдөг самбар",
      date: 25000,
    },
    {
      image:
        "https://pbs.twimg.com/media/DsXlAheU4AEEl58?format=jpg&name=large",
      category: "30 өдөр",
      title: "Гадаа самбар",
      date: 75000,
    },
  ];

  return (
    <>
      <HeaderTabs />
      <BackgroundImage
        src="https://greatergo.org/uploads/article/63ab00ab-f707-4b23-b389-96b04b22552a.jpg"
        style={{
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container size="lg" style={{ textAlign: "center" }}>
          <Text size="md" color="white">
            Бидний тухай
          </Text>
          <Title order={1} c="white" style={{ fontSize: 48, margin: "10px 0" }}>
            Бид хэн бэ?
          </Title>
          <Text
            size="lg"
            color="white"
            style={{ maxWidth: 600, margin: "0 auto" }}
          >
            Бид таны амьдралыг илүү хялбар, тав тухтай болгохын төлөө ажилладаг
            баг юм. Манай үйлчилгээ танд хамгийн сайн туршлагыг өгөхийг зорьдог.
          </Text>
        </Container>
      </BackgroundImage>

      <Container size="lg" style={{ padding: "40px 0" }}>
        <Title ta="center">Самбарын төрөл</Title>
        <SimpleGrid cols={3} spacing="lg">
          {cards.map((card, index) => (
            <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={card.image} height={160} alt={card.title} />
              </Card.Section>
              <Title order={4} mt="xs">
                {card.title}
              </Title>
              <Text size="sm" c="dimmed" mt="xs">
                {card.category}
              </Text>
              <Text size="sm" fw={600}>
                {formatCurrency(card.date)}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
      <Stack align="center" h={"70vh"}>
        <Title>Самбар байршуулах боломжит газарууд</Title>
        <MapBox
          coordinates={[
            {
              location: [106.9, 47.9],
              title: "A байрлал",
              description: "Энэ бол анхны байрлал",
              iconUrl: "/pin.png",
            },
            {
              location: [106.91, 47.92],
              title: "B байрлал",
              description: "Хоёр дахь цэг",
              iconUrl: "/pin.png",
            },
            {
              location: [106.91, 47.9],
              title: "B байрлал",
              description: "Хоёр дахь цэг",
              iconUrl: "/pin.png",
            },
            {
              location: [106.9, 47.9],
              title: "A байрлал",
              description: "Энэ бол анхны байрлал",
              iconUrl: "/pin.png",
            },
          ]}
        />
      </Stack>
      <Footer />
    </>
  );
}
