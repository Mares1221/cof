"use client";

import { Badge } from "@mantine/core";
import React from "react";

export default function UserGender({ gender }: { gender: string }) {
  switch (gender) {
    case "MALE": {
      return (
        <Badge color="blue" p={4} radius={4} variant="light" w={100}>
          Эрэгтэй
        </Badge>
      );
    }
    case "FEMALE": {
      return (
        <Badge color="red" p={4} radius={4} variant="light" w={100}>
          Эмэгтэй
        </Badge>
      );
    }
    default:
      return <></>;
  }
}
