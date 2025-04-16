"use client";

import { HeaderTabs } from "@/components/ui/header/page";
import MapBox from "@/components/ui/map-truck/page";
import { Stack, Table, Tabs, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconList, IconMapPin } from "@tabler/icons-react";
import Footer from "../footer/page";
import classes from "./home.module.css";

export default function HomePage() {
  const isMobile = useMediaQuery("(max-width: 1200px)");
  const isMobileSmall = useMediaQuery("(max-width: 700px)");

  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];

  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <HeaderTabs />
      <Stack
        align="center"
        h={"70vh"}
        mb="xl"
        mx={isMobile ? "5%" : isMobileSmall ? "3%" : "8%"}
      >
        <Title>Самбар байршуулах боломжит газарууд</Title>
        <Tabs variant="unstyled" defaultValue="MAP">
          <Tabs.List grow>
            <Tabs.Tab value="MAP" leftSection={<IconMapPin size={16} />}>
              Газрын зураг
            </Tabs.Tab>
            <Tabs.Tab value="LIST" leftSection={<IconList size={16} />}>
              Жагсаалт
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Tab value="MAP">
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
          </Tabs.Tab>
          <Tabs.Tab value="LIST">
            <Table striped highlightOnHover withTableBorder withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Element position</Table.Th>
                  <Table.Th>Element name</Table.Th>
                  <Table.Th>Symbol</Table.Th>
                  <Table.Th>Atomic mass</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Tabs.Tab>
        </Tabs>
      </Stack>
      <Footer />
    </>
  );
}
