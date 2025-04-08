"use client";

import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconEditCircle, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export function EntranceCard() {
  const [entrances, setEntrances] = useState(["A1"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntrance, setNewEntrance] = useState("");

  const handleAddEntrance = () => {
    if (newEntrance.trim()) {
      setEntrances([...entrances, newEntrance.trim()]);
      setNewEntrance("");
      setIsModalOpen(false);
    }
  };

  const handleRemoveEntrance = (entranceToRemove: any) => {
    setEntrances(entrances.filter((entrance) => entrance !== entranceToRemove));
  };

  return (
    <Group>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 5 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {entrances.map((entrance) => (
          <Paper withBorder p={10} key={entrance}>
            <Stack justify="center" align="center" gap="xs">
              <Text fw={500} size="md">
                {entrance}
              </Text>
              <Group gap="4px">
                <ActionIcon size="sm" title="Засах">
                  <IconEditCircle size="14px" />
                </ActionIcon>
                <ActionIcon
                  size="sm"
                  color="red"
                  title="Устгах"
                  onClick={() => handleRemoveEntrance(entrance)}
                >
                  <IconTrash size="14px" />
                </ActionIcon>
              </Group>
            </Stack>
          </Paper>
        ))}
        <Paper withBorder p={10} h="100%">
          <Stack justify="center" align="center" gap="xs">
            <ActionIcon onClick={() => setIsModalOpen(true)}>
              <IconPlus size="14px" />
            </ActionIcon>
            <Text size="sm">Орц нэмэх</Text>
          </Stack>
        </Paper>
      </SimpleGrid>
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Шинэ орц нэмэх"
      >
        <TextInput
          label="Орцын нэр"
          placeholder="Жишээ: B1"
          value={newEntrance}
          onChange={(event) => setNewEntrance(event.currentTarget.value)}
        />
        <Button mt="md" onClick={handleAddEntrance}>
          Нэмэх
        </Button>
      </Modal>
    </Group>
  );
}
