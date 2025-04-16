"use client";

import { HeaderTabs } from "@/components/ui/header/page";
import MapBox from "@/components/ui/map-truck/page";
import { Stack, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Footer from "../footer/page";

export default function HomePage() {
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
  const isMobile = useMediaQuery("(max-width: 1200px)");
  const isMobileSmall = useMediaQuery("(max-width: 700px)");

  return (
    <>
      <HeaderTabs />
      <Stack
        align="center"
        h={"70vh"}
        mx={isMobile ? "5%" : isMobileSmall ? "3%" : "8%"}
      >
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
