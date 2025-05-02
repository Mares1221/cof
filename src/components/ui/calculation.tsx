import { Button, Card, Group, Slider, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";

export default function LandingComparison() {
  const [board, setBoard] = useState(0);
  const [date, setDate] = useState(0);

  const handleReset = () => {
    setBoard(0);
    setDate(0);
  };

  const calculatePrice = () => {
    return board * 2000 * date;
  };

  return (
    <div
      style={{
        padding: "20px 20px",
        minHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        shadow="md"
        padding="xl"
        radius="lg"
        withBorder
        mb="xl"
        style={{
          maxWidth: 1200,
          width: "100%",
          backgroundColor: "#ffffff",
          border: "1px solid #e0e7ff",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Stack gap="lg">
          <Stack gap={0} align="center">
            <Title order={2} style={{ color: "#1E40AF", fontWeight: 700 }}>
              Самбарын Үнийн Тооцоо
            </Title>
            <Text size="md" c="dimmed" style={{ textAlign: "center" }}>
              Самбарынхаа үнийг хялбархан тооцоол! Тоо хэмжээ болон хугацаагаа
              сонгоно уу.
            </Text>
          </Stack>

          <Stack gap="md">
            <Stack gap="xs">
              <Text size="sm" fw={500} c="gray.7">
                Самбарын тоо
              </Text>
              <Slider
                value={board}
                onChange={setBoard}
                min={0}
                max={40}
                step={1}
                marks={[
                  { value: 0, label: "0" },
                  { value: 10, label: "10" },
                  { value: 20, label: "20" },
                  { value: 30, label: "30" },
                  { value: 40, label: "40" },
                ]}
                color="blue"
                size="md"
                thumbSize={20}
                styles={{
                  markLabel: { fontSize: "12px", color: "#1E40AF" },
                  thumb: { border: "2px solid #1E40AF" },
                  track: { backgroundColor: "#e0e7ff" },
                }}
                aria-label="Самбарын тоо сонгох"
              />
            </Stack>

            <Stack gap="xs">
              <Text size="sm" fw={500} c="gray.7">
                Хугацаа (сар)
              </Text>
              <Slider
                value={date}
                onChange={setDate}
                min={0}
                max={12}
                step={1}
                marks={[
                  { value: 0, label: "0" },
                  { value: 3, label: "3 Сар" },
                  { value: 6, label: "6 Сар" },
                  { value: 9, label: "9 Сар" },
                  { value: 12, label: "12 Сар" },
                ]}
                color="blue"
                size="md"
                thumbSize={20}
                styles={{
                  markLabel: { fontSize: "12px", color: "#1E40AF" },
                  thumb: { border: "2px solid #1E40AF" },
                  track: { backgroundColor: "#e0e7ff" },
                }}
                aria-label="Хугацаа сонгох"
              />
            </Stack>

            <Card
              mt="xl"
              withBorder
              padding="md"
              radius="md"
              style={{ backgroundColor: "#f8fafc", borderColor: "#e0e7ff" }}
            >
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="sm" c="gray.6" fw={500}>
                    Самбарын тоо:
                  </Text>
                  <Text size="sm" fw={600} c="gray.8">
                    {board} ширхэг
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm" c="gray.6" fw={500}>
                    Хугацаа:
                  </Text>
                  <Text size="sm" fw={600} c="gray.8">
                    {date} сар
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm" c="gray.6" fw={500}>
                    Нийт үнэ:
                  </Text>
                  <Text size="lg" fw={700} c="blue.7">
                    {calculatePrice().toLocaleString()} төгрөг
                  </Text>
                </Group>
              </Stack>
            </Card>

            <Group justify="space-between">
              <Button
                variant="outline"
                color="gray"
                radius="md"
                onClick={handleReset}
                style={{ transition: "all 0.3s ease" }}
              >
                Дахин тооцоолох
              </Button>
              <Button
                variant="filled"
                color="blue"
                radius="md"
                onClick={() => alert(`Нийт үнэ: ${calculatePrice()} төгрөг`)}
                style={{ transition: "all 0.3s ease" }}
              >
                Тооцоолох
              </Button>
            </Group>
          </Stack>
        </Stack>
      </Card>
    </div>
  );
}
