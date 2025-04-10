"use client";

import { HeaderTabs } from "@/components/ui/header/page";
import MapBox from "@/components/ui/map-truck/page";
import { Chip, Group } from "@mantine/core";
import { useState } from "react";

function HomePage() {
  const [value, setValue] = useState<string | null>("first");
  const handleChipClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === value) {
      setValue(null);
    }
  };

  return (
    <div style={{ height: "90vh" }}>
      <HeaderTabs />
      <Chip.Group multiple={false} value={value} onChange={setValue}>
        <Group justify="center" mb="20px">
          <Chip value="MAP" onClick={handleChipClick} size="md">
            Газрын зураг дээр харах
          </Chip>
          <Chip value="LIST" onClick={handleChipClick} size="md">
            Жагсаалт дээр харах
          </Chip>
        </Group>
      </Chip.Group>
      {value === "MAP" ? (
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
        "list"
      )}
    </div>
  );
}
export default HomePage;
