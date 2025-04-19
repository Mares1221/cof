"use client";

import { HeaderTabs } from "@/components/ui/header/page";
import MapBox from "@/components/ui/map-truck/page";
import { ColumnType, Table } from "@/components/ui/table/table";
import { Button, Group, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconList, IconMapPin } from "@tabler/icons-react";
import { useState } from "react";
import Footer from "../footer/page";
import classes from "./home.module.css";

export default function HomePage() {
  const [tabs, setTabs] = useState<string>("MAP");
  const isMobile = useMediaQuery("(max-width: 1200px)");
  const isMobileSmall = useMediaQuery("(max-width: 700px)");

  const generateData = () => {
    const baseData = [
      {
        index: 1,
        town: "Алтай хотхон",
        building: "A Block",
        entrance: "2-р Орц",
        startDate: "2025-02-01",
        endDate: "2025-03-01",
        duration: "2 Сар",
      },
      {
        index: 2,
        town: "Хурд хотхон",
        building: "B Block",
        entrance: "1-р Орц",
        startDate: "2025-03-01",
        endDate: "2025-04-01",
        duration: "1 Сар",
      },
      {
        index: 3,
        town: "Нарны хороолол",
        building: "C Block",
        entrance: "3-р Орц",
        startDate: "2025-04-01",
        endDate: "2025-05-01",
        duration: "1 Сар",
      },
      {
        index: 4,
        town: "Баянзүрх хотхон",
        building: "D Block",
        entrance: "4-р Орц",
        startDate: "2025-05-01",
        endDate: "2025-07-01",
        duration: "2 Сар",
      },
      {
        index: 5,
        town: "Сүхбаатар хотхон",
        building: "E Block",
        entrance: "5-р Орц",
        startDate: "2025-06-01",
        endDate: "2025-08-01",
        duration: "2 Сар",
      },
    ];

    const data = [];
    for (let i = 0; i < 100; i++) {
      const baseIndex = i % 5; // Эхний 5-г ээлжлэн хуулна
      data.push({
        ...baseData[baseIndex],
        index: i + 1, // index-г дарааллаар шинэчилнэ
      });
    }

    return data;
  };

  const data = generateData();

  return (
    <>
      <HeaderTabs />
      <Stack
        align="center"
        h={"70vh"}
        mb="xl"
        mx={isMobile ? "5%" : isMobileSmall ? "3%" : "8%"}
      >
        <Group mt={30}>
          <Button
            radius="xl"
            size="md"
            className={classes.control}
            onClick={() => setTabs("MAP")}
            variant={tabs === "MAP" ? "filled" : "default"}
            leftSection={<IconMapPin />}
          >
            Газрын зурагаар харах
          </Button>
          <Button
            radius="xl"
            size="md"
            className={classes.control}
            onClick={() => setTabs("LIST")}
            leftSection={<IconList />}
            variant={tabs === "LIST" ? "filled" : "default"}
          >
            Жагсаалтаар харах
          </Button>
        </Group>
        <div style={{ width: "100%", height: "600px" }}>
          {tabs === "MAP" ? (
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
          ) : (
            <Table
              limit={10}
              columns={useHeader()}
              name="swr.entarnce.list"
              dataSource={data}
              filters={{
                query: "",
              }}
            />
          )}
        </div>
      </Stack>
      <Footer />
    </>
  );
}

const useHeader = (): ColumnType<any>[] => [
  {
    title: "#",
    width: "1px",
    render: (_, index) => index + 1,
  },
  {
    title: "Хотхон",
    align: "left",
    render: (record) => record?.town || "-",
  },
  {
    title: "Байр",
    align: "left",
    render: (record) => record?.building || "-",
  },
  {
    title: "Орц",
    align: "left",
    render: (record) => record?.entrance || "-",
  },
  {
    title: "Байршсан огноо",
    align: "left",
    render: (record) => record?.startDate || "-",
  },
  {
    title: "Дуусах огноо",
    align: "left",
    render: (record) => record?.endDate || "-",
  },
  {
    title: "Тохирсон өдөр",
    align: "left",
    render: (record) => record?.duration || "-",
  },
];
